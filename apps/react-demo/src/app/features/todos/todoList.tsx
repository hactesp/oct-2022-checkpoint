import React from 'react';
import { TodoModel } from '.';
import { TodoContext } from './todos';

export class TodoList extends React.Component {
  contextTodo = TodoContext;

  editItem(item: TodoModel) {
    console.log(item);
  }

  deleteItem(id: string | undefined) {
    console.log(id);
  }

  todos: TodoModel[] = this.context as TodoModel[];

  override render() {
    console.log(this.context);

    return (
      <TodoContext.Consumer>
        {(value) => (
          <table
            style={{
              minWidth: '300px',
              fontFamily: 'Arial, Helvetica, sans-serif',
              borderCollapse: 'collapse',
            }}
          >
            <thead style={{ fontWeight: 700 }}>
              <tr>
                <td style={{ width: '200px' }}>Name</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody data-testid="table-data">
              {value.map((todo) => {
                return (
                  <tr key={todo.id}>
                    <td data-testid="todo-name">{todo.name}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => {
                          this.deleteItem(todo.id);
                        }}
                      >
                        Delete
                      </button>
                      &nbsp;|&nbsp;
                      <button
                        type="button"
                        onClick={() => {
                          this.editItem(todo);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </TodoContext.Consumer>
    );
  }
}
