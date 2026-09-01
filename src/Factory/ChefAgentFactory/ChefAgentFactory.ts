import { ChefAgent } from "../ChefAgent/ChefAgent";
import { UserProfile } from "../interfaces";

export abstract class ChefAgentFactory {
      abstract createAgent(): ChefAgent;

      public trainAgent(profile: UserProfile): ChefAgent {
            const agent = this.createAgent();
            console.log(
                  `Factory created: ${agent.agentName} (${agent.specialty})`,
            );

            const plan = agent.generatePlan(profile);
            console.log(`Generated plan: ${plan}`);

            return agent;
      }
}
