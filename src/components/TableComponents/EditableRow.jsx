import { IconButton, TableCell, TableRow, TextField } from '@mui/material'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'
import ClearIcon from '@mui/icons-material/Clear'
import CheckIcon from '@mui/icons-material/Check'
import { useState } from 'react'



const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
  handleSubmit,
  handleImageChange,
  product,
  disable,
  setDisable
}) => {
  const [url, setUrl] = useState()
  const showImg = (e) => {
    let file = e.target.files[0]
    let url = window.URL.createObjectURL(file)
    setUrl(url)
    handleImageChange(file)
  }
  const onTextChange = () => {
    setDisable(false)
    handleEditFormChange()
  }
  const onImgChange = () => {
    handleImageChange()
    setDisable(false)
  }

  return (
    <TableRow>
      <TableCell align='center'>
        <TextField
          type='text'
          required={true}
          name='title'
          defaultValue={editFormData.title}
          onChange={onTextChange}
        ></TextField>
      </TableCell>
      <TableCell align='center'>
        <TextField
          type='text'
          required={true}
          name='description'
          defaultValue={editFormData.description}
          onChange={onTextChange}
        ></TextField>
      </TableCell>
      <TableCell align='center'>
        <TextField
          type='number'
          required={true}
          name='price'
          defaultValue={editFormData.price}
          onChange={onTextChange}
        ></TextField>
      </TableCell>
      <TableCell align='center'>
        <IconButton
          onClick={onImgChange}
          color='primary'
          aria-label='upload picture'
          component='label'
        >
          <img
            src={
              url
                ? url
                : `https://app.spiritx.co.nz/storage/${product.product_image}`
            }
            width='80'
            height='60'
          />
          <input
            hidden
            accept='image/*'
            type='file'
            name='product_image'
            onChange={showImg}
          />
          <DriveFolderUploadIcon fontSize='large' />
        </IconButton>
      </TableCell>
      <TableCell align='center'>
        <IconButton
          type='submit'
          disabled={disable}
          onClick={handleSubmit}
        >
          <CheckIcon
            fontSize='large'
            color={disable ? 'disabled' : 'primary'}
          />
        </IconButton>
        <IconButton
          type='button'
          onClick={handleCancelClick}
        >
          <ClearIcon fontSize='large' color='primary' />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
export default EditableRow
