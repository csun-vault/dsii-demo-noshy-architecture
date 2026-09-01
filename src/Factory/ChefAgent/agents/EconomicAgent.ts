import { UserProfile } from "../../interfaces";
import { ChefAgent } from "../ChefAgent";

export class EconomicAgent extends ChefAgent {
      constructor() {
            super("BudgetChef", "Savings and Budget");
      }

      public generatePlan(profile: UserProfile): string {
            const budget = profile.weeklyBudget || 50000;
            return `Budget plan for ${profile.name || "User"} (max $${budget} weekly)`;
      }

      public suggestSubstitution(
            ingredient: string,
            restrictions: string[],
      ): string {
            const substitutions: Record<string, string> = {
                  salmon: "canned sardines",
                  steak: "chicken thigh",
            };
            return (
                  substitutions[ingredient] ||
                  `budget alternative for ${ingredient}`
            );
      }
}
