import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Loader2, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useCreateItemMutation } from "@/features/seller/seller";
import toast from "react-hot-toast";
import { PhoneNumber } from "@/components/formatters/phone-number";
import { Checkbox } from "@/components/ui/checkbox";
import SelectSearchSeller from "@/components/form/search_create-seller";
import { CreateItem } from "@/interfaces/seller-page";



interface CreateSellerModalProps {
  isOpen: boolean;
  setIsModalOpen: (status: boolean) => void;
  modalTitle?: string;
}

const FormSchema = z.object({
  full_name: z.string().optional(),
  password: z.string().optional(),
  heritage: z.string().optional(),
  phone: z.string().optional(),
  personal_phone: z.string().optional(),
  address: z.string().optional(),
  registered_address: z.instanceof(File).optional(),
  image: z.instanceof(File).optional(),
  pinfl: z.instanceof(File).optional(),
  passport_img: z.instanceof(File).optional(),
  page_permission: z.array(z.number()).optional(),
});

type FormValues = z.infer<typeof FormSchema>;



const CreateSellerModal = ({
  isOpen,
  setIsModalOpen,
  modalTitle = "Sotuvchi yaratish",
}: CreateSellerModalProps) => {



  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      full_name: "",
      password: "",
      phone: "",
      heritage: "",
      personal_phone: "",
      address: "",
      registered_address: undefined,
      pinfl: undefined,
      passport_img: undefined,
      image: undefined,
    },
  });




  const [createItem, { isLoading, isSuccess, isError, error }] =
    useCreateItemMutation();
  const [newAvatar, setNewAvatar] = useState<string | null>(null);
  const [phoneValue, setPhoneValue] = useState("")


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewAvatar(imageUrl);
      form.setValue("image", file)
    }
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {

    const formData = new FormData();
    if (data.full_name) {
      formData.append("full_name", data.full_name);
    }
    if (data.phone) {
      formData.append("phone", data.phone);
    }
    if (data.password) {
      formData.append("password", data.password);
    }
    if (data.personal_phone) {
      formData.append("personal_phone", data.personal_phone);
    }
    if (data.address) {
      formData.append("address", data.address);
    }
    if (data.page_permission) {
      formData.append("page_permission", String(data.page_permission));
    }
    if (data.image) {
      formData.append("image", data.image);
    }
    if (data.registered_address) {
      formData.append("registered_address", data.registered_address);
    }
    if (data.pinfl) {
      formData.append("pinfl", data.pinfl);
    }
    if (data.passport_img) {
      formData.append("passport_img", data.passport_img);
    }
    await createItem(formData as Partial<CreateItem>).unwrap();

  }

  useEffect(() => {
    if (isSuccess) {
      toast.success("Muvaffaqiyatli qo'shildi");
      setIsModalOpen(false);
      form.reset();

    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      const backendErrors = (error as any).data as Record<string, string>;
      Object.keys(backendErrors).forEach((key) => {
        form.setError(key as keyof FormValues, {
          type: "manual",
          message: backendErrors[key],
        });
      });

    }
  }, [isError]);


  function handleClose() {
    setIsModalOpen(false);
    form.reset();
  }


  useEffect(() => {
    if (phoneValue) {
      form.setValue('phone', phoneValue);
    }
  }, [form, phoneValue]);





  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="p-6" size="4xl">
          <DialogHeader>
            <DialogTitle className="text-base font-medium ">
              {modalTitle && modalTitle}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <div className="w-full flex items-center justify-center">
                      <div className="w-[124px] h-[124px] relative rounded-full">
                        {newAvatar && <Image
                          width={124}
                          height={124}
                          src={newAvatar}
                          alt="avatar"
                          className="w-full h-full object-cover rounded-full"
                          priority={true}
                        />}
                        <Button
                          asChild
                          size="icon"
                          className="h-8 w-8 rounded-full cursor-pointer absolute bottom-0 right-0"
                        >
                          <Label htmlFor="avatar">
                            <Icon
                              className="w-5 h-5 text-primary-foreground"
                              icon="heroicons:pencil-square"
                            />
                          </Label>
                        </Button>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            className="w-full hidden"
                            onChange={handleFileChange}
                            id="avatar"
                          />
                        </FormControl>
                      </div>
                    </div>
                  </FormItem>
                )}
              />
              <div className="space-y-5">
                <div className="grid xl:grid-cols-2 gap-y-3 gap-x-4 relative items-start">


                  <FormField
                    control={form.control}
                    name="page_permission"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="m-0 ">Ba'zani ko'ra oladi</FormLabel>
                        <FormControl className="w-full">
                          <label id="default_1" className="border-[1px] h-[40px] text-default-400 p-2 border-default-200 hover:text-primary-500 items-center flex gap-2 cursor-pointer rounded-lg hover:border-primary-400">
                            <Checkbox
                              id="default_1"
                              checked={Array.isArray(field.value) && field.value.includes(1)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([1]);

                                } else {
                                  field.onChange([2]);
                                }
                              }}
                            >

                            </Checkbox>
                            <span className="text-[12px]">Sotuvchilar uchun ruxsat</span>
                          </label>
                        </FormControl>
                        <FormMessage className="m-0 p-0" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="heritage"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="m-0 ">...ning davomchisi</FormLabel>
                        <FormControl className="w-full">
                          <SelectSearchSeller height="h-[40px]" onSelect={(item) => (field.onChange(item?.phone), setPhoneValue(item?.phone))} />
                        </FormControl>
                        <FormMessage className="m-0 p-0" />
                      </FormItem>
                    )}
                  />


                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="m-0 ">Ism familiya</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ism familiya"
                            {...field}
                            className={cn("h-[40px]", {
                              "border-destructive focus:border-destructive":
                                form.formState.errors.full_name,
                            })}
                          />
                        </FormControl>
                        <FormMessage className="m-0 p-0" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-0">Login</FormLabel>
                        <FormControl>
                          <PhoneNumber
                            id="phone"
                            field={field}
                            type="phone"
                            options={{
                              prefix: "+998",
                              blocks: [4, 2, 3, 2, 2],
                              uppercase: true,
                              numericOnly: true,
                            }}
                            placeholder="Telefon raqam"
                            className={cn("peer", {
                              "border-destructive": form.formState.errors.phone,
                            })}
                          />
                        </FormControl>
                        <FormMessage className="m-0 p-0" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-0">Yashash manzili</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Yashash manzili"
                            {...field}
                            value={field.value ?? ""}
                            className={cn("h-[40px]", {
                              "border-destructive focus:border-destructive ":
                                form.formState.errors.address,
                            })}
                          />
                        </FormControl>
                        <FormMessage className="m-0 p-0" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-0">Parol</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Parol"
                            {...field}
                            className={cn("h-[40px]", {
                              "border-destructive focus:border-destructive":
                                form.formState.errors.password,
                            })}
                          />
                        </FormControl>
                        <FormMessage className="m-0 p-0" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="registered_address"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col justify-end">
                        <FormLabel>Ro'yxatdan o'tgan manzil</FormLabel>
                        <FormControl>
                          <Label className="m-0 w-full cursor-pointer">
                            <Button asChild className="m-0" variant={"outline"}>
                              <div className="w-full">
                                <Upload className="mr-2 h-4 w-4" /> {form?.getValues('registered_address')?.name?.slice(0, 30) || "Fayl tanlang"}
                              </div>
                            </Button>
                            <Input
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  field.onChange(file);
                                }
                              }}
                              type="file"
                              accept="application/pdf, image/*"
                              className="hidden" />
                          </Label>


                        </FormControl>
                        <FormMessage className="m-0 p-0" />
                      </FormItem>

                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pinfl"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col justify-end">
                        <FormLabel>PINFL</FormLabel>
                        <FormControl>
                          <Label className="m-0 w-full cursor-pointer">
                            <Button asChild className="m-0" variant={"outline"}>
                              <div className="w-full">
                                <Upload className="mr-2 h-4 w-4" /> {form?.getValues('pinfl')?.name?.slice(0, 30) || "Fayl tanlang"}
                              </div>
                            </Button>
                            <Input
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  field.onChange(file);
                                }
                              }}
                              type="file"
                              accept="application/pdf, image/*"
                              className="hidden" />
                          </Label>


                        </FormControl>
                        <FormMessage className="m-0 p-0" />
                      </FormItem>

                    )}
                  />

                  <FormField
                    control={form.control}
                    name="passport_img"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col justify-end h-full">
                        <FormLabel>Passport</FormLabel>
                        <FormControl>
                          <Label className="m-0 w-full cursor-pointer">
                            <Button asChild className="m-0" variant={"outline"}>
                              <div className="w-full">
                                <Upload className="mr-2 h-4 w-4 mb-1" /> {form?.getValues('passport_img')?.name?.slice(0, 30) || "Fayl tanlang"}
                              </div>
                            </Button>
                            <Input
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  field.onChange(file);
                                }
                              }}
                              type="file"
                              accept="application/pdf, image/*"
                              className="hidden" />
                          </Label>

                        </FormControl>
                        <FormMessage className="m-0 p-0" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="personal_phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-0">
                          Shaxsiy Telefon raqam
                        </FormLabel>
                        <FormControl>
                          <PhoneNumber
                            id="personal_phone"
                            field={field}
                            type="phone"
                            options={{
                              prefix: "+998",
                              blocks: [4, 2, 3, 2, 2],
                              uppercase: true,
                              numericOnly: true,
                            }}
                            placeholder="Telefon raqam"
                            className={cn("peer", {
                              "border-destructive":
                                form.formState.errors.personal_phone,
                            })}
                          />
                        </FormControl>
                        <FormMessage className="m-0 p-0" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="w-full flex justify-end">
                <Button>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Tekshirilmoqda ...
                    </>
                  ) : (
                    "Saqlash"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateSellerModal;
