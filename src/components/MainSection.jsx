import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'
import TodoItem from './TodoItem'
import Footer from './Footer'

const ToggleAll = observer(({ store }) =>
  <input className="toggle-all"
    type="checkbox"
    checked={store.completedCount === store.todos.length}
    onChange={() => store.completeAll() } />
)

const TodoList = observer(({ store }) =>
  <ul className="todo-list">
    {store.visibleTodos.map(todo =>
      <TodoItem key={todo.id} todo={todo} store={store} />
    )}
  </ul>
)

@observer
class MainSection extends Component {
  render() {
    const { store } = this.props

    return (
      <section className="main">
        {store.todos.length ? <ToggleAll store={store} /> : null}
        <TodoList store={store} />
        {store.todos.length ? <Footer store={store} /> : null}
      </section>
    )
  }
}

MainSection.propTypes = {
  store: PropTypes.object.isRequired
}

export default MainSection
