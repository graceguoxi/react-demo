import { IconButton, OutlinedInput } from '@mui/material'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'

const EditableRow = ({ editFormData, handleEditFormChange}) => {
  return (
    <tr>
      <td>
        <OutlinedInput
          type='text'
          required='required'
          label='title'
          value={editFormData.title}
          onChange={handleEditFormChange}
        ></OutlinedInput>
      </td>
      <td>
        <OutlinedInput
          type='text'
          required='required'
          label='description'
          value={editFormData.description}
          onChange={handleEditFormChange}
        ></OutlinedInput>
      </td>
      <td>
        <OutlinedInput
          type='text'
          required='required'
          label='price'
          value={editFormData.price}
          onChange={handleEditFormChange}
        ></OutlinedInput>
      </td>
      <td>
        <IconButton color='primary' aria-label='upload picture' component='label'>
          <input hidden accept='image/*' type='file' />
          <DriveFolderUploadIcon fontSize='large' />
        </IconButton>
      </td>
      <td>
        <button type="submit">save</button>
      </td>
    </tr>
  )
}
export default EditableRow
