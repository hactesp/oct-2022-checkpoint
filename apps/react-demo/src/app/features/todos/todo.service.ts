import {environment} from "../../../environments/environment";
import {axiosHttp} from "../../core/http";
import {TodoModel} from "./index";

const Todo_BASE_URL = environment.basePath;
const Todo_RESOURCE_URL = environment.resourcePathTodo;

export const getTodosPerPage = async (): Promise<TodoModel[]> => {
  return await axiosHttp(`${Todo_BASE_URL}`).get<TodoModel[]>(
    `${Todo_RESOURCE_URL}`
  );
};

export const getTodoById = async (
  TodoId: string | undefined
): Promise<TodoModel|undefined> => {
  return axiosHttp(`${Todo_BASE_URL}`).get<TodoModel>(
    `${Todo_RESOURCE_URL}/${TodoId}`
  );
};

export const createTodo = async (todo: TodoModel): Promise<TodoModel> => {
  return axiosHttp(`${Todo_BASE_URL}`).post<TodoModel>(
    `${Todo_RESOURCE_URL}`,
    todo as never
  );
};

export const updateTodo = async (todo: TodoModel): Promise<TodoModel> => {
  return axiosHttp(`${Todo_BASE_URL}`).put<TodoModel>(
    `${Todo_RESOURCE_URL}/${todo.id}`,
    todo as never
  );
};

export const deleteTodo = async (
  id: string | undefined
): Promise<TodoModel> => {
  return await axiosHttp(`${Todo_BASE_URL}`).delete<TodoModel>(
    `${Todo_RESOURCE_URL}/${id}`
  );
};

export const TodoService = {
  getTodosPerPage,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
