import { Database, CheckCircle2, XCircle, RefreshCw, Plus, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DataSource {
  id: string;
  name: string;
  type: string;
  status: "connected" | "disconnected" | "syncing";
  lastSync?: string;
}

const dataSources: DataSource[] = [
  { id: "1", name: "Horizon Core Banking", type: "Core Banking System", status: "connected", lastSync: "2 minutes ago" },
  { id: "2", name: "Compliance Rules Engine", type: "Policy System", status: "disconnected" },
];

const statusConfig = {
  connected: { icon: CheckCircle2, label: "Connected", className: "text-success border-success/30 bg-success/10" },
  disconnected: { icon: XCircle, label: "Not Connected", className: "text-destructive border-destructive/30 bg-destructive/10" },
  syncing: { icon: RefreshCw, label: "Syncing…", className: "text-warning border-warning/30 bg-warning/10" },
};

const DataSourcesSection = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Data Sources</CardTitle>
        </div>
        <Button size="sm" variant="outline" className="gap-1.5">
          <Plus className="h-3.5 w-3.5" />
          Connect Data Source
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {dataSources.map((source) => {
          const config = statusConfig[source.status];
          const StatusIcon = config.icon;
          return (
            <div
              key={source.id}
              className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-4 py-3"
            >
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-foreground">{source.name}</p>
                <p className="text-xs text-muted-foreground">{source.type}</p>
              </div>
              <div className="flex items-center gap-3">
                {source.lastSync && (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {source.lastSync}
                  </span>
                )}
                <Badge variant="outline" className={config.className}>
                  <StatusIcon className="mr-1 h-3 w-3" />
                  {config.label}
                </Badge>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default DataSourcesSection;
