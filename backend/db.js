import mongoose from 'mongoose';

const connectToMongo = async()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/userData')
        .then(()=>{
            console.log("connected sucessfully");
        })
        .catch((err)=>{
            console.log(err, "not Connected");
        })
    }
    catch(error){
        console.log(error);
    }
}
export default connectToMongo