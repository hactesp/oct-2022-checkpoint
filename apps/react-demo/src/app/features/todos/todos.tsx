import { createContext, useState } from 'react';
import { TodoModel } from '.';
import './todo.scss';
import { TodoForm } from './todoForm';
import { TodoList } from './todoList';

export const TodoContext = createContext<TodoModel[]>([])
export default function Todos() {
  const [todos, setTodo]= useState<TodoModel[]>([{id: '123', name: 'demo0'}])
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        marginTop: '50px',
      }}
    >
      <TodoContext.Provider value={todos}>
        <TodoForm></TodoForm>
        <TodoList></TodoList>
      </TodoContext.Provider>
    </div>
  );
}
