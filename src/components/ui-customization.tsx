"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useUISettings } from "~/store/ui-settings";
import { useUISettingsForm } from "~/hooks/use-ui-settings-form";
import type { FormValues } from "~/hooks/use-ui-settings-form";
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
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { toast } from "~/components/ui/use-toast";
import { Slider } from "~/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export function UICustomization() {
  const router = useRouter();
  const [sidebarLogoPreview, setSidebarLogoPreview] = React.useState<
    string | null
  >(null);
  const [greetingLogoPreview, setGreetingLogoPreview] = React.useState<
    string | null
  >(null);
  const sidebarFileInputRef = React.useRef<HTMLInputElement>(null);
  const greetingFileInputRef = React.useRef<HTMLInputElement>(null);
  const [isSaved, setIsSaved] = React.useState(false);

  const { form, createConfig } = useUISettingsForm();
  const { updateSettings } = useUISettings();

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setPreview: (preview: string | null) => void,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive",
        });
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = React.useCallback(
    async (values: FormValues) => {
      try {
        const config = createConfig(
          values,
          sidebarLogoPreview,
          greetingLogoPreview,
        );
        updateSettings(config);
        toast({
          title: "Success",
          description: "UI settings have been updated.",
        });
        setIsSaved(true);
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Failed to save settings");
        console.error("Failed to save settings:", error.message);
        toast({
          title: "Error",
          description:
            error.message || "Failed to save settings. Please try again.",
          variant: "destructive",
        });
      }
    },
    [createConfig, updateSettings, sidebarLogoPreview, greetingLogoPreview],
  );

  // Debug log for form state
  React.useEffect(() => {
    console.log("Form state:", {
      isDirty: form.formState.isDirty,
      errors: form.formState.errors,
      values: form.getValues(),
    });
  }, [form.formState.isDirty, form.formState.errors, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-8">
          {/* Layout & Spacing */}
          <div>
            <h2 className="text-2xl font-semibold">Layout & Spacing</h2>
            <div className="mt-4 space-y-4">
              <FormField
                control={form.control}
                name="layout.borderRadius"
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
                name="layout.layoutDensity"
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
                        <SelectItem value="comfortable">Comfortable</SelectItem>
                        <SelectItem value="compact">Compact</SelectItem>
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
                name="layout.sidebarWidth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sidebar Width</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between">
                          <span>200px</span>
                          <span>400px</span>
                        </div>
                        <Slider
                          min={200}
                          max={400}
                          step={10}
                          value={[field.value]}
                          onValueChange={([value]) => field.onChange(value)}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Typography & Animation */}
          <div>
            <h2 className="text-2xl font-semibold">Typography & Animation</h2>
            <div className="mt-4 space-y-4">
              <FormField
                control={form.control}
                name="typography.baseFontSize"
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
                name="typography.animationSpeed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Animation Speed</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select animation speed" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="slower">Slower</SelectItem>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="faster">Faster</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Adjust the speed of UI animations
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Branding */}
          <div>
            <h2 className="text-2xl font-semibold">Branding</h2>
            <div className="mt-4 space-y-4">
              <FormField
                control={form.control}
                name="sidebarTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sidebar Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="TaxNow PRO" />
                    </FormControl>
                    <FormDescription>
                      This will be displayed at the top of the sidebar
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="greetingTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dashboard Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="TaxNow PRO" />
                    </FormControl>
                    <FormDescription>
                      This will be displayed at the top of the dashboard
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sidebarLogoType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Sidebar Logo</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="none" />
                          </FormControl>
                          <FormLabel className="font-normal">No logo</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="url" />
                          </FormControl>
                          <FormLabel className="font-normal">Use URL</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="upload" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Upload image
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch("sidebarLogoType") === "url" && (
                <FormField
                  control={form.control}
                  name="sidebarLogoUrl"
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
                        Enter the URL of your logo image
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {form.watch("sidebarLogoType") === "upload" && (
                <FormItem>
                  <FormLabel>Upload Logo</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <Input
                        type="file"
                        accept="image/*"
                        ref={sidebarFileInputRef}
                        onChange={(e) =>
                          handleFileChange(e, setSidebarLogoPreview)
                        }
                      />
                      {sidebarLogoPreview && (
                        <div className="mt-2">
                          <p className="mb-2 text-sm text-muted-foreground">
                            Preview:
                          </p>
                          <img
                            src={sidebarLogoPreview}
                            alt="Logo preview"
                            className="max-h-32 rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Select an image file (max 5MB)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}

              <FormField
                control={form.control}
                name="greetingLogoType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Dashboard Logo</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="none" />
                          </FormControl>
                          <FormLabel className="font-normal">No logo</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="url" />
                          </FormControl>
                          <FormLabel className="font-normal">Use URL</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="upload" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Upload image
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch("greetingLogoType") === "url" && (
                <FormField
                  control={form.control}
                  name="greetingLogoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dashboard Logo URL</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="https://example.com/logo.png"
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the URL of your dashboard logo image
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {form.watch("greetingLogoType") === "upload" && (
                <FormItem>
                  <FormLabel>Upload Dashboard Logo</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <Input
                        type="file"
                        accept="image/*"
                        ref={greetingFileInputRef}
                        onChange={(e) =>
                          handleFileChange(e, setGreetingLogoPreview)
                        }
                      />
                      {greetingLogoPreview && (
                        <div className="mt-2">
                          <p className="mb-2 text-sm text-muted-foreground">
                            Preview:
                          </p>
                          <img
                            src={greetingLogoPreview}
                            alt="Logo preview"
                            className="max-h-32 rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Select an image file (max 5MB)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:justify-start">
          {!isSaved ? (
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving..." : "Save UI Settings"}
            </Button>
          ) : (
            <Button
              type="button"
              onClick={() => {
                void router.push("/");
                router.refresh();
              }}
            >
              Go to Dashboard
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
