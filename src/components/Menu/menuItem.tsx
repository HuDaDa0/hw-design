import React, { useContext } from 'react'
import classNames from 'classnames'

import { MenuContext } from './menu'


interface MenuItemProps {
  index?: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode
}


function MenuItem(props: MenuItemProps) {

  const { index = 0, disabled, className, style, children } = props

  const context = useContext(MenuContext)
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index
  })

  const handleClick = () => {
    if (!disabled && context.onSelect) {
      context.onSelect(index)
    }
  }
  return (
    <li className={classes} style={style} onClick={handleClick}>
      { children }
    </li>
  )
}


export default MenuItem

