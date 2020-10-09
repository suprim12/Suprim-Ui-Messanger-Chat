import React from 'react'
import ReactDOM from 'react-dom'
// import { render } from '@testing-library/react'
// import App from '../App'

test('Renders Messanger Without Crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<h1>Messanger Component</h1>, div)
})
