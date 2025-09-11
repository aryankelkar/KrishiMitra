import { Wifi, WifiOff, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useOfflineStorage } from "@/hooks/useOfflineStorage";
import { formatDistanceToNow } from "date-fns";
import { useTranslation } from 'react-i18next';

export const OfflineIndicator = () => {
  const { isOnline, lastSync } = useOfflineStorage();
  const { t } = useTranslation();

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
            {t('offline.online')}
          </>
        ) : (
          <>
            <WifiOff className="h-3 w-3" />
            {t('offline.offline')}
          </>
        )}
      </Badge>
      
      {lastSync && (
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {t('offline.lastSync')} {formatDistanceToNow(lastSync, { addSuffix: true })}
        </div>
      )}
    </div>
  );
};