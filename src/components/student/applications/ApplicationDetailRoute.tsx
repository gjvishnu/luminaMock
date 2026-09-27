import { ApplicationDetailScreen } from "./ApplicationDetailScreen";

/**
 * Student route `/applications/:applicationId` — the single-application detail
 * screen loaded on its own route, so it can be linked to, refreshed and opened
 * directly instead of being swapped into the list view.
 */
export function ApplicationDetailRoute() {
  return <ApplicationDetailScreen fallbackBackPath="/applications" />;
}
