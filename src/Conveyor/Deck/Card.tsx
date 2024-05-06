import * as React from "react";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ children, ...props }, ref) => {
        const [isHovered, setIsHovered] = React.useState(false);

        // Event handlers for mouse enter and leave
        const handleMouseEnter = () => {
        setIsHovered(true);
        };

        const handleMouseLeave = () => {
        setIsHovered(false);
        };

        return (
            <div
                ref={ref}
                className={`relative group border rounded-lg bg-[--bg-color] text-[--text-color] border-solid border-[--border-color] shadow-sm inline-block m-2 p-4 w-[300px] h-[300px] overflow-hidden justify-center transition-all duration-300 ease-in-out hover:h-[300px]}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                {...props}
            >
                <div className="circle">
                    {/* Render the content always */}
                    <div className="circle-content">
                        {React.Children.map(children, (child) => {
                            if (React.isValidElement(child)) {
                                if(!isHovered) {
                                    if (
                                        child.type &&
                                        ((child.type as any).displayName !== "CardHeader" &&
                                        (child.type as any).displayName !== "CardTitle"
                                    )) {
                                        return React.cloneElement(child);
                                    }
                            } else if (child.type) {
                                return React.cloneElement(child);
                            }
                            }
                            return null;
                        })}
                    </div>
                </div>
                {/* Render title and description below circle */}
                {!isHovered &&
                    React.Children.map(children, (child) => {
                        if (React.isValidElement(child) && ((child.type as any).displayName === "CardHeader" || (child.type as any).displayName === "CardTitle")) {
                            return React.cloneElement(child);
                        }
                        return null;
                })}
            </div>
        );
    }
);

Card.displayName = "Card";

export default Card;