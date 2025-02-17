"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CompleteThemeConfig, CompleteUIConfig } from "~/server/db/schema";

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
interface UICustomizationProps {
  theme_config: CompleteThemeConfig;
  ui_config: CompleteUIConfig;
}

export function FAQ({ theme_config, ui_config }: UICustomizationProps)  {
  return (
    <div 
      className="mx-auto w-full max-w-3xl"
      style={{
        background: `linear-gradient(to bottom right, ${theme_config.is_light_theme ? theme_config.lightTheme.primary : theme_config.darkTheme.primary}15, ${theme_config.is_light_theme ? theme_config.lightTheme.secondary : theme_config.darkTheme.secondary}10)`,
        border: `1px solid ${theme_config.is_light_theme ? theme_config.lightTheme.primary : theme_config.darkTheme.primary}40`,
        boxShadow: `0 0 10px ${theme_config.is_light_theme ? theme_config.lightTheme.accent : theme_config.darkTheme.accent}20`,
        borderRadius: ui_config.layoutBorderRadius,
        padding: ui_config.layoutDensity === 'compact' ? '1rem' : 
                ui_config.layoutDensity === 'spacious' ? '2rem' : '1.5rem',
        transition: `all ${
          ui_config.animationSpeed === 'slower' ? '0.4s' :
          ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
        } ease`
      }}
    >
      <h2 
        className="mb-6 font-bold"
        style={{
          fontSize: `calc(${ui_config.baseFontSize} * 1.5)`,
          color: theme_config.is_light_theme ? theme_config.lightTheme.primary : theme_config.darkTheme.primary,
          transition: `all ${
            ui_config.animationSpeed === 'slower' ? '0.4s' :
            ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
          } ease`
        }}
      >
        Frequently Asked Questions
      </h2>
      <Accordion 
        type="single" 
        collapsible 
        className="w-full space-y-2"
      >
        {defaultFAQs.map((faq, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`}
            style={{
              borderColor: `${theme_config.is_light_theme ? theme_config.lightTheme.primary : theme_config.darkTheme.primary}40`,
              marginBottom: ui_config.layoutDensity === 'compact' ? '0.5rem' : 
                          ui_config.layoutDensity === 'spacious' ? '1.5rem' : '1rem'
            }}
          >
            <AccordionTrigger 
              className="text-left hover:no-underline group"
              style={{
                fontSize: ui_config.baseFontSize,
                padding: ui_config.layoutDensity === 'compact' ? '0.75rem' : 
                        ui_config.layoutDensity === 'spacious' ? '1.5rem' : '1rem',
                borderRadius: `calc(${ui_config.layoutBorderRadius} * 0.75)`,
                transition: `all ${
                  ui_config.animationSpeed === 'slower' ? '0.4s' :
                  ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                } ease`,
                color: theme_config.is_light_theme ? theme_config.lightTheme.primary : theme_config.darkTheme.primary,
                backgroundColor: 'transparent'
              }}
            >
              {faq.question}
            </AccordionTrigger>
            <AccordionContent
              style={{
                fontSize: `calc(${ui_config.baseFontSize} * 0.875)`,
                padding: ui_config.layoutDensity === 'compact' ? '0.75rem' : 
                        ui_config.layoutDensity === 'spacious' ? '1.5rem' : '1rem',
                color: theme_config.is_light_theme ? theme_config.lightTheme.secondary : theme_config.darkTheme.secondary,
                transition: `all ${
                  ui_config.animationSpeed === 'slower' ? '0.4s' :
                  ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                } ease`
              }}
            >
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
