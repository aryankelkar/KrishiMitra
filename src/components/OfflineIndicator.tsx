import { Wifi, WifiOff, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useOfflineStorage } from "@/hooks/useOfflineStorage";
import { formatDistanceToNow } from "date-fns";

export const OfflineIndicator = () => {
  const { isOnline, lastSync } = useOfflineStorage();

  return (
    <div className="flex items-center gap-2">
      <Badge 
        variant={isOnline ? "default" : "secondary"} 
        className={`flex items-center gap-1 ${
          isOnline 
            ? "bg-success text-success-foreground hover:bg-success/90" 
            : "bg-warning text-warning-foreground hover:bg-warning/90"
        }`}
      >
        {isOnline ? (
          <>
            <Wifi className="h-3 w-3" />
            Online
          </>
        ) : (
          <>
            <WifiOff className="h-3 w-3" />
            Offline
          </>
        )}
      </Badge>
      
      {lastSync && (
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Last sync: {formatDistanceToNow(lastSync, { addSuffix: true })}
        </div>
      )}
    </div>
  );
};