"use client";

import { Building2, ChevronUp } from "lucide-react";
import { useOrganizationStore } from "~/store/organization";
import { cn } from "~/lib/utils";

interface AccountSwitcherTriggerProps {
  className?: string;
  onClick?: () => void;
}

export function AccountSwitcherTrigger({
  className,
  onClick,
}: AccountSwitcherTriggerProps) {
  const { currentOrganization } = useOrganizationStore();

  return (
    <div
      role="button"
      onClick={onClick}
      className={cn(
        "group flex w-full cursor-pointer items-center justify-between rounded-lg bg-black/20 p-4 transition-colors hover:bg-black/30",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <Building2 className="h-8 w-8" />
        <div className="text-left">
          <div className="font-medium">{currentOrganization.name}</div>
          {currentOrganization.role && (
            <div className="text-sm opacity-80">{currentOrganization.role}</div>
          )}
        </div>
      </div>
      <ChevronUp className="h-4 w-4 rotate-0 transition-transform group-data-[state=open]:rotate-180" />
    </div>
  );
}
