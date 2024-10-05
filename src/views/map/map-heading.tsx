import { useState } from "react";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Dialog, DialogContent, DialogTrigger } from "../../components/ui/dialog";
import { Icon } from "@iconify/react";
import { Label } from "../../components/ui/label";

const MapHeading = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [source, setSource] = useState(""); 
  const [status, setStatus] = useState("");
  const [device, setDevice] = useState(""); 
  const [paymentType, setPaymentType] = useState("");
  const [location, setLocation] = useState(""); 

  const handleInputChange = (e:any) => {
    setSearchTerm(e.target.value);
  };

    
    
  return (
    <Card className="p-3 flex justify-between items-center">
      <p className="px-3 font-medium text-lg text-black">Karta bo'yicha izlash</p>
      <div className="flex items-center gap-4">
        <Input
          className="w-[600px]"
          type="text"
          placeholder="Uskuna, mijoz ismi . . ."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <Dialog>
          <DialogTrigger asChild>
            <Icon
              className="text-customText w-8 h-8 cursor-pointer rounded-lg bg-transparent transition-all duration-200 hover:bg-primary-100 hover:scale-105 hover:shadow-md"
              icon="heroicons:adjustments-horizontal"
            />
          </DialogTrigger>
          <DialogContent>
            <div>
              <Label className="mb-1">Kelish manbaini tanlang</Label>
              <Select value={source} onValueChange={setSource}>
                <SelectTrigger>
                  <SelectValue placeholder="Ma'lumot tanlang" />
                </SelectTrigger>
                <SelectContent className="z-[60]">
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="mathmatics">Mathmatics</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-1">Statusni tanlang</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Ma'lumot tanlang" />
                </SelectTrigger>
                <SelectContent className="z-[60]">
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="mathmatics">Mathmatics</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-1">Uskuna bo'yicha</Label>
              <Select value={device} onValueChange={setDevice}>
                <SelectTrigger>
                  <SelectValue placeholder="Ma'lumot tanlang" />
                </SelectTrigger>
                <SelectContent className="z-[60]">
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="mathmatics">Mathmatics</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-1">To'lov turi bo'yicha</Label>
              <Select value={paymentType} onValueChange={setPaymentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Ma'lumot tanlang" />
                </SelectTrigger>
                <SelectContent className="z-[60]">
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="mathmatics">Mathmatics</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-1">Manzil bo'yicha</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Ma'lumot tanlang" />
                </SelectTrigger>
                <SelectContent className="z-[60]">
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="mathmatics">Mathmatics</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
};

export default MapHeading;
