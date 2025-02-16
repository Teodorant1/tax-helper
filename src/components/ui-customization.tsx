"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useUISettingsForm } from "~/hooks/use-ui-settings-form";
import type { FormValues } from "~/hooks/use-ui-settings-form";
import type { CompleteThemeConfig, CompleteUIConfig } from "~/server/db/schema";
import { api } from "~/trpc/react";
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

interface UICustomizationProps {
  theme_config: CompleteThemeConfig;
  ui_config: CompleteUIConfig;
}

export function UICustomization({ theme_config, ui_config }: UICustomizationProps) {
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
  const { form, createConfig } = useUISettingsForm({ initialValues: ui_config });
  const updateMutation = api.uiSettings.updateSettings.useMutation();

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
        await updateMutation.mutateAsync(config);
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
    [createConfig, updateMutation, sidebarLogoPreview, greetingLogoPreview],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-8">
          {/* Layout & Spacing */}
          <div 
            className={`space-y-${ui_config.layoutDensity === 'compact' ? '4' : 
                       ui_config.layoutDensity === 'spacious' ? '8' : '6'} rounded-lg`}
            style={{
              background: `linear-gradient(to bottom right, #f0f0f015, #e0e0e010)`,
              border: '1px solid #e0e0e040',
              boxShadow: '0 0 10px #00000010',
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
              className="text-2xl font-semibold"
              style={{
                fontSize: `calc(${ui_config.baseFontSize} * 1.5)`,
                transition: `all ${
                  ui_config.animationSpeed === 'slower' ? '0.4s' :
                  ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                } ease`
              }}
            >Layout & Spacing</h2>
            <div className="mt-4 space-y-4">
              <FormField
                control={form.control}
                name="layoutBorderRadius"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel style={{
                      fontSize: ui_config.baseFontSize,
                      transition: `all ${
                        ui_config.animationSpeed === 'slower' ? '0.4s' :
                        ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                      } ease`
                    }}>Border Radius</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="0.5rem"
                        style={{
                          borderRadius: `calc(${ui_config.layoutBorderRadius} * 0.75)`,
                          transition: `all ${
                            ui_config.animationSpeed === 'slower' ? '0.4s' :
                            ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                          } ease`
                        }}
                      />
                    </FormControl>
                    <FormDescription style={{ fontSize: `calc(${ui_config.baseFontSize} * 0.875)` }}>
                      CSS value for border radius (e.g., 0.5rem, 8px)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="layoutDensity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel style={{
                      fontSize: ui_config.baseFontSize,
                      transition: `all ${
                        ui_config.animationSpeed === 'slower' ? '0.4s' :
                        ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                      } ease`
                    }}>Layout Density</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger style={{
                          borderRadius: `calc(${ui_config.layoutBorderRadius} * 0.75)`,
                          transition: `all ${
                            ui_config.animationSpeed === 'slower' ? '0.4s' :
                            ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                          } ease`
                        }}>
                          <SelectValue placeholder="Select layout density" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="comfortable">Comfortable</SelectItem>
                        <SelectItem value="compact">Compact</SelectItem>
                        <SelectItem value="spacious">Spacious</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription style={{ fontSize: `calc(${ui_config.baseFontSize} * 0.875)` }}>
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
                    <FormLabel style={{
                      fontSize: ui_config.baseFontSize,
                      transition: `all ${
                        ui_config.animationSpeed === 'slower' ? '0.4s' :
                        ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                      } ease`
                    }}>Sidebar Width</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between">
                          <span style={{ fontSize: ui_config.baseFontSize }}>200px</span>
                          <span style={{ fontSize: ui_config.baseFontSize }}>400px</span>
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
          <div 
            className={`space-y-${ui_config.layoutDensity === 'compact' ? '4' : 
                       ui_config.layoutDensity === 'spacious' ? '8' : '6'} rounded-lg`}
            style={{
              background: `linear-gradient(to bottom right, #f0f0f015, #e0e0e010)`,
              border: '1px solid #e0e0e040',
              boxShadow: '0 0 10px #00000010',
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
              className="text-2xl font-semibold"
              style={{
                fontSize: `calc(${ui_config.baseFontSize} * 1.5)`,
                transition: `all ${
                  ui_config.animationSpeed === 'slower' ? '0.4s' :
                  ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                } ease`
              }}
            >Typography & Animation</h2>
            <div className="mt-4 space-y-4">
              <FormField
                control={form.control}
                name="baseFontSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel style={{
                      fontSize: ui_config.baseFontSize,
                      transition: `all ${
                        ui_config.animationSpeed === 'slower' ? '0.4s' :
                        ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                      } ease`
                    }}>Base Font Size</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="1rem"
                        style={{
                          borderRadius: `calc(${ui_config.layoutBorderRadius} * 0.75)`,
                          transition: `all ${
                            ui_config.animationSpeed === 'slower' ? '0.4s' :
                            ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                          } ease`
                        }}
                      />
                    </FormControl>
                    <FormDescription style={{ fontSize: `calc(${ui_config.baseFontSize} * 0.875)` }}>
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
                    <FormLabel style={{
                      fontSize: ui_config.baseFontSize,
                      transition: `all ${
                        ui_config.animationSpeed === 'slower' ? '0.4s' :
                        ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                      } ease`
                    }}>Animation Speed</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger style={{
                          borderRadius: `calc(${ui_config.layoutBorderRadius} * 0.75)`,
                          transition: `all ${
                            ui_config.animationSpeed === 'slower' ? '0.4s' :
                            ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                          } ease`
                        }}>
                          <SelectValue placeholder="Select animation speed" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="slower">Slower</SelectItem>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="faster">Faster</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription style={{ fontSize: `calc(${ui_config.baseFontSize} * 0.875)` }}>
                      Adjust the speed of UI animations
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Branding */}
          <div 
            className={`space-y-${ui_config.layoutDensity === 'compact' ? '4' : 
                       ui_config.layoutDensity === 'spacious' ? '8' : '6'} rounded-lg`}
            style={{
              background: `linear-gradient(to bottom right, #f0f0f015, #e0e0e010)`,
              border: '1px solid #e0e0e040',
              boxShadow: '0 0 10px #00000010',
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
              className="text-2xl font-semibold"
              style={{
                fontSize: `calc(${ui_config.baseFontSize} * 1.5)`,
                transition: `all ${
                  ui_config.animationSpeed === 'slower' ? '0.4s' :
                  ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                } ease`
              }}
            >Branding</h2>
            <div className="mt-4 space-y-4">
              <FormField
                control={form.control}
                name="sidebarTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel style={{
                      fontSize: ui_config.baseFontSize,
                      transition: `all ${
                        ui_config.animationSpeed === 'slower' ? '0.4s' :
                        ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                      } ease`
                    }}>Sidebar Title</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="TaxNow PRO"
                        style={{
                          borderRadius: `calc(${ui_config.layoutBorderRadius} * 0.75)`,
                          transition: `all ${
                            ui_config.animationSpeed === 'slower' ? '0.4s' :
                            ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                          } ease`
                        }}
                      />
                    </FormControl>
                    <FormDescription style={{ fontSize: `calc(${ui_config.baseFontSize} * 0.875)` }}>
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
                    <FormLabel style={{
                      fontSize: ui_config.baseFontSize,
                      transition: `all ${
                        ui_config.animationSpeed === 'slower' ? '0.4s' :
                        ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                      } ease`
                    }}>Dashboard Title</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="TaxNow PRO"
                        style={{
                          borderRadius: `calc(${ui_config.layoutBorderRadius} * 0.75)`,
                          transition: `all ${
                            ui_config.animationSpeed === 'slower' ? '0.4s' :
                            ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                          } ease`
                        }}
                      />
                    </FormControl>
                    <FormDescription style={{ fontSize: `calc(${ui_config.baseFontSize} * 0.875)` }}>
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
                    <FormLabel style={{
                    fontSize: ui_config.baseFontSize,
                    transition: `all ${
                      ui_config.animationSpeed === 'slower' ? '0.4s' :
                      ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                    } ease`
                    }}>Sidebar Logo</FormLabel>
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
                          <FormLabel className="font-normal" style={{ fontSize: ui_config.baseFontSize }}>
                            No logo
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="url" />
                          </FormControl>
                          <FormLabel className="font-normal" style={{ fontSize: ui_config.baseFontSize }}>
                            Use URL
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="upload" />
                          </FormControl>
                          <FormLabel className="font-normal" style={{ fontSize: ui_config.baseFontSize }}>
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
                      <FormLabel style={{
                        fontSize: ui_config.baseFontSize,
                        transition: `all ${
                          ui_config.animationSpeed === 'slower' ? '0.4s' :
                          ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                        } ease`
                      }}>Logo URL</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="https://example.com/logo.png"
                          style={{
                          borderRadius: `calc(${ui_config.layoutBorderRadius} * 0.75)`,
                          transition: `all ${
                            ui_config.animationSpeed === 'slower' ? '0.4s' :
                            ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                          } ease`
                          }}
                        />
                      </FormControl>
                    <FormDescription style={{ fontSize: `calc(${ui_config.baseFontSize} * 0.875)` }}>
                        Enter the URL of your logo image
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {form.watch("sidebarLogoType") === "upload" && (
                <FormItem>
                  <FormLabel style={{
                    fontSize: ui_config.baseFontSize,
                    transition: `all ${
                      ui_config.animationSpeed === 'slower' ? '0.4s' :
                      ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                    } ease`
                  }}>Upload Logo</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <Input
                        type="file"
                        accept="image/*"
                        ref={sidebarFileInputRef}
                        onChange={(e) =>
                          handleFileChange(e, setSidebarLogoPreview)
                        }
                        style={{
                          borderRadius: `calc(${ui_config.layoutBorderRadius} * 0.75)`,
                          transition: `all ${
                            ui_config.animationSpeed === 'slower' ? '0.4s' :
                            ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                          } ease`
                        }}
                      />
                      {sidebarLogoPreview && (
                        <div className="mt-2">
                          <p className="mb-2 text-sm text-muted-foreground" style={{ 
                            fontSize: `calc(${ui_config.baseFontSize} * 0.875)` 
                          }}>
                            Preview:
                          </p>
                          <img
                            src={sidebarLogoPreview}
                            alt="Logo preview"
                            style={{
                              maxHeight: "8rem",
                              borderRadius: ui_config.layoutBorderRadius,
                              transition: `all ${
                                ui_config.animationSpeed === 'slower' ? '0.4s' :
                                ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                              } ease`
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                    <FormDescription style={{ fontSize: `calc(${ui_config.baseFontSize} * 0.875)` }}>
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
                    <FormLabel style={{
                      fontSize: ui_config.baseFontSize,
                      transition: `all ${
                        ui_config.animationSpeed === 'slower' ? '0.4s' :
                        ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                      } ease`
                    }}>Dashboard Logo</FormLabel>
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
                          <FormLabel className="font-normal" style={{ fontSize: ui_config.baseFontSize }}>
                            No logo
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="url" />
                          </FormControl>
                          <FormLabel className="font-normal" style={{ fontSize: ui_config.baseFontSize }}>
                            Use URL
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="upload" />
                          </FormControl>
                          <FormLabel className="font-normal" style={{ fontSize: ui_config.baseFontSize }}>
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
                      <FormLabel style={{
                        fontSize: ui_config.baseFontSize,
                        transition: `all ${
                          ui_config.animationSpeed === 'slower' ? '0.4s' :
                          ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                        } ease`
                      }}>Dashboard Logo URL</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="https://example.com/logo.png"
                          style={{
                          borderRadius: `calc(${ui_config.layoutBorderRadius} * 0.75)`,
                          transition: `all ${
                            ui_config.animationSpeed === 'slower' ? '0.4s' :
                            ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                          } ease`
                          }}
                        />
                      </FormControl>
                    <FormDescription style={{ fontSize: `calc(${ui_config.baseFontSize} * 0.875)` }}>
                        Enter the URL of your dashboard logo image
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {form.watch("greetingLogoType") === "upload" && (
                <FormItem>
                  <FormLabel style={{
                    fontSize: ui_config.baseFontSize,
                    transition: `all ${
                      ui_config.animationSpeed === 'slower' ? '0.4s' :
                      ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                    } ease`
                  }}>Upload Dashboard Logo</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <Input
                        type="file"
                        accept="image/*"
                        ref={greetingFileInputRef}
                        onChange={(e) =>
                          handleFileChange(e, setGreetingLogoPreview)
                        }
                        style={{
                          borderRadius: `calc(${ui_config.layoutBorderRadius} * 0.75)`,
                          transition: `all ${
                            ui_config.animationSpeed === 'slower' ? '0.4s' :
                            ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                          } ease`
                        }}
                      />
                      {greetingLogoPreview && (
                        <div className="mt-2">
                          <p className="mb-2 text-sm text-muted-foreground" style={{ 
                            fontSize: `calc(${ui_config.baseFontSize} * 0.875)` 
                          }}>
                            Preview:
                          </p>
                          <img
                            src={greetingLogoPreview}
                            alt="Logo preview"
                            style={{
                              maxHeight: "8rem",
                              borderRadius: ui_config.layoutBorderRadius,
                              transition: `all ${
                                ui_config.animationSpeed === 'slower' ? '0.4s' :
                                ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                              } ease`
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                    <FormDescription style={{ fontSize: `calc(${ui_config.baseFontSize} * 0.875)` }}>
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
            <Button 
              type="submit" 
              disabled={form.formState.isSubmitting}
              style={{
                borderRadius: ui_config.layoutBorderRadius,
                padding: ui_config.layoutDensity === 'compact' ? '0.5rem 1rem' : 
                        ui_config.layoutDensity === 'spacious' ? '1rem 2rem' : '0.75rem 1.5rem',
                fontSize: ui_config.baseFontSize,
                transition: `all ${
                  ui_config.animationSpeed === 'slower' ? '0.4s' :
                  ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                } ease`
              }}
              className="hover:opacity-90 hover:-translate-y-[1px] active:translate-y-0"
            >
              {form.formState.isSubmitting ? "Saving..." : "Save UI Settings"}
            </Button>
          ) : (
            <Button 
              type="button" 
              onClick={() => {
                void router.push("/");
                router.refresh();
              }}
              style={{
                borderRadius: ui_config.layoutBorderRadius,
                padding: ui_config.layoutDensity === 'compact' ? '0.5rem 1rem' : 
                        ui_config.layoutDensity === 'spacious' ? '1rem 2rem' : '0.75rem 1.5rem',
                fontSize: ui_config.baseFontSize,
                transition: `all ${
                  ui_config.animationSpeed === 'slower' ? '0.4s' :
                  ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                } ease`
              }}
              className="hover:opacity-90 hover:-translate-y-[1px] active:translate-y-0"
            >
              Go to Dashboard
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
