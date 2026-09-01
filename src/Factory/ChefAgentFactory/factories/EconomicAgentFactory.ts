import { EconomicAgent } from "../../ChefAgent/agents/EconomicAgent";
import { ChefAgent } from "../../ChefAgent/ChefAgent";
import { ChefAgentFactory } from "../ChefAgentFactory";

export class EconomicAgentFactory extends ChefAgentFactory {
    createAgent(username: string): ChefAgent {
        return new EconomicAgent(username);
    }
}
