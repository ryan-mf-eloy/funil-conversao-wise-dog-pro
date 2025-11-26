import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm ring-offset-white transition-all gap-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "text-white bg-[#1C8C58] border-2 border-[#0F5A35] shadow-[4px_4px_0px_0px_#0F5A35] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none hover:bg-[#156B43] hover:border-[#0F5A35] hover:scale-[1.02] active:scale-[0.98] active:translate-x-[6px] active:translate-y-[6px] active:bg-[#0F5A35] rounded-xl font-[700] transition-all duration-200 cursor-pointer",
        noShadow:
          "text-[var(--mtext)] bg-[var(--main)] border-2 border-[var(--border)] rounded-xl font-[500]",
        neutral:
          "bg-[var(--bw)] text-[var(--text)] border-2 border-[var(--border)] shadow-[var(--shadow)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none rounded-xl font-[500]",
        reverse:
          "text-[var(--mtext)] bg-[var(--main)] border-2 border-[var(--border)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[var(--shadow)] rounded-xl font-[500]",
        // Keep existing variants for backward compatibility
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-14 px-10 text-base",
        xl: "h-16 px-12 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
