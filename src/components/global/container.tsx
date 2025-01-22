import { cn } from "../../lib/utils";
import * as React from "react";

export interface IContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "fullScreen";
}

export function Container({
  children,
  className,
  variant = "default",
}: IContainerProps) {
  return (
    <main
      className={cn(
        "mx-auto",
        [variant === "default" && "px-5 md:max-w-screen-lg xl:max-w-screen-xl"],
        [variant === "fullScreen" && "md:max-w-screen-lg xl:max-w-screen-xl"],
        className
      )}
    >
      {children}
    </main>
  );
}
