import React, { useState } from 'react'
import { Icon } from "@iconify/react";
import { InputGroup, InputGroupText } from "@/components/ui/input-group";
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useDebounce from '@/hooks/use-Debunce';
import { useGetItemsUserSearchQuery } from '@/features/settings/location-lists';
import { formatPhoneNumber } from '../formatters/phone-formatter';
import { formatCustomDate } from '../formatters/date-formatter';
import { Alert, AlertDescription } from '../ui/alert';

type Props = {
    onSelect: (item: any) => void;
    height?: string;
}

const SelectSearchSeller = ({ onSelect, height = "h-[36px]" }: Props) => {
    const [search, setSearch] = useState<string>('');
    const [placeholder, setPlaceholder] = useState<string>('Qidiruv');
    const [toggle, setToggle] = useState<boolean>(false);
    const debunce = useDebounce(search, 500);
    const { data, isLoading, isSuccess, isError, error } = useGetItemsUserSearchQuery(debunce);


    return (
        <div className='w-full relative z-40 ' >
            <InputGroup className="w-full mb-3 sm:m-0">
                <InputGroupText>
                    <Icon icon="heroicons:magnifying-glass" />
                </InputGroupText>
                <Input
                    className={height}
                    onInput={(e: any) => setSearch(e.target.value)}
                    onFocus={() => setToggle(true)}
                    onBlur={() => {
                        setTimeout(() => {
                            setToggle(false)
                        }, 200);
                    }}
                    type="text" placeholder={formatPhoneNumber(placeholder) || "Qidiruv"} />
            </InputGroup>

            {toggle && <div className='bg-white   dark:bg-slate-800 absolute top-[100%] shadow-lg mt-1 left-0 w-full p-2 rounded-lg overflow-y-auto max-h-[300px] '>
                {
                    isSuccess && data?.results?.map((item: any, index: number) => (
                        <div key={index} onClick={() => (onSelect(item), setPlaceholder(item?.phone))} className="flex justify-between  cursor-pointer items-center gap-7 sm:gap-4 w-full p-2 border-b-[1px]  hover:bg-default-50 ">

                            <div className="flex justify-between items-center gap-3 w-full">
                                <div className="relative inline-block">
                                    <Avatar className='h-8 w-8'>
                                        <AvatarImage src={item?.image} />
                                        <AvatarFallback>{item?.full_name?.slice(0, 2)}</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="w-full">
                                    <div className="flex w-full justify-between">

                                        <div className="text-sm font-medium text-default-800 mb-1 whitespace-nowrap">
                                            {item?.full_name}
                                        </div>
                                        <div className="text-[11px] font-medium text-default-800 mb-1 whitespace-nowrap">
                                            {formatCustomDate(item?.created_at)}
                                        </div>
                                    </div>
                                    <div className="text-xs text-default-600 whitespace-nowrap">{formatPhoneNumber(item?.phone)}</div>
                                </div>
                            </div>


                        </div>
                    ))
                }


                {isError && <Alert className="w-full p-1" variant={"outline"} color="destructive">
                    <AlertDescription className="w-full  text-center">Status: {(error as any)?.originalStatus}, Xatolik yuz berdi</AlertDescription>
                </Alert>}

                {isSuccess && data.count == 0 &&
                    <Alert className="w-full p-1" variant={"outline"} color="warning">
                        <AlertDescription className="w-full text-center">Ma'lumot topilmadi</AlertDescription>
                    </Alert>
                }

            </div>}


        </div>
    )
}

export default SelectSearchSeller