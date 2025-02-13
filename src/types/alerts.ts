import { type Alert, type Client } from "~/server/db/schema";

// Mock client data
const mockClient: Client = {
  id: "client-1",
  userId: "user-1",
  name: "Rodan Enterprises, Inc.",
  taxId: "94-2392371",
  email: "contact@rodan.com",
  phone: "555-0123",
  status: "Active",
  lastFiling: "2023 Q4",
  nextFiling: "2024 Q1",
  pendingTasks: 2,
  alertCount: 5,
};

// Mock alerts with proper schema structure and client relation
export const mockAlerts: (Alert & { client: Client })[] = [
  {
    id: "1",
    clientId: mockClient.id,
    type: "info",
    clientType: "Business",
    taxId: mockClient.taxId,
    alert:
      "Code 960 - Appointed\nThe IRS has accepted TaxNow or another third party as an appointee for your tax matters.",
    taxPeriod: "2019 Q4",
    alertDate: "February 5, 2025",
    transactionDate: "December 13, 2023",
    amount: "$0.00",
    client: mockClient,
  },
  {
    id: "2",
    clientId: mockClient.id,
    type: "warning",
    clientType: "Business",
    taxId: mockClient.taxId,
    alert:
      "Code 150 - Return Filed\nThe IRS has received your 1120 form for 2019 year. Note that processing may take 6-8 weeks.",
    taxPeriod: "2019 Q4",
    alertDate: "February 5, 2025",
    transactionDate: "November 8, 2020",
    amount: "$0.00",
    client: mockClient,
  },
  {
    id: "3",
    clientId: mockClient.id,
    type: "info",
    clientType: "Business",
    taxId: mockClient.taxId,
    alert:
      "Code 460 - Extension of time\nYour extension of time to file your tax return has been processed.",
    taxPeriod: "2019 Q4",
    alertDate: "February 5, 2025",
    transactionDate: "August 2, 2020",
    amount: "$0.00",
    client: mockClient,
  },
  {
    id: "4",
    clientId: mockClient.id,
    type: "warning",
    clientType: "Business",
    taxId: mockClient.taxId,
    alert:
      "Code 150 - Return Filed\nThe IRS has received your 941 form for 2019 year. Note that processing may take 6-8 weeks.",
    taxPeriod: "2019 Q3",
    alertDate: "February 5, 2025",
    transactionDate: "December 1, 2019",
    amount: "$17,279.10",
    client: mockClient,
  },
  {
    id: "5",
    clientId: mockClient.id,
    type: "info",
    clientType: "Business",
    taxId: mockClient.taxId,
    alert:
      "Code 650 - Federal Tax\nA deposit was made towards your tax liability.",
    taxPeriod: "2019 Q3",
    alertDate: "February 5, 2025",
    transactionDate: "July 11, 2019",
    amount: "-$2,715.29",
    client: mockClient,
  },
];
