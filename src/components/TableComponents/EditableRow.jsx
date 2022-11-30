import { IconButton, OutlinedInput, TableCell, TableRow, TextField } from '@mui/material'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'
import ClearIcon from '@mui/icons-material/Clear'
import CheckIcon from '@mui/icons-material/Check'

const EditableRow = ({ editFormData, handleEditFormChange, handleCancelClick, handleSubmit }) => {
  console.log(editFormData)
  return (
    <TableRow>
      <TableCell align='center'>
        <TextField
          type='text'
          required={true}
          name='title'
          defaultValue={editFormData.title}
          onChange={handleEditFormChange}
        ></TextField>
      </TableCell>
      <TableCell align='center'>
        <TextField
          type='text'
          required={true}
          name='description'
          defaultValue={editFormData.description}
          onChange={handleEditFormChange}
        ></TextField>
      </TableCell>
      <TableCell align='center'>
        <TextField
          type='number'
          required={true}
          name='price'
          defaultValue={editFormData.price}
          onChange={handleEditFormChange}
        ></TextField>
      </TableCell>
      <TableCell align='center'>
        <IconButton color='primary' aria-label='upload picture' component='label'>
          <input hidden accept='image/*' type='file' />
          <DriveFolderUploadIcon fontSize='large' />
        </IconButton>
      </TableCell>
      <TableCell align='center'>
        <IconButton type='submit' onClick={handleSubmit}>
          <CheckIcon fontSize='large' color='primary' />
        </IconButton>
        <IconButton type='button' onClick={handleCancelClick}>
          <ClearIcon fontSize='large' color='primary' />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
export default EditableRow
