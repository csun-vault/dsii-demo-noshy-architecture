import { UserProfile } from "../../interfaces";
import { ChefAgent } from "../ChefAgent";

export class VeganAgent extends ChefAgent {
    constructor() {
        super("VeganChef", "Vegan Diet");
    }

    public generatePlan(profile: UserProfile): string {
        return `7-day vegan plan for ${profile.name || 'User'}`;
    }

    public suggestSubstitution(ingredient: string, restrictions: string[]): string {
        const substitutions: Record<string, string> = {
            "chicken": "firm tofu",
            "egg": "aquafaba",
            "milk": "oat milk"
        };
        return substitutions[ingredient] || `vegan alternative for ${ingredient}`;
    }
}
