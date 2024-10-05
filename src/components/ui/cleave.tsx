import * as React from "react";
import Cleave from "cleave.js/react";
import "cleave.js/dist/addons/cleave-phone.us";
import { cn } from "../../lib/utils";


interface CleaveInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  options: any; // Ensure options align with CleaveProps
}

const CleaveInput = React.forwardRef<HTMLInputElement, CleaveInputProps>(({ className, type, options, ...props }, ref) => {
  // Ensure options.numeralThousandsGroupStyle is one of the valid values
  const validatedOptions: any = {
    ...options,
    numeralThousandsGroupStyle: options.numeralThousandsGroupStyle === "none" ? undefined : options.numeralThousandsGroupStyle,
  };

  return (
    <div className="flex-1 w-full">
      <div className="relative">
        <Cleave
          ref={ref}
          type={type}
          options={validatedOptions}
          className={cn(
            "flex h-10 w-full rounded border border-default-300 bg-background px-3 py-2 text-sm focus:outline-none focus:border-primary file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-accent-foreground/50 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-secondary read-only:bg-secondary transition duration-300",
            className
          )}
          {...props}
        />
      </div>
    </div>
  );
});
CleaveInput.displayName = "CleaveInput";

export { CleaveInput };
