import { Component, type ReactNode } from "react";

/**
 * Class-based error boundary.
 *
 * Catches errors thrown during rendering (including lazy chunk failures that
 * surface as rejected promises inside Suspense) and renders a fallback while
 * keeping the rest of the shell alive.
 *
 * State lifetime is tied to the boundary instance: a parent that changes the
 * `key` (e.g. on pathname) forces an unmount/remount, so an error screen from
 * page A never sticks to page B. Call the `reset` function passed to the
 * fallback to recover in place (e.g. Try Again).
 */
export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback:
    | ReactNode
    | ((props: { error: Error; reset: () => void }) => ReactNode);
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch() {
    // Side-effect hook kept for parity with React's error-boundary contract.
    // The UI layer owns what the user sees via `fallback`; logging is
    // intentionally left to the caller so this stays framework-neutral.
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const { fallback } = this.props;
      const renderProps = { error: this.state.error!, reset: this.reset };
      return typeof fallback === "function"
        ? (fallback as (
            props: { error: Error; reset: () => void }
          ) => ReactNode)(renderProps)
        : fallback;
    }
    return this.props.children;
  }
}
