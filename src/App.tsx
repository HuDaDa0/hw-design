import React from 'react'

import './styles/index.scss'

import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'

function App() {
  return (
    <div className="App">
      <Menu mode="vertical" defaultOpenSubMenus={['2']}>
        <MenuItem>
          one
        </MenuItem>
        <MenuItem>
          two
        </MenuItem>
        <SubMenu title="子菜单">
          <MenuItem>
            submenu one
          </MenuItem>
          <MenuItem>
            submenu two
          </MenuItem>
        </SubMenu>
        <MenuItem>
          three
        </MenuItem>
      </Menu>
    </div>
  )
}

export default App
