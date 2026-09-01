import { VeganAgent } from "../../ChefAgent/agents/VeganAgent";
import { ChefAgent } from "../../ChefAgent/ChefAgent";
import { ChefAgentFactory } from "../ChefAgentFactory";

export class VeganAgentFactory extends ChefAgentFactory {
    createAgent(): ChefAgent {
        return new VeganAgent();
    }
}
