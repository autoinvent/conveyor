import * as React from "react";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ ...props }, ref) => (
        <div
            ref={ref}
            className="card-footer"
            {...props}
        />
    )
);
CardFooter.displayName = "CardFooter";

export default CardFooter;