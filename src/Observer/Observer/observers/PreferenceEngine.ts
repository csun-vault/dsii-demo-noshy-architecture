import { UserEvent } from "../../interfaces";
import { Observer } from "../Observer";

export class PreferenceEngine implements Observer {
      update(event: UserEvent, userId: string): void {
            if (event.type === "RECIPE_COOKED") {
                  console.log(
                        `[PreferenceEngine] ${userId} cooked '${event.details.recipeName}'`,
                  );
            } else if (event.type === "RECIPE_DISCARDED") {
                  console.log(
                        `[PreferenceEngine] ${userId} discarded recipe. Reason: ${event.details.reason}`,
                  );
            }
      }
}
