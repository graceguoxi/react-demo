import { IconButton, Button, TableCell, TableRow, TextField} from '@mui/material'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'
import ClearIcon from '@mui/icons-material/Clear'
import CheckIcon from '@mui/icons-material/Check'
import { nanoid } from 'nanoid'
import { useState } from 'react'
import axios from 'axios'
import { apiPost } from '../services'

const AddRow = ({ products, setProducts, setOnAdd, disable, setDisable }) => {
  const [image, setImage] = useState('')
  const [addFormData, setAddFormData] = useState({
    category_id: '99',
    title: '',
    description: '',
    price: ''
  })
  const [addUrl, setAddUrl] = useState()
  const addImg = (e) => {
    let imgFile = e.target.files[0]
    let url = window.URL.createObjectURL(imgFile)
    setAddUrl(url)
    handleImage(imgFile)
  }

  

  const handleAddFormChange = (e) => {
    e.preventDefault()

    const fieldName = e.target.getAttribute('name')
    const fieldValue = e.target.value
    console.log('fieldname', e)
    console.log('fieldValue', fieldValue)

    const newFormDate = { ...addFormData }
    newFormDate[fieldName] = fieldValue

  
    console.log('newFormData', newFormDate)
    setAddFormData(newFormDate)
  }

  let formData = new FormData()
  const handleAddFormSubmit = (e) => {
    
    e.preventDefault()

    const newProduct = {
      id: nanoid,
      title: addFormData.title,
      description: addFormData.description,
      price: addFormData.price
    }

    const newProducts = [newProduct, ...products]
    console.log('newProduct',newProduct)
    setProducts(newProducts)
    setOnAdd()
  }

  const onAddSubmit = (e) => {
    e.preventDefault()
    formData.append('title', addFormData.title)
    addFormData.description &&
      formData.append(
        'description',
        addFormData.description
      )
    formData.append('price', addFormData.price)
    // formData.append('category_id', 99)
    image && formData.append('product_image', image)
    
    const userToken = localStorage.getItem(
      'react-demo-token'
    )

    let config = {
      headers: {
        Authorization: 'Bearer ' + userToken
      }
    }

    axios
      .post(
        'http://localhost:8000/api/products',
        formData,
        config
      )
      .then((res) => {
        const newProductsData = [res.data, ...products]
        console.log('res', res.data)
        setProducts(newProductsData)
        setOnAdd(false)
      })
      .catch((err) => console.log(err))

    // apiPost('products', formData)
    //   .then((res) => {
    //     const newProductsData = [res.data, ...products]
    //     console.log('res', res.data)
    //     setProducts(newProductsData)
    //     setOnAdd(false)
    //     console.log('new', newProductsData)
    //   })
    //   .catch((err) => console.log(err))
  }

  const handleImage = (file) => {
    console.log('imageFile', file)
    setImage(file)
  } 

  // const onAddChange = () => {
  //   setDisable(false)
  //   onAddSubmit()
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
        <IconButton
          color='primary'
          aria-label='upload picture'
          component='label'
        >
          {addUrl ? (
            <img src={addUrl} width='80' height='60' />
          ) : (
            ''
          )}
          <input
            hidden
            name='product_image'
            type='file'
            accept='image/*'
            onChange={(e) => addImg(e)}
          />
          <DriveFolderUploadIcon fontSize='large' />
        </IconButton>
      </TableCell>
      <TableCell align='center'>
        <IconButton
          type='submit'
          onClick={(e) => onAddSubmit(e)}
          // disabled={disable}
        >
          <CheckIcon
            fontSize='large'
            // color={disable ? 'disabled' : 'primary'}
          />
        </IconButton>
        <IconButton
          onClick={() => setOnAdd()}
          type='button'
        >
          <ClearIcon fontSize='large' color='primary' />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
export default AddRow
