import mongoose, { Schema } from "mongoose";

const RequestSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ride: {
    type: Schema.Types.ObjectId,
    ref: "Ride",
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  payment: {
    type: Boolean,
    default: false,
  },
});

const Request =
  mongoose.models.Request || mongoose.model("Request", RequestSchema);
export default Request;
