"use client";
import { Ride } from "@/types/Ride";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const FindRidePage = () => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [filteredRides, setFilteredRides] = useState<Ride[]>([]);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
  });

  const fetchRides = async () => {
    try {
      const res = await axios.get("/api/rides/all");
      setRides(res.data);
      setFilteredRides(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);

  const searchRides = () => {
    const filtered = rides.filter((ride) => {
      return (
        (formData.from
          ? ride.from.toLowerCase().includes(formData.from.toLowerCase())
          : true) &&
        (formData.to
          ? ride.to.toLowerCase().includes(formData.to.toLowerCase())
          : true) &&
        (formData.date
          ? new Date(ride.date).toISOString().split("T")[0] === formData.date
          : true)
      );
    });
    setFilteredRides(filtered);
  };

  const book = (rideId: string) => {
    const res = axios.post("/api/requests", { rideId });
    toast.promise(res, {
      loading: "Booking...",
      success: "Booked successfully",
      error: "Failed to book",
    });
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-6 text-center uppercase">
        Find Ride
      </h1>
      <div className="w-full flex flex-row items-center justify-center space-x-3">
        <input
          type="text"
          className="input input-primary w-full"
          placeholder="Starting location"
          value={formData.from}
          onChange={(e) => setFormData({ ...formData, from: e.target.value })}
        />
        <input
          type="text"
          className="input input-primary w-full"
          placeholder="Destination"
          value={formData.to}
          onChange={(e) => setFormData({ ...formData, to: e.target.value })}
        />

        <input
          type="date"
          className="input input-primary w-full"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />

        <button onClick={searchRides} className="btn btn-primary">
          Search
        </button>
      </div>

      <div className="mt-6">
        {filteredRides.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRides.map((ride) => (
              <div
                key={ride._id}
                className="card bg-base-300 w-96 shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300"
              >
                <figure className="relative">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1dzAY9vxSYgd7Zz6Aji9j2-LaG3-BF5iw5w&s"
                    alt="Ride"
                    className="rounded-t-lg w-full h-48 object-cover"
                  />
                  <span className="absolute top-2 right-2 bg-primary text-base-content text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    ₹{ride.pricePerSeat} / seat
                  </span>
                </figure>

                {/* Ride Details */}
                <div className="card-body p-4">
                  <h2 className="card-title text-lg font-semibold">
                    {ride.title}
                  </h2>

                  <p className="text-sm text-base-content/60">
                    <strong>From:</strong> {ride.from} → <strong>To:</strong>{" "}
                    {ride.to}
                  </p>
                  <p className="text-sm text-base-content/60">
                    <strong>Date:</strong>{" "}
                    {new Date(ride.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-base-content/60">
                    <strong>Time:</strong> {ride.time}
                  </p>
                  <p className="text-sm text-base-content/60">
                    <strong>Seats Available:</strong>{" "}
                    {ride.car.capacity - ride.passengers.length}
                  </p>
                  <p className="text-sm text-base-content/60">
                    <strong>Car Name:</strong> {ride.car.name}
                  </p>
                </div>

                {/* Divider */}
                <div className="border-t border-base-content mx-4"></div>

                {/* Organizer Info */}
                <div className="flex items-center p-4 space-x-3">
                  <img
                    src={ride.organiser?.profileImage}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full border-2 border-base-content"
                  />
                  <div>
                    <p className="text-sm font-medium">
                      {ride.organiser?.name}
                    </p>
                    <p className="text-xs text-base-content/50">
                      {ride.organiser?.email}
                    </p>
                  </div>
                </div>

                {/* Book Button */}
                <div className="card-actions px-4 pb-4">
                  <button
                    className="btn btn-primary w-full text-lg font-medium"
                    onClick={() => book(ride._id!)}
                  >
                    🚗 Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-base-content/50 mt-6">
            No rides found matching your search.
          </p>
        )}
      </div>
    </>
  );
};

export default FindRidePage;
