import mongoose from "mongoose";   

const Schema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        minlength:4
    },
    slug:{
          type:String,
          unique:true
    },
    image:{
        type:String,
        default:null

    } ,
    status:{
        type:Boolean,
        default:true
    },
   
},
 {
        timestamps:true
    }
)  


const CategoryModel  = mongoose.model("catgories" ,Schema);
export default CategoryModel;