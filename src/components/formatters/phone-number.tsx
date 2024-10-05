import * as React from "react";
import Cleave from "cleave.js/react";
import "cleave.js/dist/addons/cleave-phone.us";
import { cn } from "@/lib/utils";
import { CleaveOptions } from "cleave.js/options";
import { ControllerRenderProps } from "react-hook-form";

interface CleaveInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  options: CleaveOptions;
  field: ControllerRenderProps<any, any>;
}

const PhoneNumber = React.forwardRef<HTMLInputElement, CleaveInputProps>(
  ({ className, type, field, options, ...props }, ref) => {
    const handleChange = (event: any) => {
      field.onChange(event.target.rawValue); // Faqat raqam qismini yuborish
    };

    React.useEffect(() => {
      field.onChange("");
    }, [field.onChange]);


    return (
      <div className="flex-1 w-full">
        <div className="relative">
          <Cleave
            type={type}
            className={cn(
              "flex h-10 w-full rounded-lg border border-default-300 bg-background px-3 py-2 text-sm focus:outline-none focus:border-primary file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-accent-foreground/50 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-secondary read-only:bg-secondary transition duration-300",
              className
            )}
            value={field.value}
            onChange={handleChange}
            onBlur={field.onBlur}
            options={options}
            {...props}
          />
        </div>
      </div>
    );
  }
);
PhoneNumber.displayName = "PhoneNumber";

export { PhoneNumber };

