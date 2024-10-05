"use client";
import { Button } from "../../../components/ui/button";
import { z } from "zod";
import { cn } from "../../../lib/utils";
import { useForm } from "react-hook-form";
import { CalendarIcon, Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import {
  Select as SelectShadcn,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { Calendar } from "../../../components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { useState, useEffect } from "react";
import { FilterResult, useGetItemsQuery } from "../../../features/settings/sectors-lists";
import { useGetItemByIdQuery } from "../../../features/settings/sectors-medical-lists";
import { useGetItemsWithFiltersQuery } from "../../../features/settings/location-lists";
import { useGetItemsCustomerQuery } from "../../../features/settings/sourse-lists";
import { useGetItemsPaymentOrdersQuery } from "../../../features/settings/payment-type-lists";
import { useGetItemsPaymentQuery } from "../../../features/settings/payment-methods-lists";
import toast from "react-hot-toast";
import { PhoneNumber } from "../../../components/formatters/phone-number";
import { useLazyGetItemsDetailsQuery, useUpdateItemMutation } from "../../../features/customer/customer";
import AddNewOptionModal from "../add-customers/components/add-newOption";
import { useParams } from "next/navigation";
import SelectSearchSeller from "../../../components/form/multiple-select";



const FormSchema = z.object({
  phone_number: z
    .string().optional(),
  name: z.string().optional(),
  sector: z.string().optional(),
  location: z.string().optional(),
  source: z.string().optional(),
  products: z.array(z.number()).optional(),
  medical: z.string().optional(),
  payment_type: z.string().optional(),
  payment_method: z.string().optional(),
  extra_phone: z.string().optional(),
  telegram_phone: z.string().optional(),
  recall_date: z.union([z.date(), z.string()]).nullable()
});

type FormValues = z.infer<typeof FormSchema>;


const InputMaskPage = () => {
  const [selectType, setSelectType] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>([]);
  const { data: dataSector, isSuccess: sectorSuccess } = useGetItemsQuery(1);
  const { data: dataSectorMedical, isSuccess: medicalSuccess } = useGetItemByIdQuery(1);
  const { data: dataLocation, isSuccess: locationSuccess } = useGetItemsWithFiltersQuery();
  const { data: customersData, isSuccess: successCustomer } = useGetItemsCustomerQuery(1);
  const { data: dataPaymentOrders, isSuccess: successPaymentOrders } = useGetItemsPaymentOrdersQuery(1);
  const { data: dataPayment, isSuccess: successPayment } = useGetItemsPaymentQuery(1);
  const [updateItem, { isSuccess: crateSuccess, isError: errorCreate, error }] = useUpdateItemMutation();
  const { pid } = useParams<{ pid: string }>();
  const [getItemsDetails, { data: dataDetails }] = useLazyGetItemsDetailsQuery();

  useEffect(() => {
    if (dataDetails?.products && dataDetails?.products?.length > 0) {
      setSelected(dataDetails?.products?.map((item: any) => item))
    }
  }, [dataDetails?.products]);


  useEffect(() => {
    if (pid) {
      getItemsDetails(pid);
    }
  }, [pid, getItemsDetails]);


  const handleModalClose = () => {
    setIsModalOpen(false);
  };


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone_number: "",
      name: "",
      sector: "",
      location: "",
      source: "",
      products: [],
      medical: "",
      payment_type: "",
      payment_method: "",
      recall_date: "",
    },
  });


  const onSubmit = async (data: FormValues) => {
    if (!dataDetails) {
      return;
    }
    const changes = {
      phone_number: data.phone_number,
      name: data.name ?? '',
      sector: data.sector ? JSON.parse(data.sector)?.id : '',
      location: data.location ? JSON.parse(data.location)?.id : '',
      source: data.source ? JSON.parse(data.source)?.id : '',
      products: data.products,
      medical: data.medical ? JSON.parse(data.medical)?.id : '',
      payment_type: data.payment_type ?? '',
      payment_method: data.payment_method ?? '',
      extra_phone: data.extra_phone ?? '',
      telegram_phone: data.telegram_phone ?? '',
      recall_date: data.recall_date ? (data.recall_date === '' ? null : data.recall_date) : null,
    };
    await updateItem({ id: dataDetails.id, changes }).unwrap();

  }


  React.useEffect(() => {
    if (crateSuccess) {
      toast.success("Muvaffaqiyatli yaratildi");
      form.reset();
      window.location.assign("/dashboard");
    }
  }, [crateSuccess]);


  React.useEffect(() => {
    if (errorCreate) {
      const backendErrors = (error as any).data as Record<string, string>;
      Object.keys(backendErrors).forEach((key) => {
        form.setError(key as keyof FormValues, {
          type: "manual",
          message: backendErrors[key],
        });
      });

    }
  }, [errorCreate])


  useEffect(() => {
    if (dataDetails) {
      form.reset({
        name: dataDetails.name,
        phone_number: dataDetails.phone_number,
        extra_phone: dataDetails.extra_phone,
        telegram_phone: dataDetails.telegram_phone,
        recall_date: dataDetails.recall_date,
        payment_method: JSON.stringify(dataDetails.payment_method),
        payment_type: JSON.stringify(dataDetails.payment_type),
        sector: JSON.stringify(dataDetails.sector),
        medical: JSON.stringify(dataDetails.medical),
        location: JSON.stringify(dataDetails.location),
        source: JSON.stringify(dataDetails.source),
        products: dataDetails?.products?.length > 0 ? dataDetails?.products?.map(item => Number(item?.id)) : [],
      });
    }
  }, [dataDetails]);





  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-5">
        <div  >
          <div className="grid gap-4 md:grid-cols-2  lg:grid-cols-3">

            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="m-0">Telefon raqam</FormLabel>
                  <FormControl>
                    <PhoneNumber
                      id="prefix"
                      field={field}
                      options={{
                        prefix: "+998",
                        blocks: [4, 2, 3, 2, 2],
                        uppercase: true,
                        numericOnly: true,

                      }}
                      placeholder="+998"
                      className={cn("", {
                        "border-destructive focus:border-destructive":
                          !!form.formState.errors.phone_number,
                      })}
                      type="tel"
                    />
                  </FormControl>
                  <FormMessage className="p-0 m-0" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="m-0">F.I.O</FormLabel>
                  <FormControl className="h-10">
                    <Input
                      placeholder="F.I.O..."
                      {...field}
                      className={cn("", {
                        "border-destructive focus:border-destructive ":
                          !!form.formState.errors.name,
                      })}
                    />
                  </FormControl>
                  <FormMessage className="p-0 m-0" />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="m-0">Manzilni tanlang</FormLabel>
                  <FormControl>
                    <SelectShadcn onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue>
                          {field.value ? JSON.parse(field.value)?.name : "Manzilni tanlang"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="z-[60]">
                        {
                          locationSuccess && dataLocation?.results?.map((item: FilterResult) => (
                            <SelectItem key={item.id} value={JSON.stringify(item)}>{item.name}</SelectItem>
                          ))
                        }

                      </SelectContent>
                    </SelectShadcn>
                  </FormControl>
                  <FormMessage className="p-0 m-0" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sector"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="m-0">Sectorni tanlang</FormLabel>
                  <FormControl >
                    <SelectShadcn
                      onValueChange={field.onChange}

                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue>
                          {field.value ?

                            <div className="w-full flex gap-2 items-center">
                              <span className={`w-[12px] h-[12px] rounded-full ${JSON.parse(field.value)?.status ? "bg-green-500" : "bg-red-600"} `}></span>
                              <span>{JSON.parse(field.value)?.name}</span>
                            </div>


                            : "Sectorni tanlang"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="z-[60]">
                        {
                          sectorSuccess && dataSector?.results?.map((sector: FilterResult) => (
                            <SelectItem key={sector.id} value={JSON.stringify(sector)}>
                              <div className="w-full flex gap-2 items-center">
                                <span className={`w-[12px] h-[12px] rounded-full ${sector?.status ? "bg-green-500" : "bg-red-600"} `}></span>
                                <span>{sector.name}</span>
                              </div>
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </SelectShadcn>
                  </FormControl>
                  <FormMessage className="p-0 m-0" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="medical"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="p-0">
                    Medical-Sectorni tanlang(2)
                  </FormLabel>

                  <FormControl>
                    <SelectShadcn

                      onValueChange={(value) => {
                        const parsedValue = value ? JSON.parse(value) : {}
                        field.onChange(value);
                        if (parsedValue?.name === "add") {
                          setIsModalOpen(true);
                          setSelectType("sector2");
                          form.setValue("medical", JSON.stringify({ name: "", id: "" }));
                        }
                      }
                      }

                      value={field.value}>
                      <SelectTrigger>
                        <SelectValue>
                          {field.value ? <div className="w-full flex gap-2 items-center">
                            <span className={`w-[12px] h-[12px] rounded-full ${JSON.parse(field.value)?.status ? "bg-green-500" : "bg-red-600"} `}></span>
                            <span>{JSON.parse(field.value)?.name}</span>
                          </div> : "Medical-Sectorni tanlang(2)"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="z-[60]">
                        {
                          medicalSuccess && dataSectorMedical?.results?.map((item: FilterResult) => (
                            <SelectItem key={item.id} value={JSON.stringify(item)}> <div className="w-full flex gap-2 items-center">
                              <span className={`w-[12px] h-[12px] rounded-full ${item?.status ? "bg-green-500" : "bg-red-600"} `}></span>
                              <span>{item.name}</span>
                            </div></SelectItem>
                          ))
                        }
                        <SelectItem value={JSON.stringify({ name: "add", id: "add" })} ><div className="flex gap-1 items-center"><Plus fontSize="800" className="w-4 h-4 text-primary-500" /><p>Yangi qo'shish</p></div></SelectItem>
                      </SelectContent>
                    </SelectShadcn>
                  </FormControl>
                  <FormMessage className="p-0 m-0" />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="m-0">
                    Xaridor kelish manbai tanlang
                  </FormLabel>
                  <FormControl>
                    <SelectShadcn
                      onValueChange={field.onChange}


                      value={field.value}>
                      <SelectTrigger>
                        <SelectValue>
                          {field.value ? <div className="w-full flex gap-2 items-center">
                            <span className={`w-[12px] h-[12px] rounded-full ${JSON.parse(field.value)?.status ? "bg-green-500" : "bg-red-600"} `}></span>
                            <span>{JSON.parse(field.value)?.name}</span>
                          </div> : "Xaridorlar manbaini tanlang"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="z-[60]">
                        {
                          successCustomer && customersData?.results?.map((item: FilterResult) => (
                            <SelectItem key={item.id} value={JSON.stringify(item)}>
                              <div className="w-full flex gap-2 items-center">
                                <span className={`w-[12px] h-[12px] rounded-full ${item?.status ? "bg-green-500" : "bg-red-600"} `}></span>
                                <span>{item.name}</span>
                              </div>
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </SelectShadcn>
                  </FormControl>
                  <FormMessage className="p-0 m-0" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="products"
              render={({ field }) => (
                <FormItem >
                  <FormLabel className="m-0">Uskunalarni tanlang</FormLabel>
                  <FormControl>
                    <SelectSearchSeller
                      onSelect={(selectedIds) => (field.onChange(selectedIds), setSelected([]))}
                      defaultValue={selected}
                    />
                  </FormControl>
                  <FormMessage className="p-0 m-0" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="payment_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="m-0">
                    To'lov turini tanlang
                  </FormLabel>
                  <FormControl>
                    <SelectShadcn onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue>
                          {field.value ? JSON.parse(field.value)?.name : "To'lov turini tanlang"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="z-[60]">
                        {
                          successPaymentOrders && dataPaymentOrders?.results?.map((sector: FilterResult) => (
                            <SelectItem key={sector.id} value={JSON.stringify(sector)}>{sector.name}</SelectItem>
                          ))
                        }
                      </SelectContent>
                    </SelectShadcn>
                  </FormControl>
                  <FormMessage />
                  <FormMessage className="p-0 m-0" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="payment_method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="m-0">
                    To'lash tartibi
                  </FormLabel>
                  <FormControl >
                    <SelectShadcn value={field.value} onValueChange={field.onChange} >
                      <SelectTrigger>
                        <SelectValue>
                          {field.value ? JSON.parse(field.value)?.name : "To'lash tartibi"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="z-[60]">
                        {
                          successPayment && dataPayment?.results?.map((sector: FilterResult) => (
                            <SelectItem key={sector.id} value={JSON.stringify(sector)}>{sector.name}</SelectItem>
                          ))
                        }

                        
                      </SelectContent>
                    </SelectShadcn>
                  </FormControl>
                  <FormMessage className="p-0 m-0" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="recall_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="m-0">
                    Qayta uchrashish vaqti
                  </FormLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full  text-left font-normal  border-default-300",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <span>{field.value ? new Date(field.value).toLocaleDateString() : "Qayta uchrashish vaqti"}</span>
                          <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => {
                          if (date) {
                            field.onChange(date)
                          }
                        }}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }

                        // initialFocus
                      />
                    </PopoverContent>

                  </Popover>
                  <FormMessage className="p-0 m-0" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="extra_phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="m-0">
                    Qo'shimcha telefon nomer(ixtiyoriy)
                  </FormLabel>
                  <FormControl className="h-10">
                    <PhoneNumber
                      id="prefix"
                      field={field}
                      options={{
                        prefix: "+998",
                        blocks: [4, 2, 3, 2, 2],
                        uppercase: true,
                        numericOnly: true,
                      }}
                      placeholder="Qo'shimcha telefon nomer(ixtiyoriy)"
                      className={cn("", {
                        "border-destructive focus:border-destructive":
                          !!form.formState.errors.extra_phone,
                      })}
                    />

                  </FormControl>
                  <FormMessage className="p-0 m-0" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="telegram_phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="m-0">
                    Telegram nomer(ixtiyoriy)
                  </FormLabel>
                  <FormControl className="h-10">

                    <PhoneNumber
                      id="prefix"
                      field={field}
                      options={{
                        prefix: "+998",
                        blocks: [4, 2, 3, 2, 2],
                        uppercase: true,
                        numericOnly: true,
                      }}
                      placeholder="Telegram nomer(ixtiyoriy)"
                      className={cn("", {
                        "border-destructive focus:border-destructive":
                          !!form.formState.errors.telegram_phone,
                      })}
                    />

                  </FormControl>
                  <FormMessage className="p-0 m-0" />
                </FormItem>
              )}
            />
          </div>

          <div className=" w-full mt-5 flex justify-end">
            <Button type="submit">Yaratish</Button>
          </div>
        </div>
      </form>

      <AddNewOptionModal
        isOpen={isModalOpen}
        onOpenChange={handleModalClose}
        setIsModalOpen={setIsModalOpen}
        setSelectType={setSelectType}
        selectType={selectType}
      />
    </Form >
  );
};

export default InputMaskPage;
