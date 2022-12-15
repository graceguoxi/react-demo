import { Box } from '@mui/system'
import UploadIcon from '@mui/icons-material/Upload'
import * as XLSX from 'xlsx'
import { Button, IconButton } from '@mui/material'

const ImportExcel = ({ products, setProducts, setMessage }) => {
  const onImport = (e) => {
    const uploadFile = e.target.files[0]
    const fileReader = new FileReader()

    fileReader.readAsArrayBuffer(uploadFile)
    fileReader.onload = (e) => {
      const bufferArray = e.target.result
      const workbook = XLSX.read(bufferArray, { type: 'buffer' })
      const data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 })
      const SliceRows = data.slice(1).map((r) =>
        r.reduce((acc, x, i) => {
          acc[data[0][i]] = x
          return acc
        }, {})
      )
        console.log(SliceRows)

      setProducts(
        SliceRows.map((pro) => pro),
        ...products
      )
      setMessage('import-success')
    }
  }

  return (
    <Button
      component='label'
      color='primary'
      sx={{
        display: 'flex',
        ml: 2
      }}
    >
      <input
        hidden
        // accept=''
        type='file'
        onChange={(e) => {
          onImport(e)
        }}
      />
      <UploadIcon />
    </Button>
  )
}

export default ImportExcel
