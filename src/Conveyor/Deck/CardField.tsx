import * as React from "react";

const CardField = React.forwardRef<HTMLPreElement, React.HTMLAttributes<HTMLPreElement>>(
    ({ ...props }, ref) => (
        <pre
            ref={ref}
            className="card-field"
            {...props}
        />
    )
);
CardField.displayName = "CardField";

export default CardField;