import axios from "axios"
import { useEffect, useState } from "react"

const ProductPage = () => {
  const[products, setProducts] = useState([])

  useEffect(() => {
    axios.get('https://app.spiritx.co.nz/api/products')
    .then(res => setProducts(res.data))
    .catch(err => console.log(err))
  }, [])

  useEffect(() => console.log(products))

  return (
    <div>
      ProductPage
      
      { products.map(product => {
        return( 
          <div>
            <p>{product.title}</p>
            <p>{product.price}</p>
          </div>
        )
        })
      }
      
    </div>
  )
}
export default ProductPage