import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { UIConfig } from "~/types/ui";

interface UseUISettingsFormProps {
  initialValues: Omit<UIConfig, "id" | "userId">;
}

const UISchema = z
  .object({
    sidebarTitle: z.string().min(1, "Sidebar title is required"),
    greetingTitle: z.string().min(1, "Greeting title is required"),
    greetingSubtitle: z.string().min(1, "Greeting subtitle is required"),
    sidebarLogoId: z.string().nullable(),
    greetingLogoId: z.string().nullable(),
    layoutBorderRadius: z.string().min(1, "Border radius is required"),
    layoutDensity: z.enum(["comfortable", "compact", "spacious"]),
    sidebarWidth: z.number().min(200).max(400),
    baseFontSize: z.string().min(1, "Base font size is required"),
    animationSpeed: z.enum(["slower", "default", "faster"]),
    // For form handling only
    sidebarLogoType: z.enum(["none", "url", "upload"]),
    sidebarLogoUrl: z.string().optional(),
    greetingLogoType: z.enum(["none", "url", "upload"]),
    greetingLogoUrl: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.sidebarLogoType === "url") {
        return z.string().url().safeParse(data.sidebarLogoUrl).success;
      }
      return true;
    },
    {
      message: "Invalid sidebar logo URL",
      path: ["sidebarLogoUrl"],
    },
  )
  .refine(
    (data) => {
      if (data.greetingLogoType === "url") {
        return z.string().url().safeParse(data.greetingLogoUrl).success;
      }
      return true;
    },
    {
      message: "Invalid greeting logo URL",
      path: ["greetingLogoUrl"],
    },
  );

export type FormValues = z.infer<typeof UISchema>;

export function useUISettingsForm({ initialValues }: UseUISettingsFormProps) {

  const getFormValues = React.useCallback(
    (config: Omit<UIConfig, "id" | "userId">): FormValues => {
      try {
        return {
          sidebarTitle: config.sidebarTitle,
          greetingTitle: config.greetingTitle,
          greetingSubtitle: config.greetingSubtitle,
          sidebarLogoId: config.sidebarLogoId,
          greetingLogoId: config.greetingLogoId,
          layoutBorderRadius: config.layoutBorderRadius,
          layoutDensity: config.layoutDensity,
          sidebarWidth: config.sidebarWidth,
          baseFontSize: config.baseFontSize,
          animationSpeed: config.animationSpeed,
          // Set logo types based on ID presence
          sidebarLogoType: config.sidebarLogoId ? "url" : "none",
          sidebarLogoUrl: "", // Will be populated from logos table
          greetingLogoType: config.greetingLogoId ? "url" : "none",
          greetingLogoUrl: "", // Will be populated from logos table
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

  const form = useForm<FormValues>({
    resolver: zodResolver(UISchema),
    defaultValues,
    mode: "all",
    criteriaMode: "all",
  });

  // Validate form on mount
  React.useEffect(() => {
    void form.trigger();
  }, [form]);

  const createConfig = React.useCallback(
    (
      values: FormValues,
      sidebarPreview: string | null,
      greetingPreview: string | null,
    ): Omit<UIConfig, "id" | "userId"> => {
      const config: Omit<UIConfig, "id" | "userId"> = {
        sidebarTitle: values.sidebarTitle,
        greetingTitle: values.greetingTitle,
        greetingSubtitle: values.greetingSubtitle,
        sidebarLogoId: null,
        greetingLogoId: null,
        layoutBorderRadius: values.layoutBorderRadius,
        layoutDensity: values.layoutDensity,
        sidebarWidth: values.sidebarWidth,
        baseFontSize: values.baseFontSize,
        animationSpeed: values.animationSpeed,
      };

      // Note: Logo IDs should be set after creating logo records in the logos table
      // The component using this hook should handle the logo creation and ID assignment

      return config;
    },
    [],
  );

  return {
    form,
    createConfig,
  };
}
