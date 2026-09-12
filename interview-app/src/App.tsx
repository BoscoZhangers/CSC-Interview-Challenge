import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import UserDirectory from './UserDirectory.tsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App" style={{ width: '100%', margin: 0, padding: 0 }}>
      {/* This injects the baseline full-screen rules directly into the page */}
      <style>{`
        html, body, #root {
          margin: 0;
          padding: 0;
          width: 100%;
          overflow-x: hidden;
        }
      `}</style>
      
      <UserDirectory/>
    </div>
  )
}

export default App