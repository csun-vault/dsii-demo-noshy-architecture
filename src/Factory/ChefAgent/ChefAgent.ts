/**
 * Abstract Product: Define lo que puede hacer un agente.
 *
 * The model is 1:1 — each user has ONE single agent, determined by their
 * diet type at registration, and that same agent remembers across
 * contexts (recipes, grocery, community) thanks to the event history.
 */

import { AgentEvent, Recipe } from "../interfaces";

export abstract class ChefAgent {
      public username: string;
      public knowledge: AgentEvent[];
      public negativePreferences: Set<string>;

      constructor(username: string) {
            this.username = username;
            this.knowledge = [];
            this.negativePreferences = new Set<string>();
      }

      abstract purpose(): string;

      // Records the event and refines preferences.
      learn(event: AgentEvent): void {
            this.knowledge.push(event);
            if (event.type === "negative_preference") {
                  this.negativePreferences.add(event.detail);
            }
      }


      // Event Sourcing: reconstructs the agent's state from the history.
      rehydrate(events: AgentEvent[]): void {
            this.knowledge = [...events];
            this.negativePreferences = new Set(
                  events
                        .filter((e) => e.type === "negative_preference")
                        .map((e) => e.detail),
            );
      }

      // Generates the grocery list avoiding ingredients the user dislikes.
      generateGroceryList(recipe: Recipe): string[] {
            const list: string[] = [];
            const excluded: string[] = [];

            for (const ingredient of recipe.ingredients) {
                  if (this.negativePreferences.has(ingredient)) {
                        excluded.push(ingredient);
                  } else {
                        list.push(ingredient);
                  }
            }

            if (excluded.length > 0) {
                  console.log(
                        `   [Grocery] Excluded for remembering your tastes: ${excluded.join(", ")}`,
                  );
            }
            return list;
      }

      // Adapts a recipe to the user's preferences, in any context.
      adaptRecipe(recipe: Recipe): Recipe {
            const adapted: Recipe = { ...recipe, ingredients: [] };
            const substitutions: string[] = [];

            for (const ingredient of recipe.ingredients) {
                  if (this.negativePreferences.has(ingredient)) {
                        const substitute =
                              recipe.substitutes?.[ingredient] || "alternative";
                        adapted.ingredients.push(substitute);
                        substitutions.push(`${ingredient} -> ${substitute}`);
                  } else {
                        adapted.ingredients.push(ingredient);
                  }
            }

            if (substitutions.length > 0) {
                  console.log(
                        `   [Community] Adapted recipe: ${substitutions.join("; ")}`,
                  );
            }
            return adapted;
      }
}
