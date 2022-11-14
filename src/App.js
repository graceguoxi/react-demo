import MuiTable from "./components/MuiTable";
import { AppBar, Toolbar, Typography } from "@mui/material"
import ProductPage from "./components/ProductPage";
import StickyHeadTable from "./Table";
import SearchAppBar from './components/SearchAppBar'
import SortTable from './components/SortTable'
import { useEffect, useState } from "react";
import axios from "axios";
import { getPosts } from './api/axios' 

function App() {
  const [searchKeyWord, setSearchKeyWord] = useState('')
  const [origPosts, setOrigPosts] = useState([])

  return (
    <>
      <SearchAppBar posts={origPosts} onSearch={setSearchKeyWord} />
      {/* MUI Doc Example */}
      {/* <StickyHeadTable /> */}
      {/* <ProductPage /> */}
      
      <main>
        <SortTable searchKeyWord={searchKeyWord} />
      </main>
    </>
  )
}

export default App;
