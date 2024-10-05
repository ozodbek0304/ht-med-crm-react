import { useEffect, useState } from 'react'
import { Icon } from "@iconify/react";
import { InputGroup, InputGroupText } from "../ui/input-group";
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Alert, AlertDescription } from '../ui/alert';
import { useSellerStore } from '../../store/products';
import useDebounce from '../../hooks/use-Debunce';
import { useGetItemsCustomerProductsQuery } from '../../features/settings/products-lists';


type Props = {
    onSelect: (selectedIds: any[]) => void;
    height?: string;
    defaultValue?: any;
}

const SelectSearchSeller = ({ onSelect, height = "h-[36px]", defaultValue }: Props) => {
    const { queryParam, setQueryParam } = useSellerStore();
    const [search, setSearch] = useState<null>(null);
    const queryStr = new URLSearchParams({
        ...(queryParam as Record<string, string>),
    }).toString();

    const debunce = useDebounce(search, 500);
    const { data, isSuccess, isError, error } = useGetItemsCustomerProductsQuery(queryStr);
    const [toggle, setToggle] = useState<boolean>(false);
    const [selectedItems, setSelectedItems] = useState<any[]>([]);

    useEffect(() => {
        if (defaultValue?.length > 0) {
            setSelectedItems(defaultValue)
        }
    }, [defaultValue]);


    const handleSelect = (item: any) => {
        let updatedItems;
        if (selectedItems.some((selectedItem) => selectedItem.id === item.id)) {
            updatedItems = selectedItems.filter((selectedItem) => selectedItem.id !== item.id);
        } else {

            updatedItems = [...selectedItems, item];
        }

        setSelectedItems(updatedItems);
        onSelect(updatedItems.map((selectedItem) => selectedItem.id));
    };


    useEffect(() => {
        if (debunce !== null) {
            setQueryParam({ search: debunce });
        }
    }, [debunce]);



    return (
        <div className='w-full relative z-40'>
            <InputGroup className="w-full mb-3 sm:m-0">
                <Input
                    className={height}
                    onInput={(e: any) => setSearch(e.target.value)}
                    onFocus={() => setToggle(true)}
                    onBlur={() => {
                        setTimeout(() => {
                            setToggle(false)
                        }, 200);
                    }}
                    type="text"
                    placeholder={
                        selectedItems.length > 0
                            ? selectedItems.map((selectedItem) => selectedItem.name).join(', ')
                            : "Uskuna tanlang"
                    }
                />
                <InputGroupText className='px-1'>
                    <Icon icon="bytesize:chevron-bottom" />
                </InputGroupText>
            </InputGroup>

            {toggle && <div className='bg-white dark:bg-slate-800 absolute top-[100%] shadow-lg mt-1 left-0 w-full p-2 rounded-lg overflow-y-auto max-h-[300px]'>
                {isSuccess && data?.results?.map((item: any, index: number) => (
                    <div
                        key={index}
                        onClick={() => handleSelect(item)}
                        className="flex justify-between cursor-pointer items-center gap-7 sm:gap-4 w-full p-2 border-b-[1px] hover:bg-default-50"
                    >
                        <div className="flex justify-between items-center gap-3 w-full">
                            <div className="relative inline-block">
                                <Avatar className='h-5 w-5'>
                                    <AvatarImage src={item?.image} />
                                    <AvatarFallback>{item?.name?.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="text-[12px] font-medium text-default-600 m-0 whitespace-nowrap w-full">
                                {item?.name}
                            </div>
                            {selectedItems.some((selectedItem) => selectedItem.id === item.id) && (
                                <Icon icon="mdi:check-circle" className="text-green-500 text-[18px]" />
                            )}
                        </div>
                    </div>
                ))}
                {isError && <Alert className="w-full p-1" variant={"outline"} color="destructive">
                    <AlertDescription className="w-full text-center">Status: {(error as any)?.originalStatus}, Xatolik yuz berdi</AlertDescription>
                </Alert>}
                {isSuccess && data.count === 0 &&
                    <Alert className="w-full p-1" variant={"outline"} color="warning">
                        <AlertDescription className="w-full text-center">Ma'lumot topilmadi</AlertDescription>
                    </Alert>
                }
            </div>}
        </div>
    );
}

export default SelectSearchSeller;
