import { SideNavItem } from "@/types/types";
import {
  IconHome,
  IconCar,
  IconSearch,
  IconClipboardCheck,
  IconUser,
  IconAlertCircle,
} from "@tabler/icons-react";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/user/dashboard",
    icon: <IconHome width="24" height="24" />,
  },
  {
    title: "Publish a Ride",
    path: "/user/publish-ride",
    icon: <IconCar width="24" height="24" />,
  },
  {
    title: "Find a Ride",
    path: "/user/find-ride",
    icon: <IconSearch width="24" height="24" />,
  },
  {
    title: "My Bookings",
    path: "/user/bookings",
    icon: <IconClipboardCheck width="24" height="24" />,
  },
  {
    title: "Ride Requests",
    path: "/user/ride-requests",
    icon: <IconAlertCircle width="24" height="24" />,
  },
  {
    title: "Profile",
    path: "/user/profile",
    icon: <IconUser width="24" height="24" />,
  },
];
