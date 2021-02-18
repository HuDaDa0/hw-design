import React from 'react'

import './styles/index.scss'

import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'

function App() {
  return (
    <div className="App">
      <Menu onSelect={() => {}}>
        <MenuItem index={0}>
          one
        </MenuItem>
        <MenuItem index={1}>
          two
        </MenuItem>
        <MenuItem index={2}>
          three
        </MenuItem>
      </Menu>
    </div>
  )
}

export default App
