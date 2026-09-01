import { ChefAgent } from "../ChefAgent";

export class KetoAgent extends ChefAgent {
    purpose(): string {
        return "Plans with a focus on low carbohydrate (keto)";
    }
}
