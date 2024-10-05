"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";
import { Icon } from "@iconify/react";
import { Button } from "../../../components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Card } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import React, { useState } from "react";
import UpdateModalSettings from "./update-customer-modal";
import DeleteSettingDialog from "./delete-settings";
import SettingsSkeleton from "./skeleton";
import { Alert, AlertDescription } from "../../../components/ui/alert";
import PaginationPage from "../../../components/pagination/page";
import { useCustomerStore } from "../../../store/customerStore";
import { FilterResult, useDeleteSectorItemMutation, useGetItemsQuery } from "../../../features/settings/sectors-lists";

export interface DataRows {
    id: number;
    name?: string;
    status: boolean;
}

const SettingsTable = ({ activeTab, setActiveTab }: any) => {

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const {setQueryParam } = useCustomerStore();
    const { data: dataSector, isSuccess: sectorSuccess, isLoading: isFetching, isError, error } = useGetItemsQuery(currentPage);
    const [deleteSectorItem] = useDeleteSectorItemMutation();
    const pageCount = dataSector?.count ? Math.ceil(Number(dataSector.count) / 10) : 1;

    const columns: { key: string, label: string }[] = [
        { key: "name", label: "sektorlar nomi" },
        { key: "status", label: "status" },
        { key: "amallar", label: "amallar" },
    ];

    const openUpdateModal = (item: FilterResult) => {
        setIsUpdateModalOpen(true);
        setSelectedItem(item);
    };

    const handleModalClose = (open: boolean) => {
        setIsUpdateModalOpen(open);
    };

    const deleteRequest = (id: number) => {
        setItemToDelete(id);
        setIsOpen(true);
        setIsDeleting(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
    };

    const onConfirm = async () => {
        if (itemToDelete !== null) {
            try {
                await deleteSectorItem({ id: itemToDelete });
            } catch (error) {
                console.error("Error deleting item:", error);
            }
        }
        setIsOpen(false);
        setItemToDelete(null);
        setIsDeleting(false);
    };

    const handleNext = () => {
        if (currentPage < pageCount) {
            setCurrentPage(currentPage + 1);
            setQueryParam({ page: currentPage + 1 })


        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setQueryParam({ page: currentPage - 1 })

        }
    };

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        setQueryParam({ page: pageNumber })
    };


    return (
        <>
            <div className="flex gap-5 ">
                <div className="w-[100%]">
                    <Card>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableHead key={column.key}>{column.label}</TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    sectorSuccess && (
                                        dataSector.results.map((item: FilterResult) => (
                                            <TableRow key={item.id}>
                                                <TableCell className="font-medium text-card-foreground/80">
                                                    {item.name}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        color={item.status === true ? "success" : "warning"}
                                                        className="capitalize"
                                                    >
                                                        {item.status ? "Aktiv" : "Aktiv emas"}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="pr-5">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button
                                                                size="icon"
                                                                color="secondary"
                                                                className="h-7 rounded-full bg-transparent w-7 data-[state=open]:bg-primary data-[state=open]:text-primary-foreground"
                                                            >
                                                                <Icon
                                                                    icon="heroicons:ellipsis-horizontal"
                                                                    className="h-6 w-6"
                                                                />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" avoidCollisions>
                                                            <DropdownMenuLabel>Amallar</DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem onClick={() => openUpdateModal(item)}>
                                                                <Icon icon="heroicons:pencil" className="h-4 w-4 mr-2" />
                                                                O'zgartirish
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => deleteRequest(item.id)}>
                                                                <Icon icon="heroicons:trash" className="h-4 w-4 mr-2" />
                                                                O'chirish
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )
                                }
                            </TableBody>
                        </Table>
                        {
                            isFetching &&
                            <SettingsSkeleton />
                        }
                    </Card>
                    <div className="my-5">
                        {pageCount > 1 && <PaginationPage
                            handleNext={handleNext}
                            handlePrevious={handlePrevious}
                            currentPage={currentPage}
                            totalPages={pageCount}
                            handlePageClick={handlePageClick}
                        />}
                    </div>
                    {
                        sectorSuccess && dataSector?.results?.length === 0 && (
                            <>
                                <Alert color="destructive" variant="outline" className="mt-5">
                                    <AlertDescription className="text-center">
                                        Ma'lumot topilmadi
                                    </AlertDescription>
                                </Alert>
                            </>
                        )
                    }

                    {
                        isError && (
                            <>
                                <Alert color="destructive" variant="outline" className="mt-5">
                                    <AlertDescription className="text-center">
                                        Status : {(error as any)?.originalStatus} Xatolik yuz berdi
                                    </AlertDescription>
                                </Alert>
                            </>
                        )
                    }
                </div>
            </div>

            {isUpdateModalOpen && (
                <UpdateModalSettings
                    selectType={activeTab}
                    setIsModalOpen={setIsUpdateModalOpen}
                    isOpen={isUpdateModalOpen}
                    onOpenChange={handleModalClose}
                    setSelectType={setActiveTab}
                    item={selectedItem}
                    itemId=""
                />
            )}

            {isOpen && (
                <DeleteSettingDialog
                    open={isOpen}
                    onClose={closeDialog}
                    onConfirm={onConfirm}
                    toastMessage="Ma'lumot muvaffaqiyatli o'chirildi"
                    title="Ma'lumotni o'chirishga rozimisiz?"
                    description="Siz haqiqatdan ham shu ma'lumotni o'chirmoqchimisiz?"
                    deleteBtnTitle="O'chirish"
                    acceptBtnTitle="Yopish"
                    color="info"
                />
            )}
        </>
    );
};

export default SettingsTable;
