"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarGroup,
} from "@/components/ui/avatar";
import DeleteConfirmationDialog from "@/components/modals/delete-confirmation-dialog";
import { useTheme } from "next-themes";
import { Location } from "@/components/svg";
import { formatPhoneNumber } from "@/components/formatters/phone-formatter";
import { formatCustomDate } from "../formatters/date-formatter";
import { Link } from "react-router-dom";
interface ProjectGridProps {
  project: any;
  role: string;
}
export interface Statustype {
  [key: string]: string;
};

export const statusData: Statustype = {
  active: "Aktiv",
  in_progress: "Jarayonda",
  in_base: "Asosiy ba'zada",
  frozen: "Muzlatilgan",
  archived: "Arxiv",
  deleted: "O'chirilgan",
}



const ProjectGrid = ({ project, role }: ProjectGridProps) => {
  const [open, setOpen] = React.useState<boolean>(false);
  async function onAction(id: string) {
 
  }
  const { theme: mode } = useTheme();

  return (
    <>
      <DeleteConfirmationDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onAction(project?.id)}
      />

      <Link to={`/customer-details/${project?.id}`}>
        <Card>
          <CardHeader className="flex-row items-center gap-3 border-none mb-0">
            <div className="flex-1">
              <Badge
                color={
                  project?.status === "in_base" ? "info"
                    : project?.status === "active" ? "success"
                      : project?.status === "in_progress" ? "warning"
                        : project?.status === "frozen" ? "info"
                          : project?.status === "archived" ? "secondary" : "destructive"
                }
                variant={mode === "dark" ? "soft" : "soft"}
                className=" capitalize"
              >
                {statusData[project.status]}
              </Badge>
            </div>

            <div className="flex items-center gap-1">
              <Location className="h-5 w-5" /> <span className="text-xs font-medium text-default-900 ">
                {project?.location?.name}</span>
            </div>

          </CardHeader>

          <CardContent className="p-4 pt-0 pb-5">

            <div className="flex gap-2">
              <div>
                <Avatar className="rounded h-12 w-12">
                  <AvatarImage src={project?.sellers?.[0]?.image_url} alt="customer" />
                  <AvatarFallback className="rounded uppercase bg-warning/30 text-warning">
                    {project?.name?.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div>
                <div className="text-base font-semibold text-default-900 capitalize mb-1">
                  {project?.name}
                </div>
                <div className=" font-medium text-default-700 capitalize mb-1 text-[12px]">
                  {formatPhoneNumber(project?.phone_number)}
                </div>
              </div>
            </div>




          </CardContent>
          <CardFooter className="flex justify-between items-start border-t  p-4">
            <div>
              <div className="text-xs  text-default-600 mb-[2px]">
                {role === "admin" ? "Yaratilgan sana" : "Nusxa olingan sana"}
              </div>
              <span className="text-xs font-medium text-default-900">
                {formatCustomDate(project?.created_at)}
              </span>

            </div>
            <div >
              <div className="text-xs  text-default-600 mb-[2px]">{role === "admin" ? "Ishlayotgan sotuvchilar" : "Yaratgan sotuvchi"}</div>
              <div className="flex  gap-10">
                <div className="flex-1 ">

                  {project?.sellers?.length > 0 &&

                    (

                      <div className={`mt-2 flex justify-end`}>

                        <AvatarGroup
                          max={role === 'admin' ? 3 : 1}
                          total={project.sellers.length}
                          countClass="h-7 w-7"
                        >
                          {project.sellers?.map((user: any, index: number) => (
                            <Avatar
                              className="ring-1 ring-background ring-offset-[2px]  ring-offset-background h-7 w-7"
                              key={`assign-member-${index}`}
                            >
                              <AvatarImage src={user?.image_url} />
                              <AvatarFallback>DC</AvatarFallback>
                            </Avatar>
                          ))}
                        </AvatarGroup>


                      </div>

                    )}
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </Link>

    </>
  );
};

export default ProjectGrid;
