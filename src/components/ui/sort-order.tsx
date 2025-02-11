"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

interface SortOrderProps {
  value: "newest" | "oldest";
  onChange?: (value: "newest" | "oldest") => void;
}

export function SortOrder({ value, onChange }: SortOrderProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          {value === "newest" ? "Newest first" : "Oldest first"}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onChange?.("newest")}>
          Newest first
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange?.("oldest")}>
          Oldest first
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
