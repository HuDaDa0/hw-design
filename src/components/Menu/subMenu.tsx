import React, { useState, useContext } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'
import { MenuContext } from './menu'

interface SubMenuProps {
  index?: number;
  title: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

function SubMenu(props: SubMenuProps) {

  const { index = 0, title, disabled, className, style, children } = props

  const context = useContext(MenuContext)

  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
    'is-disabled': disabled,
    'is-vertical': context.mode === 'vertical'
  })

  const handleClick = () => {
    if (!disabled && context.onSelect) {
      context.onSelect(index)
    }
  }

  const renderChildren = () => {

    const classes = classNames('hw-submenu')

    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          
        })
      } else {
        console.error('Warning: SubMenu has a child which is not a MenuItem component')
      }
    })

    return (
      <ul className={classes}>
        { childrenComponent }
      </ul>
    )
  }


  return (
    <li className={classes} style={style} onClick={handleClick}>
      <div className="submenu-title">{ title }</div>
      { renderChildren() }
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu

