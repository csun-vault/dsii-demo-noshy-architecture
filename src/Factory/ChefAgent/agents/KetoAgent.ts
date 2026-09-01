import { UserProfile } from "../../interfaces";
import { ChefAgent } from "../ChefAgent";

export class KetoAgent extends ChefAgent {
      constructor() {
            super("KetoChef", "Ketogenic Diet");
      }

      public generatePlan(profile: UserProfile): string {
            return `7-day keto plan for ${profile.name || "User"}`;
      }

      public suggestSubstitution(
            ingredient: string,
            restrictions: string[],
      ): string {
            const substitutions: Record<string, string> = {
                  rice: "grated cauliflower",
                  potato: "cauliflower mash",
                  sugar: "erythritol",
            };
            return (
                  substitutions[ingredient] ||
                  `low carb alternative for ${ingredient}`
            );
      }
}
