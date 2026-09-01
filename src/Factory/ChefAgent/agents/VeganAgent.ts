import { ChefAgent } from "../ChefAgent";

export class VeganAgent extends ChefAgent {
    purpose(): string {
        return "Plans with a focus on vegan diet (no animal products)";
    }
}
