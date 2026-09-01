import { Recipe } from "./interfaces";
import { assignChefAgent, DietType } from "./client";

// ========================================================
console.log("========================== REGISTRATION ==========================");

const aliceAgent = assignChefAgent(DietType.keto, "Alice");
const bobAgent = assignChefAgent(DietType.vegan, "Bob");

console.log(`Alice's Agent says: "${aliceAgent.purpose()}"`);
console.log(`Bob's Agent says: "${bobAgent.purpose()}"`);

// ========================================================

console.log("\n========================== LEARNING =============================");

// Bob is vegan, so he learns to dislike animal products
bobAgent.learn({ type: "negative_preference", detail: "chicken" });
console.log("Added negative preference chicken to Bob")
bobAgent.learn({ type: "negative_preference", detail: "cream" });
console.log("Added negative preference cream to Bob")

// Alice is keto, so she learns to dislike high carbs
aliceAgent.learn({ type: "negative_preference", detail: "pasta" });
console.log("Added negative preference pasta to Alice")

// ========================================================

console.log("\n========================== ADAPTING =============================");

const demoRecipe: Recipe = {
      name: "Creamy Chicken Pasta",
      ingredients: ["pasta", "chicken", "cream", "spinach"],
      substitutes: {
            pasta: "zucchini noodles",
            chicken: "tofu",
            cream: "cashew cream",
      },
};

console.log(
      `\nOriginal Recipe for ${demoRecipe.name}:`,
      demoRecipe.ingredients,
);

// Alice's agent adapts the recipe (replaces pasta with zucchini noodles)
console.log("\n--- Alice (Keto) ---");
const aliceAdapted = aliceAgent.adaptRecipe(demoRecipe);
console.log("Final Ingredients:", aliceAdapted.ingredients);

// Bob's agent adapts the recipe (replaces chicken and cream)
console.log("\n--- Bob (Vegan) ---");
const bobAdapted = bobAgent.adaptRecipe(demoRecipe);
console.log("Final Ingredients:", bobAdapted.ingredients);
