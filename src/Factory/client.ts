import { ChefAgent } from "./ChefAgent/ChefAgent";
import { ChefAgentFactory } from "./ChefAgentFactory/ChefAgentFactory";
import { EconomicAgentFactory } from "./ChefAgentFactory/factories/EconomicAgentFactory";
import { KetoAgentFactory } from "./ChefAgentFactory/factories/KetoAgentFactory";
import { VeganAgentFactory } from "./ChefAgentFactory/factories/VeganAgentFactory";

export enum DietType {
      keto = "keto",
      vegan = "vegan",
      economic = "economic",
}

export function assignChefAgent(dietType: DietType, username: string): ChefAgent {
      const factories: Record<string, ChefAgentFactory> = {
            keto: new KetoAgentFactory(),
            vegan: new VeganAgentFactory(),
            economic: new EconomicAgentFactory(),
      };

      const factory = factories[dietType.toLowerCase()];
      if (!factory) {
            throw new Error(`Unknown diet type: ${dietType}`);
      }

      return factory.createAgent(username);
}
