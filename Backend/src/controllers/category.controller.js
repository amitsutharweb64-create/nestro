import CategoryModel from "../models/category.model.js";  
import { sendNotFound, sendServerError, sendSuccess } from "../utils/response.js";


export const read = async(req,res)=>{
    try {    
            const query=req.query;
            const filter = {};
            const limit  = query.limit ? parseInt(query.limit) : 4 ;
           
           if(query.status){
                   filter.status = query.status === "true" //qwery ko boolian me convert ker dega 
            }   

         const category = await CategoryModel.find(filter).limit(limit) ;
         const countDocument = await CategoryModel.countDocuments()
         res.status(200).json({
            message:"Category data found",
            success:true,
            data:category,
            total:countDocument
         })
         
        
    } catch (error) {
      sendServerError(res)
    }
}   


export const readById = async (req,res)=>{
    try {      
           const {id} = req.params;
             const category = await CategoryModel.findById(id);  

             if(!category) return sendNotFound(res);
         res.status(200).json({
            message:"Category data found",
            success:true,
            data:category
         })
    } catch (error) {
        sendServerError(res)
    }
}  


export const create =async (req,res)=>{
    try {  
        const imageUrl = req.file?.path || "" // Cloudinary's final secure URL
        const {name ,slug} = req.body;
        if(!name || !slug){
            
        }
    const category = await CategoryModel.findOne({
        slug
    }); 
     if(category){
        return res.status(409).json({
            message:"Resources alerdy exist",
            success:false
        })
     }
      await CategoryModel.create({ name, slug,image:imageUrl});
      res.status(201).json({
        message:"Resource create succesfully",
        success:true
      })
    } catch (error) {
         sendServerError(res)
    }
}  


export const  updateStatus =async (req,res)=>{
    try {     
          console.log(req.user,"user information")
         const {id} = req.params;
              const category = await CategoryModel.findById(id);  
             if(!category) return sendNotFound(res); 
             await  CategoryModel.findByIdAndUpdate({_id:id},{$set:{status:!category.status}});
             return sendSuccess(res,"Category Status update");


    } catch (error) {
       sendServerError(res)
    }
}   




export const edit = async (req,res)=>{
    try {   
          const imageUrl = req.file?.path || ""  
        const{name,slug}=req.body;
        const {id} = req.params;
        const category = await CategoryModel.findById(id);
        if(!category) return sendNotFound(res);
       

        if(name) category.name = name
        if(slug) category.slug = slug
        if(imageUrl) category.image = imageUrl
   //last me save bhi karana hoga kyoi mene data base me change kiya hai 
        await category.save();
        return sendSuccess(res, "Category updated successfully");

    } catch (error) {
       sendServerError(res) 
    }
}   


export const deleteById =async (req,res)=>{
    try {
          const {id} = req.params;
              const category = await CategoryModel.findById(id); 
               
             if(!category) return sendNotFound(res); 
             await  CategoryModel.findByIdAndDelete(id)
             return sendSuccess(res,"Category delete successfully");


    } catch (error) {
       sendServerError(res)
    }
}
