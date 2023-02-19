import { IconButton } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import * as XLSX from 'xlsx'


const ExportExcel = ({ Products , setMessage }) => {
  const handleOnExport = products => {
    const workbook = XLSX.utils.book_new()
    const workSheet = XLSX.utils.json_to_sheet(products)

    XLSX.utils.book_append_sheet(workbook, workSheet, "Products")

    XLSX.writeFile(workbook, "MyExcel.xlsx")
    
  }

  return (
    <div
      sx={{
        display: 'flex'
      }}
    >
      
      <IconButton sx={{ px: 1.5 }} onClick={() => handleOnExport(Products)} color='primary'>
        <DownloadIcon />
      </IconButton>
    </div>
  )
}

export default ExportExcel