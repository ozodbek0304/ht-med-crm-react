"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Annoyed, Loader2, SendHorizontal } from "lucide-react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";


import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCreateItemMutation, useUpdateItemMutation } from "@/features/comments/comment";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
  propValue: any;
  setPropValue: (value: any) => void;
}


const CommentFooter = ({ propValue, setPropValue }: Props) => {
  const [message, setMessage] = useState<any>('');
  const [createItem, { isSuccess: createSuccess, isError: cretaeError, error: errorCreate, isLoading: createLoading }] = useCreateItemMutation();
  const [updateItem, { isSuccess: updateSuccess, isError: updateError, error: errorUpdates, isLoading: updateIsloading }] = useUpdateItemMutation()
  const { pid } = useParams<{ pid: string }>();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight - 15}px`;
  };

  const handleSelectEmoji = (emoji: any) => {
    setMessage(message + emoji.native);

  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (propValue?.text && propValue?.id) {
      await updateItem({ id: propValue?.id as string, changes: message })
    } else {
      const newItem = {
        id: pid,
        text: message,
      };
      await createItem(newItem as any).unwrap();

    }

  };

  useEffect(() => {
    if (createSuccess) {
      setMessage("");
    }
  }, [createSuccess]);

  useEffect(() => {
    if (cretaeError) {
      const backendErrors = (errorCreate as any).originalStatus as Record<string, string>
      toast.error("Status:" + backendErrors + ' ' + "Xatolik yuz berdi")
    }
  }, [cretaeError]);

  useEffect(() => {
    if (updateSuccess) {
      setMessage("");
      setPropValue("")
    }
  }, [updateSuccess]);

  useEffect(() => {
    if (updateError) {
      const backendErrors = ((errorUpdates as any).originalStatus || (errorUpdates as any).status) as Record<string, string>
      toast.error("Status:" + backendErrors + ' ' + ((errorUpdates as any)?.data?.detail || "Xatolik yuz berdi"))
    }
  }, [updateError]);



  useEffect(() => {
    if (propValue !== undefined) {
      setMessage(propValue?.text);
    }
  }, [propValue]);


  

  return (
    <>
      <div className="w-full flex items-end gap-4 px-4">
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <div className="flex  gap-1 relative">
              <textarea
                value={message}
                placeholder="Xabar yozish..."
                className="bg-background border border-default-200 outline-none focus:border-primary rounded-xl break-words pl-8 md:pl-3 px-3 flex-1 h-10 pt-2 p-1 pr-8 no-scrollbar"
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e as any);
                  }
                }}
                style={{
                  minHeight: "40px",
                  maxHeight: "120px",
                  overflowY: "auto",
                  resize: "none",
                }}
              />

              <Popover >
                <PopoverTrigger asChild>
                  <span className="absolute right-12  bottom-1.5 h-7 w-7 rounded-full cursor-pointer">
                    <Annoyed className="w-6 h-6 text-primary" />
                  </span>
                </PopoverTrigger>
                <PopoverContent side="top" className="w-fit p-0 shadow-none border-none bottom-0 ">
                  <Picker onEmojiSelect={handleSelectEmoji} data={data} theme="light" />
                </PopoverContent>
              </Popover>

              <Button
                disabled={message?.trim() === "" || message === undefined || createLoading || updateIsloading}
                type="submit"
                className="rounded-full bg-default-100 hover:bg-default-100 h-[42px] w-[42px] p-0 self-end"
              >
                {(createLoading || updateIsloading) ? <Loader2 className=" h-5 w-5 animate-spin text-primary-500 " /> : <SendHorizontal className="w-5 h-8 text-primary" />}

              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CommentFooter;
