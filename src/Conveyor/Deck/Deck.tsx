import * as React from "react";

const Deck = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({style, ...props }, ref) => (
        <div
            ref={ref}
            className="flex-wrap"
            style={{...style}}
            {...props}
        />
    )
);
Deck.displayName = "Deck";

export default Deck;