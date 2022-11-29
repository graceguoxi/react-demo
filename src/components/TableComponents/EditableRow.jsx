import { IconButton, OutlinedInput, TableCell, TableRow } from '@mui/material'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'
import ClearIcon from '@mui/icons-material/Clear'
import CheckIcon from '@mui/icons-material/Check'

const EditableRow = ({ editFormData, handleEditFormChange, handleCancelClick }) => {
  return (
    <TableRow>
      <TableCell align='center'>
        <OutlinedInput
          type='text'
          required='required'
          label='title'
          value={editFormData.title}
          onChange={handleEditFormChange}
        ></OutlinedInput>
      </TableCell>
      <TableCell align='center'>
        <OutlinedInput
          type='text'
          required='required'
          label='description'
          value={editFormData.description}
          onChange={handleEditFormChange}
        ></OutlinedInput>
      </TableCell>
      <TableCell align='center'>
        <OutlinedInput
          type='text'
          required='required'
          label='price'
          value={editFormData.price}
          onChange={handleEditFormChange}
        ></OutlinedInput>
      </TableCell>
      <TableCell align='center'>
        <IconButton color='primary' aria-label='upload picture' component='label'>
          <input hidden accept='image/*' type='file' />
          <DriveFolderUploadIcon fontSize='large' />
        </IconButton>
      </TableCell>
      <TableCell align='center'>
        <IconButton type='submit'>
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
