import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTodo } from '../hooks/useTodo'

export default function Link ({ children, filter }) {
  const { state, setVisibility } = useTodo()
  const { visibilityFilter } = state

  return (
    <a
      href='#'
      type='button'
      className={classNames({
        selected: filter === visibilityFilter
      })}
      style={{ cursor: 'pointer' }}
      onClick={() => setVisibility(filter)}
    >
      {children}
    </a>
  )
}

Link.propTypes = {
  children: PropTypes.node.isRequired,
  filter: PropTypes.string.isRequired
}
