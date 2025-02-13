"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const defaultFAQs = [
  {
    question: "How do I track my tax payments?",
    answer:
      "You can track your tax payments through the dashboard's Transaction History section. All payments are automatically recorded and categorized for easy monitoring.",
  },
  {
    question: "What tax documents do I need to prepare?",
    answer:
      "Essential documents include W-2s, 1099s, receipts for deductions, and previous tax returns. Our system will guide you through collecting all necessary documentation based on your specific situation.",
  },
  {
    question: "How often should I review my tax status?",
    answer:
      "We recommend reviewing your tax status monthly to ensure compliance and avoid surprises. The Tax Status Banner on your dashboard provides real-time updates on your current status.",
  },
  {
    question: "Can I manage multiple business accounts?",
    answer:
      "Yes, you can manage multiple business accounts through the Organization Switcher feature. Each account maintains separate tax records and settings while sharing the same convenient interface.",
  },
  {
    question: "How are tax alerts determined?",
    answer:
      "Tax alerts are generated based on your business type, filing deadlines, and transaction patterns. Our system monitors these factors continuously to provide timely notifications about important tax-related actions.",
  },
];

export function FAQ() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <h2 className="mb-6 text-2xl font-bold">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {defaultFAQs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
