let todos = [
  {
    name: "Santa Monica",
    deleted: false,
    id: 1
  },
  {
    name: "Stankonia",
    deleted: false,
    id: 2
  },
  {
    name: "Ocean Avenue",
    deleted: false,
    id: 3
  },
  {
    name: "Tubthumper",
    deleted: false,
    id: 4
  },
  {
    name: "Wide Open Spaces",
    deleted: false,
    id: 5
  }
];

export function getTodos() {
  return todos;
}

export function getTodo(id) {
  return todos.find(
    invoice => invoice.id === id
  );
}

export function deleteTodo(id) {
  todos = todos.filter(
    invoice => invoice.id !== id
  );
}

export function updateTodo(item) {
  const index = todos.findIndex(
    invoice => invoice.id === item.id
  );
  todos[index]=item;
}

export function addTodo(name) {
  const sortedTodo = todos.sort((a, b) => a.id > b.id);
  const latestID = sortedTodo[sortedTodo.length -1].id;
  todos.push({name, id: latestID + 1, deleted: false});
}
