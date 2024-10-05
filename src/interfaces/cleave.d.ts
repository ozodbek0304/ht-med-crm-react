// @types/cleave.d.ts or src/cleave.d.ts
declare module 'cleave.js/react' {
    import * as React from 'react';
  
    interface CleaveOptions {
      delimiter?: string;
      numeral?: boolean;
      numeralThousandsGroupStyle?: 'thousand' | 'lakh';
      // Add any other options you need based on the cleave.js documentation
    }
  
    interface CleaveProps extends React.InputHTMLAttributes<HTMLInputElement> {
      options?: CleaveOptions;
    }
  
    const Cleave: React.FC<CleaveProps>;
  
    export default Cleave;
  }
  