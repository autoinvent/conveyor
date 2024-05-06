import * as React from "react";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ ...props }, ref) => (
        <div
            className="card-content"
            ref={ref}
            {...props}
        />
    )
);
CardContent.displayName = "CardContent";

export default CardContent;