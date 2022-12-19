import * as React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import EnhancedTableHead from './TableComponents/TableHead'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import FormControlLabel from '@mui/material/FormControlLabel'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp'
import { visuallyHidden } from '@mui/utils'
import CreateSharpIcon from '@mui/icons-material/CreateSharp'
import { Avatar, Button } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import UploadIcon from '@mui/icons-material/Upload'
import DownloadIcon from '@mui/icons-material/Download'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import EditableRow from './TableComponents/EditableRow'
import AddRow from './TableComponents/AddRow'
import Notification from './TableComponents/Notification'
import { useState } from 'react'
import ImportExcel from './TableComponents/ImportExcel'
import ExportExcel from './TableComponents/ExportExcel'
import { apiDelete, apiGet, apiPost } from './services'

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

export default function EnhancedTable({ searchKeyWord }) {
  // expect: []
  const [oriData, setOriData] = React.useState([])
  // console.log('oriData', oriData)
  const [products, setProducts] = React.useState([])
  // console.log('pro',products)
  const [order, setOrder] = React.useState('desc')
  const [orderBy, setOrderBy] = React.useState('id')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [onAdd, setOnAdd] = useState(false)
  const [editProductId, setEditProductId] = React.useState(null)
  const [open, setOpen] = React.useState(false)
  const [productId, setProductId] = useState()
  const [image, setImage] = useState('')
  const [editFormData, setEditFormData] = useState({
    category_id: '99',
    id: '',
    title: '',
    description: '',
    price: ''
  })

  const handleClickOpen = (productId) => {
    setOpen(true)
    setProductId(productId)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    // console.log('isAsc:', isAsc)
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
    console.log('asc', isAsc)
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0

  const avatarStyle = { backgroundColor: '#2149e4', color: 'white', margin: '0 10px' }

  const add = () => setOnAdd(!onAdd)

  const handleImageChange = (file) => {
    console.log('image', file)
    setImage(file)
    // console.log('target',event.target.files)
  }

  const handleEditFormChange = (e) => {
    e.preventDefault()

    const fieldValue = e.target.value

    console.log('name', e.target.name)

    setEditFormData((prevState) => ({
      ...prevState,
      [e.target.name]: fieldValue
    }))
    console.log('form', setEditFormData)
  }

  const handleEditClick = (event, product) => {
    event.preventDefault()

    setEditProductId(product.id)

    const formValues = {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      category_id: product.category_id,
      product_image: product.image
    }
    console.log('editImg', product.image)
    setEditFormData(formValues)
  }

  const handleCancelClick = () => {
    setEditProductId(null)
  }

  const handleDeleteClick = (productId) => {
    // console.log('id',productId)
    // const newProducts = [...products]
    // const index = products.findIndex((product) => product.id === productId)
    // newProducts.splice(index, 1)
    // setProducts(newProducts)

    // const userToken = localStorage.getItem('react-demo-token')
    // console.log('token', userToken)
    // const config = {
    //   headers: {
    //     token: userToken
    //   }
    // }

    apiDelete(`product/${productId}`)

    // axios
    //   .delete(`https://app.spiritx.co.nz/api/product/${productId}`, config)

      .then((res) => {
        const newProducts = [...products]
        const index = products.findIndex((product) => product.id === productId)
        newProducts.splice(index, 1)
        setProducts(newProducts)
        handleClose()
      })
      .catch((err) => console.log(err))
  }

  const onSubmit = () => {
    // const userToken = localStorage.getItem('react-demo-token')
    // const config = {
    //   headers: {
    //     token: userToken
    //   }
    // }

    const formData = new FormData()
    editFormData.title && formData.append('title', editFormData.title)
    editFormData.description && formData.append('description', editFormData.description)
    editFormData.price && formData.append('price', editFormData.price)
    image && formData.append('product_image', image)
    formData.append('_method', 'put')

    apiPost(`product/${editFormData.id}`, formData)

    // axios
    //   .post('https://app.spiritx.co.nz/api/product/' + editFormData.id, formData, config)
      .then((res) => {
        console.log(res)
        const newData = [...products]
        const index = products.findIndex((product) => product.id === editFormData.id)
        newData[index] = res.data
        setProducts(newData)
        setEditProductId(null)
      })
      .catch((err) => console.log(err))
  }

  React.useEffect(() => {
    apiGet('products')
    // axios
    //   .get('https://app.spiritx.co.nz/api/products')
      .then((res) => {
        // console.log('res', res)
        const data = res.data
        data.map((prod) => (prod.price = parseInt(prod.price)))
        setOriData(data)
        setProducts(data)
      })
      .catch((err) => console.log(err))
  }, [])

  React.useEffect(() => {
    // console.log(searchKeyWord)
    setProducts(
      oriData.filter((product) => {
        if (searchKeyWord === '') {
          return product
        }
        if (product.title.includes(searchKeyWord) || product.description.includes(searchKeyWord)) {
          return product
        }
      })
    )
  }, [searchKeyWord])



  return (
    <Box sx={{ width: '88%', padding: '0 100px 0 100px' }}>
      <Button variant='text'>
        <AddCircleIcon onClick={() => add()} fontSize='large' />
      </Button>
      <Button>
        <ImportExcel products={products} setProducts={setProducts} />
      </Button>
      <Button>
        <ExportExcel Products={products} />
        <TableHead />
      </Button>
      <Paper sx={{ width: '100%', mb: 2 }}>
        {products.length > 0 && (
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={'medium'}>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={products.length}
                setEditProductId={setEditProductId}
              />
              <TableBody>
                {onAdd && (
                  <AddRow
                    products={products}
                    setProducts={setProducts}
                    setOnAdd={setOnAdd}
                    image={image}
                    setImage={setImage}
                    handleImageChange={(e) => handleImageChange(e)}
                  />
                )}

                {products
                  .sort(getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((product, index) => {
                    return (
                      <>
                        {editProductId == product.id ? (
                          <EditableRow
                            product={product}
                            key={editFormData.id}
                            editFormData={editFormData}
                            handleEditFormChange={handleEditFormChange}
                            handleCancelClick={handleCancelClick}
                            handleSubmit={onSubmit}
                            image={image}
                            handleImageChange={handleImageChange}
                          />
                        ) : (
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, product.title)}
                            tabIndex={-1}
                            key={product.id}
                          >
                            <TableCell
                              // component='th'
                              id={product.id}
                              scope='row'
                              padding='none'
                              align='center'
                            >
                              {product.title}
                            </TableCell>
                            <TableCell align='center'>{product.description}</TableCell>
                            <TableCell align='center'>{product.price}</TableCell>
                            <TableCell align='center'>
                              <img
                                src={`https://app.spiritx.co.nz/storage/${product.product_image}`}
                                width='80'
                                height='60'
                              />
                            </TableCell>
                            <TableCell align='center'>
                              <IconButton
                                variant='outlined'
                                style={avatarStyle}
                                onClick={(event) => handleEditClick(event, product)}
                              >
                                <CreateSharpIcon />
                              </IconButton>
                              <IconButton
                                variant='outlined'
                                style={avatarStyle}
                                onClick={() => handleClickOpen(product.id)}
                              >
                                <DeleteSharpIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    )
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component='div'
              count={products.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        )}
        {products.length === 0 && <div>No Matching result</div>}
        <Notification
          open={open}
          handleClose={handleClose}
          handleDeleteClick={handleDeleteClick}
          productId={productId}
        />
      </Paper>
    </Box>
  )
}
