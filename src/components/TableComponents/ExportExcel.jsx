import { Button, IconButton } from '@mui/material'
import { Box } from '@mui/system'
import DownloadIcon from '@mui/icons-material/Download'
import * as XLSX from 'xlsx'


const ExportExcel = ({ Products , setMessage }) => {
  const handleOnExport = products => {
    
  }

  return (
    <Button
      sx={{
        display: 'flex'
      }}
    >
      {/* <p>Export Excel</p> */}
      <IconButton sx={{ px: 1.5 }} onClick={() => handleOnExport(Products)}>
        <DownloadIcon />
      </IconButton>
    </Button>
  )
}

export default ExportExcel