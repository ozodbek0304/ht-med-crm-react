import { Icon } from "@iconify/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { Label } from "../../../components/ui/label";
import { FilterResult } from "../../../features/settings/sectors-lists";
import { useGetItemsWithFiltersQuery } from "../../../features/settings/location-lists";
import { useGetItemsCustomerQuery } from "../../../features/settings/sourse-lists";
import { useGetItemsCustomerProductsQuery } from "../../../features/settings/products-lists";
import { useGetItemsPaymentOrdersQuery } from "../../../features/settings/payment-type-lists";
import { useCustomerStore } from "../../../store/customerStore";
import { useEffect, useState } from "react";
import useDebounce from "../../../hooks/use-Debunce";
import { InputGroup, InputGroupText } from "../../../components/ui/input-group";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

const selectData = [{
  id: 1,
  value: "active",
  label: "Aktiv",
},
{
  id: 2,
  value: "in_progress",
  label: "Jarayonda",
},
{
  id: 3,
  value: "in_base",
  label: "Asosiy ba'zada",
},
{
  id: 4,
  value: "frozen",
  label: "Muzlatilgan",
},
{
  id: 5,
  value: "archived",
  label: "Arxiv",
},
{
  id: 5,
  value: "deleted",
  label: "O'chirilgan",
},

];



const CustomerFilters = () => {
  const { data: dataLocation, isSuccess: locationSuccess } = useGetItemsWithFiltersQuery();
  const { data: customersData, isSuccess: successCustomer } = useGetItemsCustomerQuery(1);
  const { data: dataProducts, isSuccess: successProdcuts } = useGetItemsCustomerProductsQuery("");
  const { data: dataPaymentOrders, isSuccess: successPaymentOrders } = useGetItemsPaymentOrdersQuery(1);
  const { setQueryParam } = useCustomerStore();
  const [search, setSearch] = useState<string | null>(null);
  const debunce = useDebounce(search, 800);

  useEffect(() => {
    if (debunce !== null) {
      setQueryParam({ search: debunce });
    }
  }, [debunce]);




  return (
    <div className="w-full  sm:flex items-center justify-between">

      <div className="flex items-center gap-3">

        <InputGroup className="sm:w-[500px] mb-3 sm:m-0">
          <InputGroupText>
            <Icon icon="heroicons:magnifying-glass" />
          </InputGroupText>
          <Input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Ism, telefon raqam . . . "
          />
        </InputGroup>

        <Select onValueChange={(e) => setQueryParam({ status: e })}>
          <SelectTrigger className="sm:w-[300px] sm:h-[36px]">
            <SelectValue placeholder="Holat bo'yicha" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={''}>Barchasi</SelectItem>
            {selectData.map((item) => (
              <SelectItem value={item.value}>{item.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Dialog >
        <DialogTrigger asChild >
          <Icon
            className="text-customText w-8 h-8 cursor-pointer rounded-lg bg-transparent transition-all duration-200 hover:bg-primary-100 hover:scale-105 hover:shadow-md"
            icon="heroicons:adjustments-horizontal"
          />
        </DialogTrigger>
        <DialogContent>
          <DialogTitle className="lg:text-[18px] font-medium text-default-800">
            Filterlash
          </DialogTitle>

          <div>
            <Label className="mb-2">Kelish manbaini tanlang</Label>
            <Select onValueChange={(value: string) => {
              const parsedValue = value ? JSON.parse(value) : {};
              if (parsedValue) {
                setQueryParam({ source: parsedValue.id });
              }
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Ma'lumot tanlang" />
              </SelectTrigger>
              <SelectContent className="z-[60]">
                <SelectItem value={JSON.stringify({ name: "Barchasi", id: "" })}>
                  Barchasi
                </SelectItem>
                {successCustomer && customersData?.results?.map((item: FilterResult) => (
                  <SelectItem key={item.id} value={JSON.stringify(item)}>
                    {item?.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-2">Uskuna bo'yicha</Label>
            <Select

              onValueChange={(value: string) => {
                const parsedValue = value ? JSON.parse(value) : {};
                if (parsedValue) {
                  setQueryParam({ products: parsedValue.id });
                }
              }}>
              <SelectTrigger>
                <SelectValue placeholder="Ma'lumot tanlang" />
              </SelectTrigger>
              <SelectContent className="z-[60]">
                <SelectItem value={JSON.stringify({ name: "Barchasi", id: "" })}>
                  Barchasi
                </SelectItem>
                {
                  successProdcuts && dataProducts?.results?.map((item: FilterResult) => (
                    <SelectItem value={JSON.stringify(item)}>{item?.name}</SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-2">To'lov turi bo'yicha</Label>
            <Select

              onValueChange={(value: string) => setQueryParam({ payment_type: value })}>

              <SelectTrigger>
                <SelectValue placeholder="Ma'lumot tanlang" />
              </SelectTrigger>
              <SelectContent className="z-[60]">
                <SelectItem value={""}>
                  Barchasi
                </SelectItem>
                {
                  successPaymentOrders && dataPaymentOrders?.results?.map((item: FilterResult) => (
                    <SelectItem value={item.name}>{item?.name}</SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-2">Viloyat bo'yicha</Label>
            <Select
              onValueChange={(value: string) => {
                const parsedValue = value ? JSON.parse(value) : {};
                if (parsedValue) {
                  setQueryParam({ location: parsedValue.id });
                }
              }}>

              <SelectTrigger>
                <SelectValue placeholder="Ma'lumot tanlang" />
              </SelectTrigger>
              <SelectContent className="z-[60]">
                <SelectItem value={JSON.stringify({ name: "Barchasi", id: "" })}>
                  Barchasi
                </SelectItem>
                {
                  locationSuccess && dataLocation?.results?.map((item: FilterResult) => (

                    <SelectItem value={JSON.stringify(item)}>{item?.name}</SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
          <div>
            <Button onClick={() => setQueryParam({ source: '', location: '', products: '', payment_type: '' })} className="w-full" color="destructive" variant={"outline"}>Barcha filterni tozalash</Button>
          </div>

        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerFilters;
