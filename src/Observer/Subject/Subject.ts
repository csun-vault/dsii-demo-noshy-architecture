import { UserEvent } from "../interfaces";
import { Observer } from "../Observer/Observer";

export class Subject {
      public userId: string;
      private observers: Observer[] = [];
      private recentActions: UserEvent[] = [];

      constructor(userId: string) {
            this.userId = userId;
      }

      attach(observer: Observer): void {
            if (!this.observers.includes(observer)) {
                  this.observers.push(observer);
            }
      }

      detach(observer: Observer): void {
            const index = this.observers.indexOf(observer);
            if (index !== -1) {
                  this.observers.splice(index, 1);
            }
      }

      notify(event: UserEvent): void {
            for (const observer of this.observers) {
                  observer.update(event, this.userId);
            }
      }

      recordAction(type: string, details: Record<string, any>): void {
            const event: UserEvent = {
                  timestamp: new Date().toISOString(),
                  type: type,
                  details: details,
                  userId: this.userId,
            };

            this.recentActions.push(event);
            this.notify(event);
      }
}
