import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 20,
      maxLength: 60,
    },
    email: {
      type: String,
      required: true,
      uquine: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
      maxLength: 400,
    },
    role: {
      type: String,
      default: "normal",
      enum: ["admin", "normal", "store_owner"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
