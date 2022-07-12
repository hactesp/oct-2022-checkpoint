// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Suspense } from 'react';
import { Route, Routes, useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { routes } from '.';
import styles from './app.module.scss';
import { Auth } from './core/layout/auth/auth-layout';
import ErrorBoundary from './core/layout/error-boundary';;

export function App() {
  const routesElement = useRoutes(routes);
  return (
    <ErrorBoundary>
        <Auth></Auth>
        <Routes>
          <Route path="/"/>
          <Route path="/todos"/>
          <Route path="/profile"/>
        </Routes>
      <Suspense fallback={<div>Loading resources...</div>}>
        {routesElement}
      </Suspense>
      <ToastContainer />
    </ErrorBoundary>
  );
}

export default App;
