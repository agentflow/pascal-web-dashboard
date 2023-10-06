import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { AiFillFolderOpen } from "react-icons/ai";
import { BsHouseDoorFill } from "react-icons/bs";

// Admin Imports
import MainDashboard from "views/admin/default";
import Deals from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";

// Auth Imports
import SignInCentered from "views/auth/signIn";

const routes = [
  {
    name: "Dashboard ",
    layout: "/admin",
    icon: <Icon as={BsHouseDoorFill} width='20px' height='20px' color='inherit' />,
    path: "/dashboard",
    component: MainDashboard,
  },
  {
    name: "Documents ",
    layout: "/admin",
    icon: <Icon as={AiFillFolderOpen} width='20px' height='20px' color='inherit' />,
    path: "/documents",
    component: DataTables,
  },
  {
    name: "Deals ",
    layout: "/admin",
    icon: <Icon as={BsHouseDoorFill} width='20px' height='20px' color='inherit' />,
    path: "/deals",
    component: Deals,
  },
  {/*
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Profile,
  },*/}
  ,
  {
    name: "Sign Out",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  },
  {/*
  {
    name: "RTL Admin",
    layout: "/rtl",
    path: "/rtl-default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: RTL,
  },*/}
];

export default routes;