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
  const [posts, setPosts] = useState([])
  const [searchResults, setSearchResults] = useState('')
 
// useEffect(() => {
//   getPosts().then(json => {
//     setPosts(json)
//     return json
//   }).then(json => {
//     setSearchResults(json)
//   })
// }, [])

useEffect(() => {
  axios.get('https://app.spiritx.co.nz/api/products')
    .then(res => {
      const posts = res.data
      posts.map(post => post.price = parseInt(post.price))
      console.log('posts',posts)
      setPosts(posts)
    })
    .catch(err => console.log(err))
}, [])


// React.useEffect(() => {
//   axios.get('https://app.spiritx.co.nz/api/products')
//     .then(res => {
//       const data = res.data
//       data.map(prod => prod.price = parseInt(prod.price))
//       console.log(data)
//       setProducts(data)
//     })
//     .catch(err => console.log(err))
// }, [])
 
  
  return (
    <>
      {/* MUI Doc Example */}
      {/* <StickyHeadTable /> */}

      {/* <ProductPage /> */}
      
      <SearchAppBar posts={posts} setSearchResults={setSearchResults} />
      
      <main>
        {/* <MuiTable /> */}
        <SortTable searchResults={searchResults} />
      </main>
    </>
      
  );
}

export default App;
