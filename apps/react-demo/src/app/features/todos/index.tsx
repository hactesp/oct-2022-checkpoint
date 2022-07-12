import {RouteObject} from "react-router-dom";
import {lazy} from "react";

const TodosElement = lazy(() => import('./todos'));
export const TodosRoute: RouteObject[] =
  [
    {
      path: "/",
      element: <TodosElement/>
    },
    {
      path: "todos",
      element: <TodosElement/>
    }
  ];

export interface TodoModel {
  name?: string;
  id?: string;
  description?: string
}
