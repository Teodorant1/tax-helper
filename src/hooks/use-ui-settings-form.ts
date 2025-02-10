import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUISettings } from "~/store/ui-settings";
import type { UIConfig } from "~/types/ui";

const UISchema = z
  .object({
    sidebarTitle: z.string().min(1, "Sidebar title is required"),
    greetingTitle: z.string().min(1, "Greeting title is required"),
    sidebarLogoType: z.enum(["none", "url", "upload"]),
    sidebarLogoUrl: z.string().optional(),
    greetingLogoType: z.enum(["none", "url", "upload"]),
    greetingLogoUrl: z.string().optional(),
    layout: z.object({
      borderRadius: z.string().min(1, "Border radius is required"),
      layoutDensity: z.enum(["comfortable", "compact", "spacious"]),
      sidebarWidth: z.number().min(200).max(400),
    }),
    typography: z.object({
      baseFontSize: z.string().min(1, "Base font size is required"),
      animationSpeed: z.enum(["slower", "default", "faster"]),
    }),
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

export function useUISettingsForm() {
  const { settings, setSettings } = useUISettings();

  const getFormValues = React.useCallback(
    (config: NonNullable<UIConfig>): FormValues => {
      try {
        return {
          sidebarTitle: config.sidebarTitle,
          greetingTitle: config.greeting.title,
          sidebarLogoType: config.sidebarLogo ? "url" : "none",
          sidebarLogoUrl: config.sidebarLogo?.value ?? "",
          greetingLogoType: config.greeting.logo ? "url" : "none",
          greetingLogoUrl: config.greeting.logo?.value ?? "",
          layout: {
            borderRadius: config.layout.borderRadius,
            layoutDensity: config.layout.layoutDensity,
            sidebarWidth: config.layout.sidebarWidth,
          },
          typography: {
            baseFontSize: config.typography.baseFontSize,
            animationSpeed: config.typography.animationSpeed,
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
    () => getFormValues(settings),
    [getFormValues, settings],
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(UISchema),
    defaultValues,
    mode: "all",
    criteriaMode: "all",
  });

  // Validate form on mount and settings change
  React.useEffect(() => {
    void form.trigger();
  }, [form, settings]);

  React.useEffect(() => {
    if (form.formState.isDirty) {
      form.reset(getFormValues(settings));
    }
  }, [form, settings, getFormValues]);

  const createConfig = React.useCallback(
    (
      values: FormValues,
      sidebarPreview: string | null,
      greetingPreview: string | null,
    ): NonNullable<UIConfig> => {
      const config: UIConfig = {
        sidebarTitle: values.sidebarTitle,
        sidebarLogo: null,
        greeting: {
          title: values.greetingTitle,
          subtitle: "Your modern tax management solution",
          logo: null,
        },
        layout: {
          borderRadius: values.layout.borderRadius,
          layoutDensity: values.layout.layoutDensity,
          sidebarWidth: values.layout.sidebarWidth,
        },
        typography: {
          baseFontSize: values.typography.baseFontSize,
          animationSpeed: values.typography.animationSpeed,
        },
      };

      if (values.sidebarLogoType === "url" && values.sidebarLogoUrl) {
        config.sidebarLogo = {
          type: "url",
          value: values.sidebarLogoUrl,
        };
      } else if (values.sidebarLogoType === "upload" && sidebarPreview) {
        config.sidebarLogo = {
          type: "upload",
          value: sidebarPreview,
        };
      }

      if (values.greetingLogoType === "url" && values.greetingLogoUrl) {
        config.greeting.logo = {
          type: "url",
          value: values.greetingLogoUrl,
        };
      } else if (values.greetingLogoType === "upload" && greetingPreview) {
        config.greeting.logo = {
          type: "upload",
          value: greetingPreview,
        };
      }

      return config;
    },
    [],
  );

  return {
    form,
    createConfig,
    setSettings,
  };
}
