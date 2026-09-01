import { KetoAgent } from "../../ChefAgent/agents/KetoAgent";
import { ChefAgent } from "../../ChefAgent/ChefAgent";
import { ChefAgentFactory } from "../ChefAgentFactory";

export class KetoAgentFactory extends ChefAgentFactory {
    createAgent(username: string): ChefAgent {
        return new KetoAgent(username);
    }
}
