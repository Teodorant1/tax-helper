import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { CompleteThemeConfig } from "~/server/db/schema";

interface UseThemeSettingsFormProps {
  initialValues: CompleteThemeConfig;
}

const ThemeSchema = z.object({
  lightTheme: z.object({
    primary: z.string().min(1, "Primary color is required"),
    secondary: z.string().min(1, "Secondary color is required"),
    accent: z.string().min(1, "Accent color is required"),
  }),
  darkTheme: z.object({
    primary: z.string().min(1, "Primary color is required"),
    secondary: z.string().min(1, "Secondary color is required"),
    accent: z.string().min(1, "Accent color is required"),
  }),
});

export type ThemeFormValues = z.infer<typeof ThemeSchema>;

export function useThemeSettingsForm({ initialValues }: UseThemeSettingsFormProps) {
  const getFormValues = React.useCallback(
    (config: CompleteThemeConfig): ThemeFormValues => {
      try {
        return {
          lightTheme: {
            primary: config.lightTheme.primary,
            secondary: config.lightTheme.secondary,
            accent: config.lightTheme.accent,
          },
          darkTheme: {
            primary: config.darkTheme.primary,
            secondary: config.darkTheme.secondary,
            accent: config.darkTheme.accent,
          },
        };
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Failed to get form values");
        console.error("Error getting form values:", error.message);
        throw error;
      }
    },
    [],
  );

  const defaultValues = React.useMemo(
    () => getFormValues(initialValues),
    [getFormValues, initialValues],
  );

  const form = useForm<ThemeFormValues>({
    resolver: zodResolver(ThemeSchema),
    defaultValues,
    mode: "all",
    criteriaMode: "all",
  });

  // Validate form on mount
  React.useEffect(() => {
    void form.trigger();
  }, [form]);

  const createConfig = React.useCallback(
    (values: ThemeFormValues) => {
      // Transform the form values to match the expected mutation input format
      return {
        light: {
          primary: values.lightTheme.primary,
          secondary: values.lightTheme.secondary,
          accent: values.lightTheme.accent,
        },
        dark: {
          primary: values.darkTheme.primary,
          secondary: values.darkTheme.secondary,
          accent: values.darkTheme.accent,
        },
      };
    },
    [],
  );

  return {
    form,
    createConfig,
  };
}
