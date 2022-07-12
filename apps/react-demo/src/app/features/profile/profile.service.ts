import {environment} from "../../../environments/environment";
import {axiosHttp} from "../../core/http";
import {ProfileConfiguration, ProfileModel} from "./index";

const Profile_BASE_URL = environment.basePath;
const Profile_RESOURCE_URL = environment.resourcePathProfile;

export const getProfilesPerPage = async (
  page = 1,
  size = 2
): Promise<ProfileModel[]> => {
  return await axiosHttp(`${Profile_BASE_URL}`).get<ProfileModel[]>(
    `${Profile_RESOURCE_URL}?page=${page}&size=${size}`
  );
};

export const getProfileById = async (
  profileID: string | undefined
): Promise<ProfileModel> => {
  return axiosHttp(`${Profile_BASE_URL}`).get<ProfileModel>(
    `${Profile_RESOURCE_URL}/${profileID}`
  );
};

export const getProfileConfiguration = async (): Promise<ProfileConfiguration[]> => {
  return [
    {
      name: 'firstName',
      type: "text",
      validateConditions: {required: true, maxLength: 80}
    },
    {
      name: 'lastName',
      type: "text",
      validateConditions: {required: true, maxLength: 80}
    },
    {
      name: 'email',
      type: "text",
      validateConditions: {required: true, pattern: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/}
    },
    {
      name: 'dateOfBirth',
      type: "date",
      validateConditions: {required: true}
    },
  ];
  // return axiosHttp(`${Profile_BASE_URL}`).get<ProfileConfiguration[]>(
  //   `${Profile_RESOURCE_URL}/configuration`
  // );
};


export const createProfile = async (todo: ProfileModel): Promise<ProfileModel> => {
  return axiosHttp(`${Profile_BASE_URL}`).post<ProfileModel>(
    `${Profile_RESOURCE_URL}`,
    todo as never
  );
};

export const updateProfile = async (todo: ProfileModel): Promise<ProfileModel> => {
  return axiosHttp(`${Profile_BASE_URL}`).put<ProfileModel>(
    `${Profile_RESOURCE_URL}/${todo.id}`,
    todo as never
  );
};

export const deleteProfile = async (
  id: string | undefined
): Promise<ProfileModel> => {
  return await axiosHttp(`${Profile_BASE_URL}`).delete<ProfileModel>(
    `${Profile_RESOURCE_URL}/${id}`
  );
};


export const profileService = {
  getProfilesPerPage,
  getProfileConfiguration,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile,
};
