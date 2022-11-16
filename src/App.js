import MuiTable from "./components/MuiTable";
import SearchAppBar from './components/SearchAppBar'
import SortTable from './components/SortTable'
import { useEffect, useState } from "react";
import axios from "axios";


function App() {
  const [searchKeyWord, setSearchKeyWord] = useState('')

  return (
    <>
      <SearchAppBar keyWord={searchKeyWord} onSearch={setSearchKeyWord} />
     
      <main>
        <SortTable searchKeyWord={searchKeyWord} />
      </main>
    </>
  )
}

export default App;
