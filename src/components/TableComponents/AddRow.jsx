import { IconButton, Button, TableCell, TableRow, TextField, Input } from '@mui/material'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'
import ClearIcon from '@mui/icons-material/Clear'
import CheckIcon from '@mui/icons-material/Check'
import { nanoid } from 'nanoid'
import { Form } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const AddRow = ({ products, setProducts, setOnAdd }) => {
  const [image, setImage] = useState('')
  const [addFormData, setAddFormData] = useState({
    category_id: '99',
    title: '',
    description: '',
    price: ''
  })

  let formData = new FormData()

  // useEffect(() => console.log('11',addFormData))
  // useEffect(() => console.log('22',products))

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

  const onAddSubmit = () => {
    const userToken = localStorage.getItem('react-demo-token')
    const config = {
      headers: {
        token: userToken
      }
    }

    formData.append('title', addFormData.title)
    addFormData.description && formData.append('description', addFormData.description)
    formData.append('price', addFormData.price)
    formData.append('category_id', 99)
    image && formData.append('product_image', image)

    axios
      .post('https://app.spiritx.co.nz/api/products', formData, config)
      .then((res) => {
        const newProductsData = [res.data, ...products]
        console.log('res', res)
        setProducts(newProductsData)
        setOnAdd()
        console.log('new',newProductsData)
      })
      .catch((err) => console.log(err))
  }

  const handleImage = (event) => {
    console.log('image', event)
    setImage(event.target.files[0])
  }

  // const handleImgApiUpload = () => {
  //   const formData = new FormData()
  //   formData.append('image', image[0])
  //   const userToken = localStorage.getItem('react-demo-token')
  //   const config = {
  //     headers: {
  //       token: userToken
  //     }
  //   }
  //   axios
  //     .put('https://app.spiritx.co.nz/api/product', formData.id, formData, config)
  //     .then((res) => {
  //       console.log('res', res)
  //       setImage(res.data)
  //     })
  //     .catch()
  // }

  return (
    <TableRow>
      <TableCell align='center'>
        <TextField
          type='text'
          required={true}
          name='title'
          placeholder='Enter a title'
          onChange={handleAddFormChange}
        ></TextField>
      </TableCell>
      <TableCell align='center'>
        <TextField
          type='text'
          required={true}
          name='description'
          placeholder='Enter a description'
          onChange={handleAddFormChange}
        ></TextField>
      </TableCell>
      <TableCell align='center'>
        <TextField
          type='number'
          required={true}
          name='price'
          placeholder='Enter a price'
          onChange={handleAddFormChange}
        ></TextField>
      </TableCell>
      <TableCell align='center'>
        <IconButton color='primary' aria-label='upload picture' component='label'>
          <input
            hidden
            name='product_image'
            type='file'
            accept='image/*'
            onChange={(e) => handleImage(e)}
          />
          <DriveFolderUploadIcon fontSize='large' />
        </IconButton>
      </TableCell>
      <TableCell align='center'>
        <IconButton type='submit' onClick={onAddSubmit} >
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
