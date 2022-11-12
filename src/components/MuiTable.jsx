import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, TablePagination, AppBar, Toolbar, Typography, TableSortLabel } from "@mui/material"
import { Container } from "@mui/system"
import axios from "axios"
import { useEffect, useState } from "react"

const MuiTable = () => {
  // const[tableData, settableData] = useState([])

  // useEffect(() => {
  //   axios.get('https://app.spiritx.co.nz/api/products')
  //   .then(res => settableData(res.data))
  //   .catch(err => console.log(err))
  // }, [])

  // useEffect(() => console.log(tableData))

  const [tableData, settableData] = useState([])

  useEffect(() => {
    axios.get('https://app.spiritx.co.nz/api/products')
      .then(res => settableData(res.data))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => console.log(tableData), [tableData])

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  


  // const tableData=[
  //   {id:1,title:'mark',description:'weudnfdoif',price:39},
  //   {id:2,title:'mark',description:'weudnfdoif',price:21},
  //   {id:3,title:'mark',description:'weudnfdoif',price:32},
  //   {id:4,title:'mark',description:'weudnfdoif',price:18},
  //   {id:5,title:'mark',description:'weudnfdoif',price:27}
  // ]

  return (
    <Container>

      <TableContainer component={Paper} sx={{ maxHeight: '360px' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align='center'>Price($)</TableCell>
              <TableCell>Product image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
            {tableData
              .sort(getComparator(order, orderBy)).slice()
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell align='center' >$ {row.price}</TableCell>
                    <TableCell>{row.image}</TableCell>
                  </TableRow>
                )
              })}
           
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      
    </Container>
  )
}
export default MuiTable