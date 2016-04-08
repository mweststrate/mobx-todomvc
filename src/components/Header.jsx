import React, { PropTypes, Component } from 'react'
import { observer } from 'mobx-react'
import TodoTextInput from './TodoTextInput'

@observer
class Header extends Component {
  handleSave(text) {
    if (text.length !== 0) {
      this.props.store.addTodo(text)
    }
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <TodoTextInput newTodo
                       onSave={this.handleSave.bind(this)}
                       placeholder="What needs to be done?" />
      </header>
    )
  }
}

Header.propTypes = {
  store: PropTypes.object.isRequired
}

export default Header
