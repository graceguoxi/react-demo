import { IconButton, TableCell, TableRow, TextField } from '@mui/material'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'
import ClearIcon from '@mui/icons-material/Clear'
import CheckIcon from '@mui/icons-material/Check'
import { nanoid } from 'nanoid'
import { Form } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

const AddRow = ({ products, setProducts, setOnAdd }) => {
  const [addFormData, setAddFormData] = useState({
    title: '',
    description: '',
    price: ''
  })

  // useEffect(() => console.log(addFormData))
  // useEffect(() => console.log(products))

  const handleAddFormChange = (e) => {
    e.preventDefault()

    const fieldName = e.target.getAttribute('name')
    const fieldValue = e.target.value

    const newFormDate = { ...addFormData }
    newFormDate[fieldName] = fieldValue

    setAddFormData(newFormDate)
    console.log('change', e.target.value)
  }

  const handleAddFormSubmit = (e) => {
    e.preventDefault()

    const newProduct = {
      id: nanoid,
      title: addFormData.title,
      description: addFormData.description,
      price: addFormData.price
    }

    const newProducts = [newProduct, ...products]
    console.log(newProduct)
    setProducts(newProducts)
    setOnAdd()
  }
  // console.log('new', products)

  return (
    <TableRow>
      <TableCell align='center'>
        <TextField
          type='text'
          required={true}
          name='title'
          placeholder='Enter a title'
          // defaultValue={editFormData.title}
          onChange={handleAddFormChange}
        ></TextField>
      </TableCell>
      <TableCell align='center'>
        <TextField
          type='text'
          required={true}
          name='description'
          placeholder='Enter a description'
          // defaultValue={editFormData.description}
          onChange={handleAddFormChange}
        ></TextField>
      </TableCell>
      <TableCell align='center'>
        <TextField
          type='number'
          required={true}
          name='price'
          placeholder='Enter a price'
          // defaultValue={editFormData.price}
          onChange={handleAddFormChange}
        ></TextField>
      </TableCell>
      <TableCell align='center'>
        <IconButton color='primary' aria-label='upload picture' component='label'>
          <input hidden accept='image/*' type='file' />
          <DriveFolderUploadIcon fontSize='large' />
        </IconButton>
      </TableCell>
      <TableCell align='center'>
        <IconButton type='submit' onClick={handleAddFormSubmit}>
          <CheckIcon fontSize='large' color='primary' />
        </IconButton>
        <IconButton onClick={() => setOnAdd()} type='button'>
          <ClearIcon fontSize='large' color='primary' />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
export default AddRow
