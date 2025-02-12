import { type Alert } from "~/server/db/schema";

export const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "info",
    clientName: "Rodan Enterprises, Inc.",
    clientType: "Business",
    taxId: "94-2392371",
    alert:
      "Code 960 - Appointed\nThe IRS has accepted TaxNow or another third party as an appointee for your tax matters.",
    taxPeriod: "2019 Q4",
    alertDate: "February 5, 2025",
    transactionDate: "December 13, 2023",
    amount: "$0.00",
  },
  {
    id: "2",
    type: "warning",
    clientName: "Rodan Enterprises, Inc.",
    clientType: "Business",
    taxId: "94-2392371",
    alert:
      "Code 150 - Return Filed\nThe IRS has received your 1120 form for 2019 year. Note that processing may take 6-8 weeks.",
    taxPeriod: "2019 Q4",
    alertDate: "February 5, 2025",
    transactionDate: "November 8, 2020",
    amount: "$0.00",
  },
  {
    id: "3",
    type: "info",
    clientName: "Rodan Enterprises, Inc.",
    clientType: "Business",
    taxId: "94-2392371",
    alert:
      "Code 460 - Extension of time\nYour extension of time to file your tax return has been processed.",
    taxPeriod: "2019 Q4",
    alertDate: "February 5, 2025",
    transactionDate: "August 2, 2020",
    amount: "$0.00",
  },
  {
    id: "4",
    type: "warning",
    clientName: "Rodan Enterprises, Inc.",
    clientType: "Business",
    taxId: "94-2392371",
    alert:
      "Code 150 - Return Filed\nThe IRS has received your 941 form for 2019 year. Note that processing may take 6-8 weeks.",
    taxPeriod: "2019 Q3",
    alertDate: "February 5, 2025",
    transactionDate: "December 1, 2019",
    amount: "$17,279.10",
  },
  {
    id: "5",
    type: "info",
    clientName: "Rodan Enterprises, Inc.",
    clientType: "Business",
    taxId: "94-2392371",
    alert:
      "Code 650 - Federal Tax\nA deposit was made towards your tax liability.",
    taxPeriod: "2019 Q3",
    alertDate: "February 5, 2025",
    transactionDate: "July 11, 2019",
    amount: "-$2,715.29",
  },
];
