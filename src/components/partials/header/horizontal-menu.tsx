

import { NavigationMenu } from "../../ui/navigation-menu";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../store";


export default function MainMenu() {
  const { accountLink } = useAuth((state) => state);

 

  return (
    <div>
      <NavigationMenu

        className=" flex relative  justify-start group "
      >
        <NavigationMenu

          className="group flex list-none gap-5"
        >
          {accountLink?.map((item: any, index: number) => (
            <NavigationMenu key={`item-${index}`} >
              <NavigationMenu
                asChild
                className=" flex items-center"
              >
                <Link to={item.href} className=" flex items-center  py-4 cursor-pointer group data-[state=open]:text-primary">
                  <Icon icon={item.icon} className="h-5 w-5 mr-2 text-default-700" />
                  <span className="text-sm font-medium text-default-700">
                    {item.title}
                  </span>
                </Link>
              </NavigationMenu>

            </NavigationMenu>
          ))}
        </NavigationMenu>

      </NavigationMenu>
    </div>
  );
}

