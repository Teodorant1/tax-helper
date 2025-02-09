"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Slider } from "~/components/ui/slider";
import { toast } from "~/components/ui/use-toast";

const UISchema = z.object({
  borderRadius: z.string(),
  fontSize: z.string(),
  animationSpeed: z.number().min(0).max(2),
  density: z.enum(["compact", "comfortable", "spacious"]),
  sidebarWidth: z.number().min(200).max(400),
  greeting: z.object({
    title: z.string().min(1),
    subtitle: z.string().min(1),
  }),
  logo: z.object({
    url: z.string().url().optional().or(z.literal("")).default(""),
    alt: z.string().min(1),
  }),
});

export function UICustomization() {
  const form = useForm<z.infer<typeof UISchema>>({
    resolver: zodResolver(UISchema),
    defaultValues: React.useMemo(() => {
      // Try to load saved settings from localStorage
      const savedSettings = localStorage.getItem("ui-config");
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings) as z.infer<typeof UISchema>;
          return parsed;
        } catch (error) {
          console.error("Failed to parse saved UI settings:", error);
        }
      }
      // Fall back to defaults if no saved settings or parsing fails
      return {
        borderRadius: "0.5rem",
        fontSize: "1rem",
        animationSpeed: 1,
        density: "comfortable",
        sidebarWidth: 240,
        greeting: {
          title: "Welcome to TaxNow PRO",
          subtitle: "Your modern tax management solution",
        },
        logo: {
          url: "",
          alt: "TaxNow PRO Logo",
        },
      };
    }, []),
  });

  async function onSubmit(values: z.infer<typeof UISchema>) {
    try {
      // Validate logo URL if provided
      if (values.logo.url.trim()) {
        const img = new Image();
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = values.logo.url;
        });
      }

      // Save UI customization values to localStorage
      localStorage.setItem("ui-config", JSON.stringify(values));

      // Apply the changes
      const root = document.documentElement;
      root.style.setProperty("--radius", values.borderRadius);
      root.style.setProperty("--font-size-base", values.fontSize);
      root.style.setProperty(
        "--animation-duration",
        `${0.2 * values.animationSpeed}s`,
      );
      root.style.setProperty(
        "--content-spacing",
        values.density === "compact"
          ? "0.5rem"
          : values.density === "comfortable"
            ? "1rem"
            : "1.5rem",
      );
      root.style.setProperty("--sidebar-width", `${values.sidebarWidth}px`);

      toast({
        title: "UI Settings updated",
        description: "Your UI customization settings have been saved.",
      });
    } catch (error) {
      toast({
        title: "Error updating settings",
        description: "Please ensure the logo URL is valid and accessible.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-8">
          {/* Branding Section */}
          <div className="rounded-lg border p-4">
            <h3 className="mb-4 text-lg font-semibold">Branding</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="logo.url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Logo URL</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="https://example.com/logo.png"
                        />
                      </FormControl>
                      <FormDescription>
                        Enter a URL for your logo image
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="logo.alt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Logo Alt Text</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Company Logo" />
                      </FormControl>
                      <FormDescription>
                        Alternative text for accessibility
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="greeting.title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Welcome Title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Welcome to TaxNow PRO" />
                      </FormControl>
                      <FormDescription>
                        Main greeting text shown on the dashboard
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="greeting.subtitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Welcome Subtitle</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Your modern tax management solution"
                        />
                      </FormControl>
                      <FormDescription>Secondary greeting text</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Layout & Typography Section */}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Layout & Spacing</h3>
              <FormField
                control={form.control}
                name="borderRadius"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Border Radius</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="0.5rem" />
                    </FormControl>
                    <FormDescription>
                      CSS value for border radius (e.g., 0.5rem, 8px)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="density"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Layout Density</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select layout density" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="compact">Compact</SelectItem>
                        <SelectItem value="comfortable">Comfortable</SelectItem>
                        <SelectItem value="spacious">Spacious</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Controls the spacing between elements
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sidebarWidth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sidebar Width</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Slider
                          min={200}
                          max={400}
                          step={10}
                          value={[field.value]}
                          onValueChange={(values: number[]) =>
                            field.onChange(values[0])
                          }
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>200px</span>
                          <span>400px</span>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Typography & Animation</h3>
              <FormField
                control={form.control}
                name="fontSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Base Font Size</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="1rem" />
                    </FormControl>
                    <FormDescription>
                      CSS value for base font size (e.g., 1rem, 16px)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="animationSpeed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Animation Speed</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Slider
                          min={0}
                          max={2}
                          step={0.1}
                          value={[field.value]}
                          onValueChange={(values: number[]) =>
                            field.onChange(values[0])
                          }
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Slower</span>
                          <span>Default</span>
                          <span>Faster</span>
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Adjust the speed of UI animations
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <Button type="submit">Save UI Settings</Button>
      </form>
    </Form>
  );
}
