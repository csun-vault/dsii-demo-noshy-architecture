import { CommunityNotificationEngine } from "./Observer/observers/CommunityNotificationEngine";
import { PreferenceEngine } from "./Observer/observers/PreferenceEngine";
import { RecommendationEngine } from "./Observer/observers/RecommendationEngine";

class UserActivityTracker {
      constructor(
            private userId: string,

            private preferenceEngine: PreferenceEngine,
            private recommendationAdjuster: RecommendationEngine,
            private communityNotifier: CommunityNotificationEngine,
      ) {}

      recordAction(type: string, details: Record<string, any>) {
            const event = { type, details, userId: this.userId };

            if (type === "RECIPE_COOKED" || type === "RECIPE_DISCARDED")
                  this.preferenceEngine.handle(event);

            if (type === "INVENTORY_UPDATED")
                  this.recommendationAdjuster.handle(event);

            if (type === "RECIPE_PUBLISHED")
                  this.communityNotifier.handle(event);

      }
}
