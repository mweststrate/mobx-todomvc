import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'

@observer
class TodoItem extends Component {
  @observable editing = false;

  handleDoubleClick() {
    this.editing = true
  }

  handleSave(id, text) {
    if (text.length === 0) {
      this.props.store.deleteTodo(id)
    } else {
      this.props.store.editTodo(id, text)
    }
    this.editing = false
  }

  render() {
    const { todo, store } = this.props

    let element
    if (this.editing) {
      element = (
        <TodoTextInput text={todo.text}
                       editing={this.state.editing}
                       onSave={(text) => this.handleSave(todo.id, text)} />
      )
    } else {
      element = (
        <div className="view">
          <input className="toggle"
                 type="checkbox"
                 checked={todo.completed}
                 onChange={() => store.completeTodo(todo.id)} />
          <label onDoubleClick={this.handleDoubleClick.bind(this)}>
            {todo.text} {todo.other && todo.other.completed ? "Yes!" : " . "}
          </label>
          <button className="destroy"
                  onClick={() => store.deleteTodo(todo.id)} />
        </div>
      )
    }

    return (
      <li className={classnames({
        completed: todo.completed,
        editing: this.editing
      })}>
        {element}
      </li>
    )
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
}

export default TodoItem
