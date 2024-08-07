import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser');
    setUser(null);
  }

  return (
    <>
      {
        user && <button onClick={handleLogout}>logout</button>
      }

      {user === null ? 
      <LoginForm setUser={setUser} /> : 
      <Blogs />
      }
    </>
  )
}

export default App
