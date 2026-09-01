import { UserEvent } from "../../interfaces";
import { Observer } from "../Observer";

export class RecommendationEngine implements Observer {
      update(event: UserEvent, userId: string): void {
            if (event.type === "INVENTORY_UPDATED") {
                  const ingredients = event.details.ingredients || [];
                  console.log(
                        `[RecommendationAdjuster] Inventory: [${ingredients.join(", ")}]. Suggesting recipes before expiration.`,
                  );
            }
      }
}
