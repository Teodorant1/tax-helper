"use client";

import { useState } from "react";
import { AccountSwitcherDropdown } from "./account-switcher-dropdown";
import { AccountSwitcherDialog } from "./account-switcher-dialog";

export function OrganizationSwitcher() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <AccountSwitcherDropdown onSwitchAccount={() => setDialogOpen(true)} />
      <AccountSwitcherDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
