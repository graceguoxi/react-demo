
import UploadIcon from '@mui/icons-material/Upload'
import * as XLSX from 'xlsx'
import { IconButton } from '@mui/material'
import { useState } from 'react'


const ImportExcel = ({
  products,
  setProducts,
  setMessage
}) => { 

  const handleRequestImport = (e) => {
    const uploadedFile = e.target.files[0]
    const fileReader = new FileReader()

    fileReader.readAsArrayBuffer(uploadedFile)
    fileReader.onload = (e) => {
      const bufferArray = e.target.result
      const workbook = XLSX.read(bufferArray, {
        type: 'buffer'
      })
      const data = XLSX.utils.sheet_to_json(
        workbook.Sheets[workbook.SheetNames[0]],
        { header: 1 }
      )
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
      // setMessage('import-success')
    }
  }

  return (
    <IconButton
      component='label'
      color='primary'
      sx={{
        display: 'flex',
        ml: 2
      }}
    >
      <input
        hidden
        type='file'
        onChange={(e) => {
          handleRequestImport(e)
        }}
      />
      <UploadIcon />
    </IconButton>
  )
}

export default ImportExcel
