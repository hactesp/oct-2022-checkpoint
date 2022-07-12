import {RouteObject} from "react-router-dom";
import {HomeRoute} from "./features/home";
import {TodosRoute} from "./features/todos";
import {ProfileRoute} from "./features/profile";

export const routes: RouteObject[] = [
  ...HomeRoute,
  ...TodosRoute,
  ...ProfileRoute,
  {path: "*", element: <main style={{padding: "1rem"}}><p>There's nothing here!</p></main>},
];
//
