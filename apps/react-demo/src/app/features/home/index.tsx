import {RouteObject} from "react-router-dom";
import {lazy} from "react";

const Home = lazy(() => import('./home'));
export const HomeRoute: RouteObject[] =
  [
    {
      path: "/home",
      element: <Home/>
    }
  ];
