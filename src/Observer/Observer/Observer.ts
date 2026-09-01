import { UserEvent } from "../interfaces";

export interface Observer {
      update(event: UserEvent, userId: string): void;
}
