import { LiveNotification, RiskTier } from '../types';

type EventCallback = (notification: LiveNotification) => void;

class RealTimeEventBus {
  private listeners: Set<EventCallback> = new Set();

  subscribe(callback: EventCallback) {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }

  publishFlaggedCase(caseId: string, riskTier: RiskTier, snippet: string) {
    const notification: LiveNotification = {
      id: `NOTIF-${Date.now()}`,
      caseId,
      riskTier,
      message:
        riskTier === 'high'
          ? `High concern detected in check-in for ${caseId}`
          : riskTier === 'medium'
          ? `Moderate distress pattern noted for ${caseId}`
          : `Routine check-in logged for ${caseId}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      read: false,
      snippet,
    };

    this.listeners.forEach((callback) => callback(notification));
  }
}

export const eventBus = new RealTimeEventBus();
