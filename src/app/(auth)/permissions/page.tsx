import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PermissionsPage_component from "./permissions-page-component";
import { api } from "~/trpc/server";

export default async function PermissionsPage() {
    const uiConfig = await api.uiSettings.getSettings();
    const themeConfig = await api.theme.getSettings();
  return (
    <div className="container mx-auto py-6">
    <PermissionsPage_component theme_config={themeConfig} uiConfig={uiConfig}/>
    </div>
  );
}
