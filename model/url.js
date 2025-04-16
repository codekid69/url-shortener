const mongoose=require('mongoose');
const urlSchema=new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    redirectUrl:{
        type:String,
        required:true
    },
    visitHistory:[
        {
            timestamp:{
                type:Number
            }
        }
    ],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    }
},{timestamps:true});// timestamps will add createdAt and updatedAt fields to the schema
const Url=mongoose.model('url',urlSchema);
module.exports=Url;