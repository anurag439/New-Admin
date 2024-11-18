import mongoose from "mongoose";
import Admin from '../model/admins.js';

const uri = 'mongodb://localhost:27017/new-admin';

async function connectToDatabase() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Mongodb is connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
}

async function addAdmin(name, email, password, picture, bio) {
  try {
    const newAdmin = new Admin({
      name: name,
      email: email,
      password: password,
      picture: picture,
      bio: bio
    });

    await newAdmin.save();
    console.log('Admin saved successfully');
  } catch (err) {
    console.error('Error saving admin:', err);
    throw err;
  }
}
export default addAdmin;
connectToDatabase();