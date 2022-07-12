import {RouteObject} from "react-router-dom";
import {lazy} from "react";

const Profile = lazy(() => import('./profile'));
export const ProfileRoute: RouteObject[] =
  [
    {
      path: "profile",
      element: <Profile/>
    }
  ];

export interface ProfileModel {
  name?: string;
  id?: number;
  deleted?: boolean
}

export interface ProfileConfiguration {
  name:string;
  type?: string;
  values?: {label: string, code:string}[];
  validateConditions?: ValidationConditions
}

export interface ValidationConditions {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
}
