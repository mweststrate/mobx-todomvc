import { observable, computed, transaction } from 'mobx'

export const SHOW_ALL = 'show_all'
export const SHOW_COMPLETED = 'show_completed'
export const SHOW_ACTIVE = 'show_active'

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
}

export default class AppState {
  @observable filter = SHOW_ALL;
  @observable todos;

  constructor(initialTodos) {
    this.todos = initialTodos || []
  }

  @computed get visibleTodos() {
    return this.todos.filter(TODO_FILTERS[this.filter])
  }

  @computed get completedCount() {
    return this.todos.filter(todo => todo.completed).length
  }

  findTodo(id) {
    return this.todos.find(todo => todo.id === id)
  }

  addTodo(text) {
    const todo = {
      id: this.todos.length,
      text,
      completed: false,
      other: null
    }
    this.todos.unshift(todo)
    return todo
  }

  deleteTodo(id) {
    this.todos.remove(this.findTodo(id))
  }

  editTodo(id, text) {
    this.findTodo(id).text = text
  }

  completeTodo(id) {
    const todo = this.findTodo(id)
    todo.completed = !todo.completed
  }

  completeAll() {
    transaction(() => {
      const allCompleted = this.completedCount === this.todos.length
      this.todos.forEach(todo => todo.completed = !allCompleted)
    })
  }

  clearCompleted() {
    this.todos.replace(this.todos.filter(todo => !todo.completed))
  }
  
  setFilter(filter) {
    this.filter = filter
  }
}

