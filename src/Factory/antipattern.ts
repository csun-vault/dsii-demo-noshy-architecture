import { EconomicAgent } from "./ChefAgent/agents/EconomicAgent";
import { KetoAgent } from "./ChefAgent/agents/KetoAgent";
import { VeganAgent } from "./ChefAgent/agents/VeganAgent";
import { ChefAgent } from "./ChefAgent/ChefAgent";

// Antipatrón: El cliente conoce todas las implementaciones y cómo instanciarlas
function registerUser(dietType: string, username: string) {
      let agent: ChefAgent;

      // Si hay 20 perfiles, este switch tendrá 20 casos
      if (dietType === "keto") {
            agent = new KetoAgent();

       // Quizás la inicialización requiere pasos específicos aquí
      } else if (dietType === "vegan") {
            agent = new VeganAgent();
            // Hardcodeando preferencias por defecto, por ejemplo
            agent.negativePreferences.add("meat");

      } else if (dietType === "economic") {
            agent = new EconomicAgent();
      } else {
            throw new Error(`Unknown diet type: ${dietType}`);
      }

      return agent;
}
