import mongoose from 'mongoose';

const connectToMongo = async()=>{
    try{
        await mongoose.connect('mongodb+srv://harshdeep7887:harshdeepauth@login-registration2.ki6bb.mongodb.net/?retryWrites=true&w=majority&appName=login-registration2')
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