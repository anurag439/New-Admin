import mongoose from "mongoose";
import dotenv from "dotenv";
// import Admin from '../model/admins.js';
dotenv.config();


async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Mongodb is connected successfully');
  } catch (error) {
    // console.error('Error connecting to MongoDB:', error.message);
    console.log("Error in connected mongodb!");
  }
}

// async function addAdmin(name, email, password, picture, bio) {
//   try {
//     const newAdmin = new Admin({
//       name: name,
//       email: email,
//       password: password,
//       picture: picture,
//       bio: bio
//     });

//     await newAdmin.save();
//     console.log('Admin saved successfully');
//   } catch (err) {
//     console.error('Error saving admin:', err);
//     throw err;
//   }
// }

// export default addAdmin;
 export default connectToDatabase();