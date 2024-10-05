import { Icon } from "@iconify/react";
import { InputGroup, InputGroupText } from "../ui/input-group";
import { Input } from '../ui/input';

type Props = {
    setSearch: any;
    search: string;
}

const SelectSearch = ({ setSearch, search }: Props) => {


    return (
        <div className='w-full relative z-40 '>
            <InputGroup className="w-full mb-3 sm:m-0">
                <InputGroupText>
                    <Icon icon="heroicons:magnifying-glass" />
                </InputGroupText>
                <Input onInput={(e: any) => setSearch(e.target.value)} type="text" placeholder="Qidiruv" />
            </InputGroup>
            {search?.trim() !== '' && <div className='bg-white   dark:bg-slate-800 absolute top-[100%] shadow-lg mt-1 left-0 w-full p-2 rounded-lg '>
                {
                    Array(10).fill(0).map((_, index: number) => (
                        <div key={index} className="flex justify-between cursor-pointer items-center gap-7 sm:gap-4 w-full p-2 border-b-[1px]  hover:bg-default-50 ">

                            <div className="flex justify-between items-center gap-3 w-full">
                                {/* <div className="relative inline-block">
                                    <Avatar>
                                        <AvatarImage src={item?.image.src} />
                                        <AvatarFallback>{item?.name}</AvatarFallback>
                                    </Avatar>
                                </div> */}
                                <div className="w-full">
                                    <div className="flex w-full justify-between">

                                        <div className="text-sm font-medium text-default-800 mb-1 whitespace-nowrap">
                                            Akmal Nazarov
                                        </div>
                                        <div className="text-[11px] font-medium text-default-800 mb-1 whitespace-nowrap">
                                            10-oktyabr 2024 - 14:00
                                        </div>
                                    </div>
                                    <div className="text-xs text-default-600 whitespace-nowrap">+998 93 102 30 42</div>
                                </div>
                            </div>


                        </div>
                    ))
                }
            </div>}

        </div>
    )
}

export default SelectSearch