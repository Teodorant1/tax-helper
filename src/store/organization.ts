import { create } from "zustand";

export type Organization = {
  id: string;
  name: string;
  type: "pro" | "tax";
  role?: string;
};

// Mock data for testing
export const MOCK_ORGANIZATIONS: Organization[] = [
  { id: "1", name: "Edgewater Ventures Inc", type: "pro", role: "Admin" },
  { id: "2", name: "ACET Recycling", type: "pro", role: "Full" },
  { id: "3", name: "TaxNow PRO1", type: "pro", role: "Manager" },
  { id: "4", name: "Smith & Associates", type: "tax" },
  { id: "5", name: "Johnson Tax Services", type: "tax" },
];

interface OrganizationState {
  currentOrganization: Organization;
  organizations: Organization[];
  setCurrentOrganization: (org: Organization) => void;
  searchOrganizations: (query: string) => Organization[];
}

export const useOrganizationStore = create<OrganizationState>((set, get) => ({
  currentOrganization: MOCK_ORGANIZATIONS[0]!,
  organizations: MOCK_ORGANIZATIONS,
  setCurrentOrganization: (org) => set({ currentOrganization: org }),
  searchOrganizations: (query) => {
    const { organizations } = get();
    if (!query) return organizations;
    const lowercaseQuery = query.toLowerCase();
    return organizations.filter((org) =>
      org.name.toLowerCase().includes(lowercaseQuery),
    );
  },
}));
