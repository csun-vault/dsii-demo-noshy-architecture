import { ChefAgent } from "../ChefAgent/ChefAgent";

// Abstract Factory: declares the creation method.
export abstract class ChefAgentFactory {
    abstract createAgent(username: string): ChefAgent;
}
