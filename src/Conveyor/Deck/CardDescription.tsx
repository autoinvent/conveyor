import * as React from "react";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    ({ ...props }, ref) => (
        <p
            className="card-description"
            ref={ref}
            {...props}
        />
    )
);
CardDescription.displayName = "CardDescription";

export default CardDescription;