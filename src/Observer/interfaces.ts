export interface UserEvent {
      timestamp: string;
      type: string;
      details: Record<string, any>;
      userId: string;
}

export interface LearningObserver {
      update(event: UserEvent, userId: string): void;
}
