import { Interaction, UserProfile } from "./interfaces";
import { assignChefAgent, DietType } from "./client";

// 1. REGISTRATION (Creación mediante Factory)
console.log(
      "========================== REGISTRATION ==========================",
);

// Creamos los agentes usando el Factory Method + Registry Enum
const aliceAgent = assignChefAgent(DietType.keto);
const bobAgent = assignChefAgent(DietType.vegan);
const charlieAgent = assignChefAgent(DietType.economic);

console.log(
      `Alice's Agent: "${aliceAgent.agentName}" (Specialty: ${aliceAgent.specialty})`,
);
console.log(
      `Bob's Agent: "${bobAgent.agentName}" (Specialty: ${bobAgent.specialty})`,
);
console.log(
      `Charlie's Agent: "${charlieAgent.agentName}" (Specialty: ${charlieAgent.specialty})`,
);

// 2. PLANES
console.log(
      "\n========================== GENERATING PLANS ======================",
);

const aliceProfile: UserProfile = {
      name: "Alice",
      mainGoal: "Lose weight fast",
      restrictions: ["gluten free"],
};

const bobProfile: UserProfile = {
      name: "Bob",
      mainGoal: "Ethical eating",
      restrictions: ["vegan"],
};

// Generamos planes inyectando el perfil completo
console.log(aliceAgent.generatePlan(aliceProfile));
console.log(bobAgent.generatePlan(bobProfile));

// 3. Aprendizaje (Event Sourcing e historial)
console.log(
      "\n========================== LEARNING =============================",
);

// Simulacion de interacciones
const bobInteraction: Interaction = {
      action: "Rejected recipe containing honey",
      detail: "honey",
};
bobAgent.learn(bobInteraction);

const aliceInteraction: Interaction = {
      action: "Favorited a cauliflower recipe",
      detail: "cauliflower",
};
aliceAgent.learn(aliceInteraction);

console.log(`Alice's history count: ${aliceAgent.interactionHistory.length}`);

// 4. Adaptando
console.log(
      "\n========================== ADAPTING =============================",
);

// Una receta base común
const demoRecipe = {
      name: "Creamy Chicken and Rice",
      ingredients: ["rice", "chicken", "milk", "spices"],
};

console.log(`\nOriginal Recipe [${demoRecipe.name}]:`, demoRecipe.ingredients);

// Simulación para Alice (Keto)
console.log("\n--- Alice (Keto) ---");
const aliceAdapted = demoRecipe.ingredients.map((ingredient) => {
      // El agente detecta ("rice")
      if (ingredient === "rice") {
            const sub = aliceAgent.suggestSubstitution(
                  ingredient,
                  aliceProfile.restrictions || [],
            );
            return `[REPLACED] ${ingredient} -> ${sub}`;
      }
      return ingredient;
});
console.log("Final Ingredients:", aliceAdapted);

// Simulación de Bob (Vegano)
console.log("\n--- Bob (Vegan) ---");
const bobAdapted = demoRecipe.ingredients.map((ingredient) => {
      // El agente detecta productos animales ("chicken", "milk")
      if (ingredient === "chicken" || ingredient === "milk") {
            const sub = bobAgent.suggestSubstitution(
                  ingredient,
                  bobProfile.restrictions || [],
            );
            return `[REPLACED] ${ingredient} -> ${sub}`;
      }
      return ingredient;
});
console.log("Final Ingredients:", bobAdapted);

// Simulación de Charlie (Económico)
console.log("\n--- Charlie (Economic) ---");
const charlieAdapted = demoRecipe.ingredients.map((ingredient) => {
      // Charlie sugiere alternativas más baratas
      if (ingredient === "chicken") {
            // En tu clase EconomicAgent cambiaste steak/salmon, aquí forzamos un fallback
            const sub = charlieAgent.suggestSubstitution("salmon", []);
            return `[BUDGET TIP] swap premium meats with -> ${sub}`;
      }
      return ingredient;
});
console.log("Final Ingredients:", charlieAdapted);
