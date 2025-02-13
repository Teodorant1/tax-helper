"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export function RoleToggler() {
  const [isSuccess, setIsSuccess] = useState(false);

  const toggleRoleMutation = api.auth.toggle_user_role.useMutation({
    onSuccess: () => {
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000); // Hide success message after 3 seconds
    },
  });

  const handleToggle = () => {
    // Toggle between 'user' and 'admin' roles
    toggleRoleMutation.mutate({ role: "admin" });
  };

  return (
    <div className="space-y-2">
      <Button
        onClick={handleToggle}
        disabled={toggleRoleMutation.isPending}
        variant="outline"
      >
        {toggleRoleMutation.isPending ? "Updating..." : "Toggle to Admin Role"}
      </Button>

      {isSuccess && (
        <div className="text-sm font-medium text-green-600">
          Role updated successfully!
        </div>
      )}
    </div>
  );
}
