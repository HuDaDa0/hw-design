import React, { useState, createContext } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'

interface MenuProps {
  defaultIndex? : number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: (selectedIndex: number) => void;
  children?: React.ReactNode;
}

interface IMenuContext {
  index: number;
  onSelect?: (selectedIndex: number) => void;
  mode: string;
}

export const MenuContext = createContext({} as IMenuContext)

function Menu(props: MenuProps) {

  const { defaultIndex, className, mode = '', style, children, onSelect } = props

  const [currentActive, setActive] = useState(defaultIndex)
  const classes = classNames('hw-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode === 'horizontal'
  })

  const handleSelect = (index: number) => {
    setActive(index)
    onSelect && onSelect(index)
  }

  const passedContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleSelect,
    mode
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type 
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, { index })
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
  defaultIndex: 0,
  mode: 'horizontal'
}

export default Menu

