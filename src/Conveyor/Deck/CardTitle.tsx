import * as React from "react";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ ...props }, ref) => (
        <h3
            className="card-title"
            ref={ref}
            {...props}
        />
    )
);
CardTitle.displayName = "CardTitle";

export default CardTitle;