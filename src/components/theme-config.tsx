"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";
import type { ThemeConfig } from "~/types/theme";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { toast } from "~/components/ui/use-toast";

const ThemeSchema: z.ZodType<ThemeConfig> = z.object({
  light: z.object({
    primary: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
      message: "Must be a valid hex color code",
    }),
    secondary: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
      message: "Must be a valid hex color code",
    }),
    accent: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
      message: "Must be a valid hex color code",
    }),
  }),
  dark: z.object({
    primary: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
      message: "Must be a valid hex color code",
    }),
    secondary: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
      message: "Must be a valid hex color code",
    }),
    accent: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
      message: "Must be a valid hex color code",
    }),
  }),
});

export function ThemeConfig() {
  const router = useRouter();
  const [isSaved, setIsSaved] = React.useState(false);

  const form = useForm<z.infer<typeof ThemeSchema>>({
    resolver: zodResolver(ThemeSchema),
    defaultValues: React.useMemo(() => {
      if (typeof window === "undefined") {
        return {
          light: {
            primary: "#7c3aed",
            secondary: "#6b7280",
            accent: "#f59e0b",
          },
          dark: {
            primary: "#8b5cf6",
            secondary: "#9ca3af",
            accent: "#fbbf24",
          },
        };
      }

      const savedConfig = localStorage.getItem("theme-config");
      if (savedConfig) {
        try {
          return JSON.parse(savedConfig) as ThemeConfig;
        } catch (e) {
          console.error("Failed to parse saved theme config:", e);
        }
      }

      return {
        light: {
          primary: "#7c3aed",
          secondary: "#6b7280",
          accent: "#f59e0b",
        },
        dark: {
          primary: "#8b5cf6",
          secondary: "#9ca3af",
          accent: "#fbbf24",
        },
      };
    }, []),
  });

  async function onSubmit(values: ThemeConfig) {
    try {
      localStorage.setItem("theme-config", JSON.stringify(values));
      toast({
        title: "Theme updated",
        description: "Your theme settings have been saved.",
      });
      setIsSaved(true);
    } catch (error) {
      console.error("Failed to save theme config:", error);
      toast({
        title: "Error",
        description: "Failed to save theme settings. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Light Theme */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Light Theme</h2>
            <FormField
              control={form.control}
              name="light.primary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Color</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input {...field} placeholder="#7c3aed" />
                      <input
                        type="color"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="h-10 w-12"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="light.secondary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Secondary Color</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input {...field} placeholder="#6b7280" />
                      <input
                        type="color"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="h-10 w-12"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="light.accent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Accent Color</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input {...field} placeholder="#f59e0b" />
                      <input
                        type="color"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="h-10 w-12"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Dark Theme */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Dark Theme</h2>
            <FormField
              control={form.control}
              name="dark.primary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Color</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input {...field} placeholder="#8b5cf6" />
                      <input
                        type="color"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="h-10 w-12"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dark.secondary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Secondary Color</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input {...field} placeholder="#9ca3af" />
                      <input
                        type="color"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="h-10 w-12"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dark.accent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Accent Color</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input {...field} placeholder="#fbbf24" />
                      <input
                        type="color"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="h-10 w-12"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-start gap-4">
          {!isSaved ? (
            <Button type="submit" disabled={!form.formState.isDirty}>
              Save Theme Configuration
            </Button>
          ) : (
            <Button type="button" onClick={() => router.push("/")}>
              Go to Dashboard
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
