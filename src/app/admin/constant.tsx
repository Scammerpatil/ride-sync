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
];
