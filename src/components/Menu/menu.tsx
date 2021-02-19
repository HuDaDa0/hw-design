import React, { useState, createContext } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'

interface MenuProps {
  defaultIndex? : string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: (selectedIndex: string) => void;
  children?: React.ReactNode;
  defaultOpenSubMenus: string[];
}

interface IMenuContext {
  index: string;
  onSelect?: (selectedIndex: string) => void;
  mode: string;
  defaultOpenSubMenus: string[];
}

export const MenuContext = createContext({} as IMenuContext)

function Menu(props: MenuProps) {

  const { defaultIndex, className, mode = '', style, children, defaultOpenSubMenus, onSelect } = props

  const [currentActive, setActive] = useState(defaultIndex)
  const classes = classNames('hw-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode === 'horizontal'
  })

  const handleSelect = (index: string) => {
    setActive(index)
    onSelect && onSelect(index)
  }

  const passedContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleSelect,
    mode,
    defaultOpenSubMenus
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type 
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, { 
          index: index.toString()
         })
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component')
      }
    })
  }


  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>
        { renderChildren() }
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: []
}

export default Menu

