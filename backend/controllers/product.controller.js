import {redis} from "../lib/redis.js"
import cloudinary from "../lib/cloudinary.js";
import Product from "../models/product.model.js";


export const getAllProducts= async (req,res)=>{
try {
    const products = await Product.find();//find all products
    res.json({products})
} catch (error) {
    console.log("Error in getAllProducts controller",error.message);
    res.status(500).json({message:"server error",error:error.message})
}
}

export const getFeaturedProducts = async (req,res)=>{
    try {
     
        let featuredProducts=  await redis.get("feautured_products")
        if(feauturedProducts){
            return res.json(JSON.parse(feauturedProducts));

        }
        //if not in redis, fetch it from mongodb
        featuredProducts = await Product.find({isFeatured:true}).lean();
        //.lean()-----> return simple objects ,, plain js object instead of mongo db doc , ---for performance

        if(!featuredProducts){
            return res.json(404).json({message:"No featured products found"})
        }
        //store in redis for future access;
        await redis.set("featured_products",JSON.stringify(feauturedProducts))
        res.json(feauturedProducts)

    } catch (error) {
         console.log("Error in getFeaturedProducts controller",error.message);
    res.status(500).json({message:"server error",error:error.message})
    }
}

export const createProduct = async (req,res)=>{
    try {
        const {name,description,price,image,category}=req.body;
        let cloudinaryResponse=null;
        if(image){
           cloudinaryResponse= await cloudinary.uploader.upload(image,{folder:"products"})
        }

        const product = await Product.create({
            name,
            description,
            price,
            image:cloudinaryResponse?.secure_url? cloudinaryResponse.secure_url:"",
            category
        })
        res.status(201).json(product);
        
    } catch (error) {
         console.log(error.message);
    res.status(500).json({message:"server error",error:error.message})
    
    }
}

export const deleteProduct = async (req,res)=>{
try {
    const product = await Product.findById(req.params.id)
    if(!product){
        return res.status(404).json({message:"Product not found"});

    }
    if(product.image){
        const publicId = product.image.split("/").pop().split(".")[0];
        try {
            await cloudinary.uploader.destroy(`products/${publicId}`)
            console.log("deleted image from cloudinary");

        } catch (error) {
            console.log("deleted image from couldinary");

        }
    }
    await Product.findByIdAndDelete(req.params.id);
    res.json({message:"Product deleted succesfully"});
} catch (error) {
    console.log("Error in deletd controller",error.message);
    res.status(500).json({message:"Server error",error:error.message});
}
}

export const getRecommendedProducts= async (req,res)=>{
    try {
        const products = await Product.aggregate([
            {
                $sample: {size:3}
            },
           {
             $project:{
                _id:1,
                name:1,
                description:1,
                image:1,
                price:1
            }}
        ])

        res.json(products);

    } catch (error) {
          console.log("Error in getRecommendedProducts controller",error.message);
    res.status(500).json({message:"Server error",error:error.message});
    }
}

export const getProductsByCategory = async (req,res)=>{
    const {category}= req.params;

    try {
        const products = await Product.find({category});
        res.json(products);
    } catch (error) {
        console.log("Error in getProductsByCategory controller", error.message);
        res.status(500).json({message:"server error",error: error.message})
        
    }

}

export const toggleFeauturedProduct = async (req,res)=>{
    try {
        if(product){
            product.isFeautured= !product.isFeautured;
            const updatedProduct = await product.save();
            await updateFeauturedProductsCache();
            res.json(updatedProduct);
        }else{
            res.status(404).json({message:"Product not found"});

        }
    } catch (error) {
        console.log("Error in toggleFeauturedProduct controller",error.message);
        res.status(500).json({message:"server error",error:error.message});

    }
}

async function updateFeaturedProductsCache(){
    try {
        //.lean() method
        const featuredProducts = await Product.find({isFeatured: true}).lean();
        await redis.set("featured_products",JSON.stringify(featuredProducts));

    } catch (error) {
        console.log("error in update cache func ");

    }
}