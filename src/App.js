import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import MuiTable from './components/MuiTable'
import SearchAppBar from './components/SearchAppBar'
import SortTable from './components/SortTable'
import { Details } from '@mui/icons-material'

function App() {
  const [searchKeyWord, setSearchKeyWord] = useState('')

  const auth = localStorage.getItem('react-demo-token')
  let user = {}
  if (auth) {
    user = JSON.parse(localStorage.getItem('react-demo-user'))
}
  const logout = () => {
    localStorage.removeItem('react-demo-token')
    localStorage.removeItem('react-demo-user')
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  return (
    <>
      <SearchAppBar keyWord={searchKeyWord} onSearch={setSearchKeyWord} />

      <main>
        <Router>
          <Routes>
            {auth ? (
              <Route path='/' element={<SortTable searchKeyWord={searchKeyWord} />} />
            ) : (
              <Route path='/' element={<Login />} />
            )}

            <Route path='login' element={auth ? <Navigate to='/' /> : <Login />} />
          </Routes>
        </Router>
        
        {
          auth && <button onClick={logout}>Log out</button>
        }
        {
          user.email
        }
      </main>
    </>
  )
}

export default App
