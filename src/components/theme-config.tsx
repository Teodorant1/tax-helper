"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useThemeSettingsForm } from "~/hooks/use-theme-settings-form";
import type { ThemeFormValues } from "~/hooks/use-theme-settings-form";
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
import { toast } from "~/components/ui/use-toast";

import type { CompleteThemeConfig , CompleteUIConfig} from "~/server/db/schema";

interface ThemeConfigProps {
  theme_config: CompleteThemeConfig;
  uiConfig: CompleteUIConfig;
}

function ThemeConfig({ theme_config, uiConfig }: ThemeConfigProps) {
  const router = useRouter();
  const [isSaved, setIsSaved] = React.useState(false);
  const { form, createConfig } = useThemeSettingsForm({ initialValues: theme_config });
  const updateMutation = api.theme.updateSettings.useMutation();

  const onSubmit = React.useCallback(
    async (values: ThemeFormValues) => {
      try {
        const config = createConfig(values);
        await updateMutation.mutateAsync(config);
        toast({
          title: "Success",
          description: "Theme settings have been updated.",
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
    [createConfig, updateMutation],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-8">
          {/* Light Theme */}
          <div 
            className={`space-y-${uiConfig.layoutDensity === 'compact' ? '4' : 
                       uiConfig.layoutDensity === 'spacious' ? '8' : '6'} rounded-lg`}
            style={{
              background: `linear-gradient(to bottom right, #f0f0f015, #e0e0e010)`,
              border: '1px solid #e0e0e040',
              boxShadow: '0 0 10px #00000010',
              borderRadius: uiConfig.layoutBorderRadius,
              padding: uiConfig.layoutDensity === 'compact' ? '1rem' : 
                      uiConfig.layoutDensity === 'spacious' ? '2rem' : '1.5rem',
              transition: `all ${
                uiConfig.animationSpeed === 'slower' ? '0.4s' :
                uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
              } ease`
            }}
          >
            <h2 
              className="text-2xl font-semibold"
              style={{
                fontSize: `calc(${uiConfig.baseFontSize} * 1.5)`,
                transition: `all ${
                  uiConfig.animationSpeed === 'slower' ? '0.4s' :
                  uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                } ease`
              }}
            >Light Theme</h2>
            <div className="mt-4 space-y-4">
              <FormField
                control={form.control}
                name="lightTheme.primary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel style={{
                      fontSize: uiConfig.baseFontSize,
                      transition: `all ${
                        uiConfig.animationSpeed === 'slower' ? '0.4s' :
                        uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                      } ease`
                    }}>Primary Color</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="color"
                        style={{
                          borderRadius: `calc(${uiConfig.layoutBorderRadius} * 0.75)`,
                          transition: `all ${
                            uiConfig.animationSpeed === 'slower' ? '0.4s' :
                            uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                          } ease`
                        }}
                      />
                    </FormControl>
                    <FormDescription style={{ fontSize: `calc(${uiConfig.baseFontSize} * 0.875)` }}>
                      Main color for light theme
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lightTheme.secondary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel style={{
                      fontSize: uiConfig.baseFontSize,
                      transition: `all ${
                        uiConfig.animationSpeed === 'slower' ? '0.4s' :
                        uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                      } ease`
                    }}>Secondary Color</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="color"
                        style={{
                          borderRadius: `calc(${uiConfig.layoutBorderRadius} * 0.75)`,
                          transition: `all ${
                            uiConfig.animationSpeed === 'slower' ? '0.4s' :
                            uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                          } ease`
                        }}
                      />
                    </FormControl>
                    <FormDescription style={{ fontSize: `calc(${uiConfig.baseFontSize} * 0.875)` }}>
                      Secondary color for light theme
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lightTheme.accent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel style={{
                      fontSize: uiConfig.baseFontSize,
                      transition: `all ${
                        uiConfig.animationSpeed === 'slower' ? '0.4s' :
                        uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                      } ease`
                    }}>Accent Color</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="color"
                        style={{
                          borderRadius: `calc(${uiConfig.layoutBorderRadius} * 0.75)`,
                          transition: `all ${
                            uiConfig.animationSpeed === 'slower' ? '0.4s' :
                            uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                          } ease`
                        }}
                      />
                    </FormControl>
                    <FormDescription style={{ fontSize: `calc(${uiConfig.baseFontSize} * 0.875)` }}>
                      Accent color for light theme
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Dark Theme */}
          <div 
            className={`space-y-${uiConfig.layoutDensity === 'compact' ? '4' : 
                       uiConfig.layoutDensity === 'spacious' ? '8' : '6'} rounded-lg`}
            style={{
              background: `linear-gradient(to bottom right, #f0f0f015, #e0e0e010)`,
              border: '1px solid #e0e0e040',
              boxShadow: '0 0 10px #00000010',
              borderRadius: uiConfig.layoutBorderRadius,
              padding: uiConfig.layoutDensity === 'compact' ? '1rem' : 
                      uiConfig.layoutDensity === 'spacious' ? '2rem' : '1.5rem',
              transition: `all ${
                uiConfig.animationSpeed === 'slower' ? '0.4s' :
                uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
              } ease`
            }}
          >
            <h2 
              className="text-2xl font-semibold"
              style={{
                fontSize: `calc(${uiConfig.baseFontSize} * 1.5)`,
                transition: `all ${
                  uiConfig.animationSpeed === 'slower' ? '0.4s' :
                  uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                } ease`
              }}
            >Dark Theme</h2>
            <div className="mt-4 space-y-4">
              <FormField
                control={form.control}
                name="darkTheme.primary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel style={{
                      fontSize: uiConfig.baseFontSize,
                      transition: `all ${
                        uiConfig.animationSpeed === 'slower' ? '0.4s' :
                        uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                      } ease`
                    }}>Primary Color</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="color"
                        style={{
                          borderRadius: `calc(${uiConfig.layoutBorderRadius} * 0.75)`,
                          transition: `all ${
                            uiConfig.animationSpeed === 'slower' ? '0.4s' :
                            uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                          } ease`
                        }}
                      />
                    </FormControl>
                    <FormDescription style={{ fontSize: `calc(${uiConfig.baseFontSize} * 0.875)` }}>
                      Main color for dark theme
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="darkTheme.secondary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel style={{
                      fontSize: uiConfig.baseFontSize,
                      transition: `all ${
                        uiConfig.animationSpeed === 'slower' ? '0.4s' :
                        uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                      } ease`
                    }}>Secondary Color</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="color"
                        style={{
                          borderRadius: `calc(${uiConfig.layoutBorderRadius} * 0.75)`,
                          transition: `all ${
                            uiConfig.animationSpeed === 'slower' ? '0.4s' :
                            uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                          } ease`
                        }}
                      />
                    </FormControl>
                    <FormDescription style={{ fontSize: `calc(${uiConfig.baseFontSize} * 0.875)` }}>
                      Secondary color for dark theme
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="darkTheme.accent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel style={{
                      fontSize: uiConfig.baseFontSize,
                      transition: `all ${
                        uiConfig.animationSpeed === 'slower' ? '0.4s' :
                        uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                      } ease`
                    }}>Accent Color</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="color"
                        style={{
                          borderRadius: `calc(${uiConfig.layoutBorderRadius} * 0.75)`,
                          transition: `all ${
                            uiConfig.animationSpeed === 'slower' ? '0.4s' :
                            uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                          } ease`
                        }}
                      />
                    </FormControl>
                    <FormDescription style={{ fontSize: `calc(${uiConfig.baseFontSize} * 0.875)` }}>
                      Accent color for dark theme
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:justify-start">
          {!isSaved ? (
            <Button 
              type="submit" 
              disabled={form.formState.isSubmitting}
              style={{
                borderRadius: uiConfig.layoutBorderRadius,
                padding: uiConfig.layoutDensity === 'compact' ? '0.5rem 1rem' : 
                        uiConfig.layoutDensity === 'spacious' ? '1rem 2rem' : '0.75rem 1.5rem',
                fontSize: uiConfig.baseFontSize,
                transition: `all ${
                  uiConfig.animationSpeed === 'slower' ? '0.4s' :
                  uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                } ease`
              }}
              className="hover:opacity-90 hover:-translate-y-[1px] active:translate-y-0"
            >
              {form.formState.isSubmitting ? "Saving..." : "Save Theme Settings"}
            </Button>
          ) : (
            <Button 
              type="button" 
              onClick={() => {
                void router.push("/");
                router.refresh();
              }}
              style={{
                borderRadius: uiConfig.layoutBorderRadius,
                padding: uiConfig.layoutDensity === 'compact' ? '0.5rem 1rem' : 
                        uiConfig.layoutDensity === 'spacious' ? '1rem 2rem' : '0.75rem 1.5rem',
                fontSize: uiConfig.baseFontSize,
                transition: `all ${
                  uiConfig.animationSpeed === 'slower' ? '0.4s' :
                  uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
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

export { ThemeConfig };
