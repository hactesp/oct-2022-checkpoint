import React from "react";
import { get } from "lodash";

class ErrorBoundary extends React.Component {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  override componentDidCatch(error: never, errorInfo: React.ErrorInfo): void {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  override render(): React.ReactNode {
    if (get(this.state, "errorInfo", null)) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details>
            {get(this.state, "errorInfo", null).toString()}
            <br />
            {get(this.state, "errorInfo.componentStack", null)}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return get(this.props, "children", null);
  }
}

export default ErrorBoundary;
