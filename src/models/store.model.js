import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 60,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
      maxLength: 400,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Store = mongoose.model("Store", StoreSchema);

export default Store;
