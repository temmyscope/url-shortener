import mongoose from "mongoose";
const dotenv = require('dotenv');
dotenv.config({ path: '../../.env'});

export module Mongoose {

  export const connectDB: any = async () => {
    let uri: string = process.env.MONGODB_URI ?? "";
    //let options = { useNewUrlParser: true, useUnifiedTopology: true }
    const connection = await mongoose.connect(uri);
    console.log(`Database connected: ${connection.connection.host}`);
  }
  
}

export default mongoose;