import { useState } from 'react'
import Messages from './components/Messages'
import Login from './components/Security/Login'
import Navbar from './components/Navbar'
import Menu from './components/Menu'
import Footer from './components/Footer'

function App () {
  const [user, setUser] = useState({ username: '', password: '' })
  const [isLogin, setIsLogin] = useState(true)
  const [messages, setMessages] = useState([])

  return (
    <div className='mx-auto mt-auto max-w-7xl py-16 space-y-8 text-xl'>
      <Navbar setIsLogin={setIsLogin} setMessages={setMessages} />
      <main>
        <Messages username={user.username} messages={messages} />
        <Menu username={user.username} setMessages={setMessages} />

        {isLogin || (
          <Login user={user} setIsLogin={setIsLogin} setMessages={setMessages} setUser={setUser} />
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App
