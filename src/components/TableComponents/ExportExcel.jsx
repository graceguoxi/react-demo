import { Button, IconButton } from '@mui/material'
import { Box } from '@mui/system'
import DownloadIcon from '@mui/icons-material/Download'
import * as XLSX from 'xlsx'


const ExportExcel = ({ Products , setMessage }) => {
  const handleOnExport = products => {
    const workbook = XLSX.utils.book_new()
    const workSheet = XLSX.utils.json_to_sheet(products)

    XLSX.utils.book_append_sheet(workbook, workSheet, "Products")

    XLSX.writeFile(workbook, "luxdream.xlsx")
    
  }

  return (
    <IconButton
      sx={{
        display: 'flex'
      }}
    >
      {/* <p>Export Excel</p> */}
      <IconButton sx={{ px: 1.5 }} onClick={() => handleOnExport(Products)}>
        <DownloadIcon />
      </IconButton>
    </IconButton>
  )
}

export default ExportExcel