import { Interaction, UserProfile } from "../interfaces";

/**
 * Abstract Product: Define lo que puede hacer un agente.
 *
 * The model is 1:1 — each user has ONE single agent, determined by their
 * diet type at registration, and that same agent remembers across
 * contexts (recipes, grocery, community) thanks to the event history.
 */
export abstract class ChefAgent {
      public agentName: string;
      public specialty: string;
      public interactionHistory: Interaction[];

      constructor(agentName: string, specialty: string) {
            this.agentName = agentName;
            this.specialty = specialty;
            this.interactionHistory = [];
      }

      abstract generatePlan(profile: UserProfile): string;

      abstract suggestSubstitution(
            ingredient: string,
            restrictions: string[],
      ): string;

      public learn(interaction: Interaction): void {
            this.interactionHistory.push(interaction);
            console.log(
                  `  [${this.agentName}] Learning: ${interaction.action}`,
            );
      }
}
