import Todos from './todos';
import {act} from "react-dom/test-utils";
import { render, unmountComponentAtNode } from "react-dom";
import {TodoService} from "./todo.service";
import {TodoModel} from "./index";

jest.mock("./todo.service");
describe('Todo Test', () => {

  let container: any = null;
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
    TodoService.getTodosPerPage = jest.fn().mockReset();
  });

  it('should render successfully', () => {
    TodoService.getTodosPerPage = jest.fn().mockResolvedValue([]);
    act(() => {
      render(<Todos />, container)
    });
    expect(container.textContent).toBeTruthy();
    expect(TodoService.getTodosPerPage).toHaveBeenCalledTimes(1);
    expect(TodoService.getTodosPerPage).toHaveBeenCalledWith(1,2);
  });

  it('should have a greeting as the view', () => {
    let output: any={};
    TodoService.getTodosPerPage = jest.fn().mockResolvedValue([]);
    act(() => {
      output = render(<Todos />, container)
    });
    expect(container.querySelector("[data-testid='add']")).toBeDefined();
    expect(container.querySelector("[data-testid='reset']")).toBeDefined();
    expect(container.querySelector("[data-testid='input']")).toBeDefined();
    expect(TodoService.getTodosPerPage).toHaveBeenCalledTimes(1);
    expect(TodoService.getTodosPerPage).toHaveBeenCalledWith(1,2);
  });

  it('should get a list of todo list', () => {
    let output: any={};
    const todos:TodoModel[] = [
      {
        name: "Santa Monica",
        deleted: false,
        id: '1'
      },
      {
        name: "Stankonia",
        deleted: false,
        id: '2'
      },
      {
        name: "Ocean Avenue",
        deleted: false,
        id: '3'
      },
      {
        name: "Tubthumper",
        deleted: false,
        id: '4'
      },
      {
        name: "Wide Open Spaces",
        deleted: false,
        id: '5'
      }
    ];
    TodoService.getTodosPerPage = jest.fn().mockResolvedValue(todos);
    act(() => {
      output = render(<Todos />, container)
    });
    expect(container.querySelector("[data-testid='add']").textContent).toEqual("Add / Update");
    expect(container.querySelector("[data-testid='reset']").textContent).toEqual("Reset");
    expect(container.querySelector("[data-testid='input']").getAttribute("placeholder")).toEqual("Todo Name");
    expect(container.querySelector("[data-testid='table-data']")).toBeDefined();
    expect(TodoService.getTodosPerPage).toHaveBeenCalledTimes(1);
    expect(TodoService.getTodosPerPage).toHaveBeenCalledWith(1,2);
  });
});
