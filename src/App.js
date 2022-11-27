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
    // setTimeout(() => {
    window.location.reload()
    // }, 2000)
  }

  return (
    <>
      <Router>
        <SearchAppBar
          keyWord={searchKeyWord}
          onSearch={setSearchKeyWord}
          auth={auth}
          logout={logout}
          user={user}
        />
        
        <main>
          <Routes>
            {auth ? (
              <Route path='/' element={<SortTable searchKeyWord={searchKeyWord} />} />
            ) : (
              <Route path='/login' element={<Login />} />
            )}
            {!auth && <Route path='/' element={<Navigate to='/login' />} />}
            <Route path='*' element={<Navigate to='/' />} />
            {/* <Route path='*' element={ <h1>404</h1> } /> */}
  
            <Route path='/login' element={auth ? <Navigate to='/' /> : <Login />} />
          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App
