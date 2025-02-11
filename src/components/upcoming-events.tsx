import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export function UpcomingEvents() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Upcoming events</CardTitle>
        <p className="text-sm text-muted-foreground">
          List of important upcoming events
        </p>
      </CardHeader>
      <CardContent>
        <div className="py-4 text-center text-sm text-muted-foreground">
          No upcoming events
        </div>
      </CardContent>
    </Card>
  );
}
