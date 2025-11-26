import { AppStoreButton } from "@/components/ui/app-store-button";
import { cn } from "@/lib/utils";

export default function AppStoreButtonDemo() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center">
      <a href="#">
        <AppStoreButton />
      </a>

      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-10 left-1/2 size-full -translate-x-1/2 rounded-full",
          "bg-[radial-gradient(ellipse_at_center,--theme(--color-foreground/.1),transparent_50%)]",
          "blur-[30px]"
        )}
      />
    </div>
  );
}

