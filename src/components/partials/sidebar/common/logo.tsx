
import Image from "next/image";
import { useSidebar } from "../../../../store";



const SidebarLogo = ({ hovered }: { hovered?: boolean }) => {
  const {collapsed } = useSidebar();
  return (
    <div className="px-4 py-4 ">
      <div className=" flex items-center">
        <div className="flex flex-1 items-center gap-x-3  ">
          {/* <Image src={logo} alt="logo" height={32} width={32} /> */}

          {(!collapsed || hovered) && (
            <div className="flex-1  text-xl text-primary  font-semibold">
              Ht-Med-Crm
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarLogo;
