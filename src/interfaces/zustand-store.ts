import { SellerResults } from "./seller-page";


export interface ThemeStoreState {
    theme: string;
    setTheme: (theme: string) => void;
    radius: number;
    setRadius: (value: number) => void;
    layout: string;
    setLayout: (value: string) => void;
    navbarType: string;
    setNavbarType: (value: string) => void;
}


export interface SidebarState {
    collapsed: boolean;
    setCollapsed: (value: boolean) => void;
    sidebarType: string;
    setSidebarType: (value: string) => void;
    subMenu: boolean;
    setSubmenu: (value: boolean) => void;
    // background image
    sidebarBg: string;
    setSidebarBg: (value: string) => void;
    mobileMenu: boolean;
    setMobileMenu: (value: boolean) => void;

}

export interface Link {
    title: string;
    href: string;
    icon?: string;
}

export interface UserData {
    access: string;
    permissions: string[];
    role: string;
}

export interface AuthState {
    accountLink: Link[];
    setRoleLink: (value: Link[]) => void;
    user: UserData;
    setUser: (value: UserData) => void;
}

export interface ProfileState {
    profileData: SellerResults;
    setProfileData: (value: SellerResults) => void;
}




