import * as React from "react";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ ...props }, ref) => (
        <div
            className="flex flex-col gap-6 items-center justify-center p-0 bg-transparent border-0 transform -translate-y-200"
            ref={ref}
            {...props}
        />
    )
);
CardHeader.displayName = "CardHeader";

export default CardHeader;