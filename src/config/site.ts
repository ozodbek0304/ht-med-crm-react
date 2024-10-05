

import { SellerResults } from "@/interfaces/seller-page";
import { menusConfigAdmin } from "./menus";

interface UserData {
  access: string;
  permissions: string[];
  role: string;
}

export const initialUser: UserData = {
  access: '',
  permissions: [],
  role: '',
};



export const initialProfile: SellerResults = {
  id: 0,
  phone: "",
  full_name: "",
  image: "",
  seller_coins: [],
}



export const siteConfig = {
  name: "Ht-Med-Crm",
  description: null,
  theme: "violet",
  layout: "vertical",
  hideSideBar: false,
  sidebarType: "popover",
  queryParam: { page: "" },
  sidebarColor: null,
  navbarType: "sticky",
  sidebarBg: "none",
  radius: 0.5,
  accountLink: menusConfigAdmin,
  user: initialUser,
  profile: initialProfile,
};


