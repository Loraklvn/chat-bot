import {
  FileText,
  Stethoscope,
  FileSignature,
  NotebookText,
} from "lucide-react";

type TypeIconProps = {
  type: "session" | "doc" | "note" | "plan";
};

export function TypeIcon({ type }: TypeIconProps) {
  const map = {
    session: { Icon: Stethoscope, bg: "bg-sky-100", text: "text-sky-600" },
    doc: { Icon: FileText, bg: "bg-orange-100", text: "text-orange-600" },
    plan: { Icon: FileSignature, bg: "bg-violet-100", text: "text-violet-600" },
    note: { Icon: NotebookText, bg: "bg-rose-100", text: "text-rose-600" },
  } as const;

  const cfg = map[type];
  const Icon = cfg.Icon;
  return (
    <div
      className={`flex h-7 w-7 items-center justify-center rounded-full ${cfg.bg}`}
    >
      <Icon className={`h-4 w-4 ${cfg.text}`} />
    </div>
  );
}
