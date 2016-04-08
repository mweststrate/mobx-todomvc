import React, { PropTypes, Component } from 'react'
import { observer } from 'mobx-react'
import classnames from 'classnames'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../stores/appstate'

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed'
}

@observer
class Footer extends Component {

  handleClearCompleted() {
    this.props.store.clearCompleted()
  }

  renderTodoCount(store) {
    const activeCount = store.todos.length - store.completedCount
    const itemWord = activeCount === 1 ? 'item' : 'items'

    return (
      <span className="todo-count">
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
    )
  }

  renderFilterLink(store, filter) {
    const title = FILTER_TITLES[filter]

    return (
      <a className={classnames({ selected: filter === store.filter })}
         style={{ cursor: 'pointer' }}
         onClick={() => store.setFilter(filter)}>
        {title}
      </a>
    )
  }

  renderClearButton(store) {
    if (store.completedCount > 0) {
      return (
        <button className="clear-completed"
                onClick={() => store.clearCompleted()} >
          Clear completed
        </button>
      )
    }
  }

  render() {
    const {store} = this.props

    return (
      <footer className="footer">
        {this.renderTodoCount(store)}
        <ul className="filters">
          {[ SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED ].map(filter =>
            <li key={filter}>
              {this.renderFilterLink(store, filter)}
            </li>
          )}
        </ul>
        {this.renderClearButton(store)}
      </footer>
    )
  }
}

Footer.propTypes = {
  store: PropTypes.object.isRequired
}

export default Footer
