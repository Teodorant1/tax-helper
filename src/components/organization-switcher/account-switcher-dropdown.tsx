"use client";

import { useState, useRef, useEffect } from "react";
import { LogOut, Plus, SwitchCamera } from "lucide-react";
import { AccountSwitcherTrigger } from "./account-switcher-trigger";
import { cn } from "~/lib/utils";

interface AccountSwitcherDropdownProps {
  onSwitchAccount: () => void;
}

export function AccountSwitcherDropdown({
  onSwitchAccount,
}: AccountSwitcherDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.top,
        left: rect.right + 8, // 8px offset from the sidebar
      });
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={triggerRef}>
      <AccountSwitcherTrigger onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20"
            onClick={() => setIsOpen(false)}
          />
          <div
            style={{
              position: "fixed",
              top: menuPosition.top,
              left: menuPosition.left,
            }}
            className={cn(
              "z-50 w-[200px] rounded-md border bg-white p-1 shadow-lg dark:bg-gray-800",
              "animate-in fade-in-0 zoom-in-95",
            )}
          >
            <div
              role="button"
              onClick={() => {
                onSwitchAccount();
                setIsOpen(false);
              }}
              className="flex w-full cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-left text-sm text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700"
            >
              <SwitchCamera className="h-4 w-4" />
              Switch account
            </div>
            <div
              role="button"
              className="flex w-full cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-left text-sm text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700"
            >
              <Plus className="h-4 w-4" />
              Add tax account
            </div>
            <div
              role="button"
              className="flex w-full cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </div>
          </div>
        </>
      )}
    </div>
  );
}
