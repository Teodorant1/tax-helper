import { AlertTriangle } from "lucide-react";

export function TaxStatusBanner() {
  return (
    <div className="mb-6 rounded-lg bg-yellow-50 p-4 text-yellow-800">
      <div className="flex items-center">
        <AlertTriangle className="mr-2 h-5 w-5" />
        <p>
          As of February 11, 2025, it looks like your 2024 tax return has not
          been filed yet.
        </p>
      </div>
    </div>
  );
}
