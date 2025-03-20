"use client";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { UserProvider } from "@/context/AuthProvider";

const Component = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <head>
        <title>RideSync | Share the Journey, Split the Cost!</title>
        <meta
          name="description"
          content="RideSync is a smart and seamless carpooling platform designed to connect travelers with shared rides. Whether you're a driver with empty seats or a passenger looking for a budget-friendly trip, RideSync makes commuting easier, cheaper, and more sustainable. Built with Next.js and DaisyUI, powered by Mongoose and NextAPI, our platform ensures a smooth and efficient ride-sharing experience. 🚗💨"
        />
      </head>
      <body className={`antialiased`}>
        <Toaster />
        <Navbar />
        {children}
      </body>
    </html>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <Component>{children}</Component>
    </UserProvider>
  );
}
