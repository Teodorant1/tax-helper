"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import { AccountConfirmer } from "./account-confirmer";
import { api } from "~/trpc/react";

export function AccountConfirmerModal() {
  const { data: userData, isLoading } = api.auth.get_user.useQuery();

  if (isLoading) return null;

  return (
    <Dialog open={!userData?.user} modal>
      <DialogContent className="sm:max-w-[425px] [&>button]:hidden">
        <DialogHeader>
          <DialogTitle>Complete Your Account</DialogTitle>
          <DialogDescription>
            Please provide your information to continue.
          </DialogDescription>
        </DialogHeader>
        <AccountConfirmer />
      </DialogContent>
    </Dialog>
  );
}
