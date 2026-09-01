import { CommunityNotificationEngine } from "./Observer/observers/CommunityNotificationEngine";
import { PreferenceEngine } from "./Observer/observers/PreferenceEngine";
import { RecommendationEngine } from "./Observer/observers/RecommendationEngine";
import { Subject } from "./Subject/Subject";

console.log("=== 1. SYSTEM INITIALIZATION ===");

// Crear el Subject
const tracker = new Subject("user_ana_123");

// Crear observadores (subsistemas)
const prefs = new PreferenceEngine();
const recommendations = new RecommendationEngine();
const community = new CommunityNotificationEngine();

// Enchufarlos
tracker.attach(prefs);
tracker.attach(recommendations);
tracker.attach(community);

console.log("\n=== 2. USER ACTIVITY EVENTS ===");

// Evento 1: Ana cocina de la mano del RecommendationEngine
tracker.recordAction("RECIPE_COOKED", {
      recipeName: "Chickpea Curry",
      rating: 5,
});

// Evento 2: Ana actualiza lo que hay en su nevera RecommendationEngine
tracker.recordAction("INVENTORY_UPDATED", {
      ingredients: ["tomato", "onion", "garlic"],
});

// Evento 3: Ana publica una receta, CommunityNotifier
tracker.recordAction("RECIPE_PUBLISHED", {
      recipeName: "Spicy Chickpea Curry",
});

// Evento 4: Ana le deja de gustar un ingrediente, PreferenceEngine
tracker.recordAction("RECIPE_DISCARDED", {
      recipeName: "Mushroom Soup",
      reason: "Allergic to mushrooms",
});
