import { create } from 'zustand'
import { persist, createJSONStorage } from "zustand/middleware";
import { AuthState, ProfileState, SidebarState, ThemeStoreState } from '../interfaces/zustand-store';
import { siteConfig } from '../config/site';


export const useThemeStore = create<ThemeStoreState>()(
  persist(
    (set) => ({
      theme: siteConfig.theme,
      setTheme: (theme) => set({ theme }),
      radius: siteConfig.radius,
      setRadius: (value) => set({ radius: value }),
      layout: siteConfig.layout,
      setLayout: (value) => set({ layout: value }),
      navbarType: siteConfig.navbarType,
      setNavbarType: (value) => set({ navbarType: value }),
    }),
    {
      name: "theme-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export const useSidebar = create<SidebarState>()(
  persist(
    (set) => ({
      collapsed: false,
      setCollapsed: (value) => set({ collapsed: value }),
      sidebarType:
        siteConfig.layout === "semibox" ? "popover" : siteConfig.sidebarType,
      setSidebarType: (value) => {
        set({ sidebarType: value });
      },
      subMenu: false,
      setSubmenu: (value) => set({ subMenu: value }),
      // background image
      sidebarBg: siteConfig.sidebarBg,
      setSidebarBg: (value) => set({ sidebarBg: value }),
      mobileMenu: false,
      setMobileMenu: (value) => set({ mobileMenu: value }),

    }),
    {
      name: "sidebar-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({

      accountLink: siteConfig.accountLink,
      setRoleLink: (value) => set({ accountLink: value }),
      user: siteConfig.user,
      setUser: (value) => set({ user: value }),

    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)



export const useProfileDate = create<ProfileState>()(
  persist(
    (set) => ({
      profileData: siteConfig.profile,
      setProfileData: (value) => set({ profileData: value }),
    }),
    {
      name: "profileData",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)


