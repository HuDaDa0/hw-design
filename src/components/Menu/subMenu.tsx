import React, { useState, useContext } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'
import { MenuContext } from './menu'

interface SubMenuProps {
  index?: string;
  title: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

function SubMenu(props: SubMenuProps) {
  
  const context = useContext(MenuContext)
  const { index = '0', title, disabled, className, style, children } = props
  const isOpen = (index && context.mode === 'vertical') ? context.defaultOpenSubMenus.includes(index) : false
  const [menuOpen, setOpen] = useState(isOpen)

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

  let timer: any = null
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    timer && clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setOpen(toggle)
    }, 300)
  }

  const handleSubmenuClick = (e: any) => {
    e.preventDefault()
    setOpen(!menuOpen)
  }

  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleSubmenuClick
  } : {}

  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
  } : {}

  const renderChildren = () => {

    const classes = classNames('hw-submenu', {
      'menu-opened': menuOpen
    })

    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`
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
    <li className={classes} style={style} onClick={handleClick} { ...hoverEvents }>
      <div className="submenu-title" { ...clickEvents }>{ title }</div>
      { renderChildren() }
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu

