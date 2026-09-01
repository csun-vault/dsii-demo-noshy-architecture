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

// Registry
const agentFactories: Record<DietType, ChefAgentFactory> = {
      [DietType.keto]: new KetoAgentFactory(),
      [DietType.vegan]: new VeganAgentFactory(),
      [DietType.economic]: new EconomicAgentFactory(),
};

export function assignChefAgent(dietType: DietType): ChefAgent {
      const factory = agentFactories[dietType];
      if (!factory) throw new Error(`Factory for diet type '${dietType}' not found.`);

      return factory.createAgent();
}
