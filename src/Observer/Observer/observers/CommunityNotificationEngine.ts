import { UserEvent } from "../../interfaces";
import { Observer } from "../Observer";

export class CommunityNotificationEngine implements Observer {
      update(event: UserEvent, userId: string): void {
            if (event.type === "RECIPE_PUBLISHED") {
                  console.log(
                        `[CommunityNotifier] New recipe '${event.details.recipeName}' by ${userId}. Indexing...`,
                  );
            }
      }
}
