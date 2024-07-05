import bcrypt from "bcrypt";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { User } from "../models/index.js";
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "roxiler_db",
    });

    console.log("MongoDB Connected");

    const admin = await User.findOne({ email: "sys_admin@gmail.com" });

    const storeOwner = await User.findOne({ email: "store_owner@gmail.com" });

    if (!admin) {
      const isAdminCreated = await createAdmin();
      if (isAdminCreated) {
        console.log("System Admin created successfully");
      } else {
        console.log("Something went wrong while create the system admin");
      }
    } else {
      console.log("System Admin Already exist");
    }

    if (!storeOwner) {
      const isStoreOwnerCreated = await createStoreOwner();
      if (isStoreOwnerCreated) {
        console.log("Store owner creaed Successfully");
      } else {
        console.log("Something went wrong while creatin Store owner.");
      }
    } else {
      console.log("Store Owner Already exist.");
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const createAdmin = async () => {
  const hashedPassword = await bcrypt.hash(
    "Admin@1234",
    parseInt(process.env.SALT_ROUND)
  );
  const adminUser = new User({
    name: "System Admin Super User",
    email: "sys_admin@gmail.com",
    password: hashedPassword, // Again, hash the password securely
    address: "At mongodb Cloud",
    role: "admin",
  });
  await adminUser?.save();
  return true;
};

const createStoreOwner = async () => {
  const hashedPassword = await bcrypt.hash("StoreOwner@123", parseInt(process.env.SALT_ROUND));
  const storeOwner = new User({
    name: "Store Owner at MongoDB",
    email: "store_owner@gmail.com",
    password: hashedPassword,
    address: "At mongoDB Atlas",
    role: "store_owner",
  });
  await storeOwner.save();
  return true;
};

export default {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  SALT_ROUND: process.env.SALT_ROUND,
  JWT_SECRET: process.env.JWT_SECRET,
  connect,
};
