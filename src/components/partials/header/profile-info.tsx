"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Icon } from "@iconify/react";
import { useEffect } from "react";
import { useAuth, useProfileDate } from "../../../store";
import { useLazyGetItemsProfileQuery } from "../../../features/profile/profile";
import { initialUser } from "../../../config/site";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { formatPhoneNumber } from "../../formatters/phone-formatter";




const ProfileInfo = () => {
  const { setRoleLink, setUser } = useAuth((state) => state);
  const { profileData, setProfileData } = useProfileDate();
  const { user } = useAuth()

  const [getItemsProfile, { data, isSuccess }] = useLazyGetItemsProfileQuery();

  function LogOut() {
    setUser(initialUser);
    setRoleLink([]);
    window.location.assign("/auth");
    localStorage.clear();
  }

  useEffect(() => {
    if (isSuccess && data?.phone) {
      setProfileData(data)
    }
  }, [data]);

  useEffect(() => {
    if (user?.role === "admin") {
      getItemsProfile()
    }
  }, [user?.role]);




  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className=" cursor-pointer">
        <div className=" flex items-center  ">
          <Avatar className="rounded-full h-9 w-9">
            <AvatarImage src={profileData?.image} alt="customer" />
            <AvatarFallback className="rounded uppercase bg-success/30 text-success">
              {profileData?.full_name?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-0" align="end">
        <DropdownMenuLabel className="flex gap-3 items-center mb-1 p-3">

          <Avatar className="rounded-full h-9 w-9">
            <AvatarImage src={profileData?.image} alt="customer" />
            <AvatarFallback className="rounded uppercase bg-success/30 text-success">
              {profileData?.full_name?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>

          <div>
            <div className="text-sm font-medium text-default-800 capitalize hover:text-primary ">
              {profileData?.full_name}
            </div>
            <div
              className="text-xs text-default-600 hover:text-primary"
            >
              {
                formatPhoneNumber(profileData?.phone)
              }
            </div>
          </div>
        </DropdownMenuLabel>


        <DropdownMenuSeparator className="mb-0 dark:bg-background" />
        <DropdownMenuItem
          onSelect={() => LogOut()}
          className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize my-1 px-3 dark:hover:bg-background cursor-pointer"
        >
          <Icon icon="mingcute:exit-line" className="w-4 h-4" />
          Chiqish
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ProfileInfo;
