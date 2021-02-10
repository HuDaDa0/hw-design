import React from 'react'

import './styles/index.scss'

import Button from './components/Button/button'

function App() {
  return (
    <div className="App">
      <Button btnType='danger' onClick={ e=> {console.log(e)}}>hahah</Button>
      <Button size='lg' btnType='primary'>hahah</Button>
      <Button size='sm' disabled={true}>hahah</Button>
      <Button href='http://www.baidu.com' btnType='link'>hahah</Button>
    </div>
  )
}

export default App
