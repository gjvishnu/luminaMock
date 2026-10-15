import { Suspense, lazy, useMemo, useState, type ComponentType } from "react";
import { useLocation } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { PageError } from "./PageError";
import { PageFallback } from "./PageFallback";

type LazyModule = { default: ComponentType<Record<string, never>> };

/**
 * Wraps one lazy route with the shared Suspense skeleton +
 * chunk-error fallback.
 *
 * Two failure modes are handled (both bite without this):
 * 1. Stuck fallback across pages — react-error-boundary keeps showing its
 *    fallback until reset. React reuses the same boundary instance across
 *    route changes, so without `resetKeys` the error screen from page A
 *    would linger on page B. Keying on the pathname auto-resets on nav.
 * 2. Stale rejected import — React.lazy() caches the first import result,
 *    so a failed chunk stays rejected even after reset. Bumping `retryKey`
 *    on Try Again re-creates the lazy component, forcing a fresh import().
 */
export const lazyRoute = (loader: () => Promise<LazyModule>) => {
  const LazyRouteElement = () => {
    const { pathname } = useLocation();
    const [retryKey, setRetryKey] = useState(0);
    // New lazy() per retry: React.lazy caches the first import result,
    // so without re-creating it a failed chunk would stay rejected
    // even after reset and Try Again could never recover.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const LazyComponent = useMemo(() => lazy(loader), [retryKey]);

    return (
      <ErrorBoundary
        resetKeys={[pathname, retryKey]}
        FallbackComponent={({ resetErrorBoundary }) => (
          <PageError
            onRetry={() => {
              setRetryKey((key) => key + 1);
              resetErrorBoundary();
            }}
          />
        )}
      >
        <Suspense fallback={<PageFallback />}>
          <LazyComponent />
        </Suspense>
      </ErrorBoundary>
    );
  };
  return <LazyRouteElement />;
};
