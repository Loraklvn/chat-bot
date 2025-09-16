import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  status: "completed" | "in-progress";
  className?: string;
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const isCompleted = status === "completed";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium",
        isCompleted ? "text-emerald-700" : "text-blue-700",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-2.5 w-2.5 rounded-full",
          isCompleted ? "bg-emerald-500" : "bg-blue-500"
        )}
      />
      {isCompleted ? "Completed" : "In progress"}
    </span>
  );
}
