import { useState } from "react";
import SelectSearch from "../../form/search";
import { Link } from "react-router-dom";

const horizontalHeader = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="flex items-center lg:gap-12 gap-3 w-[80%]">
      <div className="w-[20%]">
        <Link
          to="/dashboard"
          className=" text-primary flex items-center gap-2"
        >
          {/* <Image src={logo} alt="logo" height={32} width={32} /> */}

          <span className=" text-xl font-semibold lg:inline-block hidden">
            {" "}
            Ht-Med-Crm
          </span>
        </Link>
      </div>
      <div
        className=" inline-flex w-full lg:gap-2 lg:mr-0 mr-2 items-center text-default-600 text-sm"
      >
        <div className="lg:inline-block hidden md:w-[80%]">
          <SelectSearch setSearch={setSearch} search={search} />
          </div>

      </div>
    </div>

  );
};

export default horizontalHeader;
