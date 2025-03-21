"use client";
import { User } from "@/types/user";
import {
  IconCertificate,
  IconClipboardCheck,
  IconClock,
  IconFile,
  IconShield,
} from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUser = async () => {
    const res = await axios.get("/api/user");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleApprove = async (id: string, status: boolean) => {
    const res = axios.get(`/api/user/approve?id=${id}&status=${status}`);
    toast.promise(res, {
      loading: `${status ? "Approving" : "Rejecting"} User...`,
      success: `User ${status ? "Approved" : "Rejected"}.`,
      error: "Something went wrong!!",
    });
  };
  return (
    <>
      <h1 className="text-4xl font-bold mb-6 text-center uppercase">
        Dashboard
      </h1>

      <div className="stats shadow w-full bg-base-300">
        <div className="stat">
          <div className="stat-figure text-primary">
            <IconFile size={40} />
          </div>
          <div className="stat-title">Total User</div>
          <div className="stat-value text-primary">25.6K</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <IconClock size={40} />
          </div>
          <div className="stat-title">Total Active User</div>
          <div className="stat-value text-secondary">2.6M</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <IconShield size={40} />
          </div>
          <div className="stat-title">Total Rides</div>
          <div className="stat-value text-success">2.6M</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar online">
              <div className="w-16 rounded-full">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/9703/9703596.png"
                  alt="user"
                />
              </div>
            </div>
          </div>
          <div className="stat-value">86%</div>
          <div className="stat-title">Rides Done</div>
          <div className="stat-desc text-secondary">31 tasks remaining</div>
        </div>
      </div>
      <div className="overflow-x-auto mt-6 rounded-box border border-base-content/5 bg-base-300">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Contact Number</th>
              <th>Aadhar Card</th>
              <th>Driving Licence</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user: User, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.profileImage} alt={user.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm opacity-50">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>{user.contact}</td>
                <td>
                  <a href={user.aadhardcard} target="_blank">
                    View Aadhar Card
                  </a>
                </td>
                <td>
                  <a href={user.drivingLicense} target="_blank">
                    View Driving Licence
                  </a>
                </td>
                <th>
                  {user.isVerified ? (
                    <button
                      className="btn btn-error"
                      onClick={() => {
                        handleApprove(user._id, false);
                      }}
                    >
                      Reject
                    </button>
                  ) : (
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        handleApprove(user._id, true);
                      }}
                    >
                      Approve
                    </button>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
