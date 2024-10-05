import { Icon } from "@iconify/react";
import { InputGroup, InputGroupText } from "../../../components/ui/input-group";
import { Input } from "../../../components/ui/input";
import { UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import CreateSellerModal from "./create-seller";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import useDebounce from "../../../hooks/use-Debunce";
import { useSellerStore } from "../../../store/sellersStore";

const SellerHeading = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState<string | null>(null);
  const debunce = useDebounce(search, 800);
  const { setQueryParam } = useSellerStore();

  useEffect(() => {
    if (debunce !== null) {
    setQueryParam({ search: debunce });
    }
  }, [debunce]);



  return (
    <Card className="sm:flex sm:items-center sm:justify-between  p-3 rounded-lg">
      <InputGroup className="sm:w-[400px] mb-3 sm:m-0">
        <InputGroupText>
          <Icon icon="heroicons:magnifying-glass" />
        </InputGroupText>
        <Input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Qidiruv..."
        />
      </InputGroup>

      <Button className="flex gap-2" onClick={() => setIsModalOpen(true)}>
        <UserPlus className="w-4 h-4" /> Sotuvchi qo'shish
      </Button>
      <CreateSellerModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </Card>
  );
};

export default SellerHeading;
