"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";

export function AccountConfirmer() {
  const [username, setUsername] = useState("");
  const { data: userData, isLoading: isUserLoading } = api.auth.get_user.useQuery();
  const createUserMutation = api.auth.create_user_entity.useMutation({
    onSuccess: () => {
      window.location.reload();
    },
  });

  if (isUserLoading) {
    return <div>Loading...</div>;
  }

  if (userData?.user) {
    return <div>User already exists</div>;
  }

  return (
    <div className="w-full max-w-md space-y-4">
      <div>
        <label className="block text-sm font-medium">Username</label>
        <Input
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <Button
        onClick={() => createUserMutation.mutate({
          username,

        })}
        disabled={createUserMutation.isPending}
      >
        {createUserMutation.isPending ? "Creating..." : "Create Account"}
      </Button>
    </div>
  );
}
