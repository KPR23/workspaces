import { Loader2 } from "lucide-react";
import { Button } from "./button";
import { type ButtonProps } from "./button";
import { cn } from "~/lib/utils";

interface LoadingButtonProps extends ButtonProps {
  isLoading?: boolean;
  children: React.ReactNode;
}

export function LoadingButton({
  isLoading,
  children,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      className={cn("flex items-center gap-2", className)}
      disabled={isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
