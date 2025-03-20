import mongoose, { Schema, model } from "mongoose";

const RideSchema = new Schema(
  {
    organiser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    car: {
      name: { type: String, required: true },
      number: { type: String, required: true },
      capacity: { type: Number, required: true },
    },
    passengers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    pricePerSeat: {
      type: Number,
      required: true,
    },
    isFull: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["scheduled", "ongoing", "completed", "canceled"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);

const Ride = mongoose.models.Ride || mongoose.model("Ride", RideSchema);
export default Ride;
