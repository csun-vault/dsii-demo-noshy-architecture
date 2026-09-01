import { EconomicAgent } from "../../ChefAgent/agents/EconomicAgent";
import { ChefAgent } from "../../ChefAgent/ChefAgent";
import { ChefAgentFactory } from "../ChefAgentFactory";

export class EconomicAgentFactory extends ChefAgentFactory {
    createAgent(): ChefAgent {
        return new EconomicAgent();
    }
}
