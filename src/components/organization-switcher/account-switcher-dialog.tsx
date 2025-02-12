"use client";

import { useState } from "react";
import { Search, Zap } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { useOrganizationStore, type Organization } from "~/store/organization";

interface AccountSwitcherDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AccountSwitcherDialog({
  open,
  onOpenChange,
}: AccountSwitcherDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { organizations, setCurrentOrganization, searchOrganizations } =
    useOrganizationStore();

  const handleOrganizationSelect = (org: Organization) => {
    setCurrentOrganization(org);
    onOpenChange(false);
  };

  const filteredOrganizations = searchOrganizations(searchQuery);
  const proAccounts = filteredOrganizations.filter((org) => org.type === "pro");
  const taxAccounts = filteredOrganizations.filter((org) => org.type === "tax");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white dark:bg-gray-900 sm:max-w-[425px]">
        <DialogHeader className="text-center">
          <DialogTitle className="flex items-center justify-center gap-2 text-xl font-semibold">
            <Zap className="h-6 w-6 text-purple-500" />
            Choose Your Account
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
            Switch between your professional and tax accounts
          </DialogDescription>
        </DialogHeader>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="mt-6 space-y-6">
          <div>
            <h3 className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">
              Pro Accounts
            </h3>
            {proAccounts.length > 0 ? (
              <div className="space-y-1">
                {proAccounts.map((org) => (
                  <button
                    key={org.id}
                    onClick={() => handleOrganizationSelect(org)}
                    className="w-full rounded-md p-3 text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    {org.name}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No pro accounts found.
              </p>
            )}
          </div>
          <div>
            <h3 className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">
              Tax Accounts
            </h3>
            {taxAccounts.length > 0 ? (
              <div className="space-y-1">
                {taxAccounts.map((org) => (
                  <button
                    key={org.id}
                    onClick={() => handleOrganizationSelect(org)}
                    className="w-full rounded-md p-3 text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    {org.name}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No tax accounts associated with your profile yet.
              </p>
            )}
          </div>
        </div>
        <button className="mt-6 w-full text-center text-sm text-purple-500 transition-colors hover:text-purple-600">
          Sign in with a different account
        </button>
      </DialogContent>
    </Dialog>
  );
}
