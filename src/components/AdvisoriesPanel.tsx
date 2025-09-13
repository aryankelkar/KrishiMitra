import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle, AlertTriangle } from "lucide-react";
import { useOfflineStorage } from "@/hooks/useOfflineStorage";
import { formatDistanceToNow } from "date-fns";
import { useTranslation } from 'react-i18next';

export const AdvisoriesPanel = () => {
  const { getAdvisories, markAdvisoryAsRead, clearAllAdvisories } = useOfflineStorage();
  const advisories = getAdvisories();
  const unreadCount = advisories.filter(a => !a.isRead).length;
  const { t } = useTranslation();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'weather': return <Bell className="h-4 w-4" />;
      case 'pest': return <AlertTriangle className="h-4 w-4" />;
      case 'disease': return <AlertTriangle className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'weather': return 'bg-blue-500';
      case 'pest': return 'bg-destructive';
      case 'disease': return 'bg-warning';
      default: return 'bg-primary';
    }
  };

  return (
    <Card className="shadow-[var(--shadow-medium)]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            {t('advisories.title')}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Badge className="bg-destructive text-destructive-foreground">
                {t('advisories.newCount', { count: unreadCount })}
              </Badge>
            )}
            {advisories.length > 0 && (
              <Button
                size="sm"
                variant="outline"
                onClick={clearAllAdvisories}
                className="h-6 text-xs"
              >
                Clear All
              </Button>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {advisories.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              {t('advisories.none')}
            </p>
          ) : (
            advisories.map((advisory) => (
              <div
                key={advisory.id}
                className={`p-3 rounded-lg border transition-colors ${
                  advisory.isRead 
                    ? 'bg-muted/30 border-muted' 
                    : 'bg-card border-primary/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-1 rounded-full text-white ${getCategoryColor(advisory.category)}`}>
                    {getCategoryIcon(advisory.category)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{advisory.title}</h4>
                      {advisory.isRead && (
                        <CheckCircle className="h-3 w-3 text-success" />
                      )}
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {advisory.content}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(advisory.timestamp, { addSuffix: true })}
                      </span>
                      
                      {!advisory.isRead && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => markAdvisoryAsRead(advisory.id)}
                          className="h-6 text-xs"
                        >
                          {t('advisories.markRead')}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};