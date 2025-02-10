"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";

export function InviteLink() {
  const inviteLink =
    "https://apps.taxnow.com/loginless?proOrg=c9586c60-ca4b-43fa-9";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      toast({
        title: "Link copied",
        description: "The invite link has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please try copying the link manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="rounded-lg border bg-card p-6 shadow-sm">
      <h2 className="mb-2 text-xl font-semibold">Invite User With Link</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        Send this link to your clients for an effortless self onboarding
      </p>
      <div className="space-y-2">
        <div className="flex flex-col gap-2 md:flex-row">
          <Input value={inviteLink} readOnly className="font-mono text-sm" />
          <Button variant="outline" size="icon" onClick={handleCopy}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
            <span className="sr-only">Copy link</span>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          This link allows your clients to onboard to your Pro Firm Account
        </p>
      </div>
    </section>
  );
}
