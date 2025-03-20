"use client";
import { Booking } from "@/types/Booking";
import axios from "axios";
import Razorpay from "razorpay";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Script from "next/script";

const BookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const fetchBookings = async () => {
    const res = await axios.get("/api/requests/get");
    setBookings(res.data);
  };
  useEffect(() => {
    fetchBookings();
  }, []);
  const handleCancel = (id: string) => async () => {
    const res = axios.delete(`/api/requests/delete?id=${id}`);
    toast.promise(res, {
      loading: "Canceling the booking...",
      success: "Booking canceled successfully",
      error: "Failed to cancel the booking",
    });
  };
  const handlePay = (id: string) => async () => {
    toast.loading("Redirecting to payment gateway...");
    try {
      const res = await axios.post(`/api/requests/pay?id=${id}`);
      const options = {
        key_id: "rzp_test_cXJvckaWoN0JQx",
        amount: res.data.amount,
        currency: "INR",
        name: "Ride Sharing",
        description: "Test Transaction",
        image: "/bg.png",
        order_id: res.data.orderId,
        callback_url: "http://localhost:3000/user/bookings",
        prefill: {
          name: res.data.user.name,
          email: res.data.user.email,
          contact: res.data.user.contact,
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", function (response: any) {
        alert(response.error.description);
      });
      paymentObject.open();
      toast.dismiss();
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("Failed to redirect to payment gateway");
    }
  };
  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <h1 className="text-4xl font-bold mb-6 text-center uppercase">
        Your Bookings
      </h1>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-300">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Ride</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length !== 0 ? (
              bookings.map((booking, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{booking.ride.title}</td>
                  <td>{booking.owner.name}</td>
                  <td>
                    {booking.approved ? (
                      <span className="text-green-500">Approved</span>
                    ) : (
                      <span className="text-red-500">Pending</span>
                    )}
                  </td>
                  <td>
                    {booking.approved ? (
                      booking.payment ? (
                        <span className="text-green-500">Paid</span>
                      ) : (
                        <button
                          className="btn btn-primary"
                          onClick={handlePay(booking._id)}
                        >
                          Pay
                        </button>
                      )
                    ) : (
                      <button
                        className="btn btn-primary"
                        onClick={handleCancel(booking._id)}
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={12} className="text-center">
                  No Bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BookingsPage;
