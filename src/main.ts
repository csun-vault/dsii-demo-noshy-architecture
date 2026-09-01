
// ============================================================================
// 1. REGISTRATION (Factory Method)

import { assignChefAgent, DietType } from "./Factory/client";
import { Interaction, UserProfile } from "./Factory/interfaces";
import { CommunityNotificationEngine } from "./Observer/Observer/observers/CommunityNotificationEngine";
import { PreferenceEngine } from "./Observer/Observer/observers/PreferenceEngine";
import { RecommendationEngine } from "./Observer/Observer/observers/RecommendationEngine";
import { Subject } from "./Observer/Subject/Subject";

// ====================================================================================================
console.log(
      "========================== 1. REGISTRATION ==========================",
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

// ====================================================================================================
//                                  INICIALIZANDO OBSERVER
// ====================================================================================================
console.log(
      "\n========================== 2. OBSERVER INITIALIZATION ==================",
);

// Crear el Subject específico para Alice
const aliceTracker = new Subject("user_alice_123");

// Crear observadores
const prefs = new PreferenceEngine();
const recommendations = new RecommendationEngine();
const community = new CommunityNotificationEngine();

// Enchufarlos al tracker de Alice
aliceTracker.attach(prefs);
aliceTracker.attach(recommendations);
aliceTracker.attach(community);

// ====================================================================================================
//                                    GENERANDO PLANES
// ====================================================================================================
console.log(
      "\n========================== 3. GENERATING PLANS ======================",
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

console.log(aliceAgent.generatePlan(aliceProfile));
console.log(bobAgent.generatePlan(bobProfile));

// ====================================================================================================
//                             EVENTOS DE ACTIVIDAD POR USUARIO
// ====================================================================================================
console.log(
      "\n========================== 4. USER ACTIVITY EVENTS ==================",
);

// Evento 1: Alice cocina de la mano del RecommendationEngine
aliceTracker.recordAction("RECIPE_COOKED", {
      recipeName: "Zucchini Noodles with Pesto",
      rating: 5,
});

// Evento 2: Alice actualiza lo que hay en su nevera (RecommendationEngine)
aliceTracker.recordAction("INVENTORY_UPDATED", {
      ingredients: ["chicken", "spinach", "heavy cream"],
});

// Evento 3: Alice publica una receta (CommunityNotifier)
aliceTracker.recordAction("RECIPE_PUBLISHED", {
      recipeName: "Ultimate Keto Cheese Crisps",
});

// Evento 4: A Alice le deja de gustar un ingrediente (PreferenceEngine)
aliceTracker.recordAction("RECIPE_DISCARDED", {
      recipeName: "Mushroom Soup",
      reason: "Allergic to mushrooms",
});

// ====================================================================================================
//                                 APRENDIENDO Y ADAPTANDO
// ====================================================================================================
console.log(
      "\n========================== 5. LEARNING & ADAPTING ===================",
);

// El agente personal de Alice aprende de interacciones específicas
const aliceInteraction: Interaction = {
      action: "Favorited a cauliflower recipe",
      detail: "cauliflower",
};

aliceAgent.learn(aliceInteraction);

console.log(`Alice's history count: ${aliceAgent.interactionHistory.length}`);

// Una receta base común en la comunidad
const demoRecipe = {
      name: "Creamy Chicken and Rice",
      ingredients: ["rice", "chicken", "milk", "spices"],
};

console.log(`\nOriginal Recipe [${demoRecipe.name}]:`, demoRecipe.ingredients);

// Simulación de adaptación para Alice (Keto)
console.log("\n--- Alice (Keto) ---");
const aliceAdapted = demoRecipe.ingredients.map((ingredient) => {
      // El agente detecta ingredientes no permitidos (ej. "rice")
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


// Simulación de Bob (Vegano) adaptando la misma receta
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
            const sub = charlieAgent.suggestSubstitution("salmon", []);
            return `[BUDGET TIP] swap premium meats with -> ${sub}`;
      }
      return ingredient;
});
console.log("Final Ingredients:", charlieAdapted);
