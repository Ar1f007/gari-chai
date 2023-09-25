import * as React from "react";
import { title } from "./primitives";

type SectionTitleProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
} & React.HTMLAttributes<HTMLHeadingElement>;

const SectionTitle = React.forwardRef<HTMLHeadingElement, SectionTitleProps>(
  ({ children, className, variant, ...props }, ref) => {
    const Title = variant || "h1";

    return (
      <Title
        className={title({ size: "sm", className })}
        ref={ref}
        {...props}
      >
        {children}
      </Title>
    );
  }
);

SectionTitle.displayName = "SectionTitle";

export default SectionTitle;
