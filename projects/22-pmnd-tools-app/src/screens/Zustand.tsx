import ProductsCRUD from '../modules/zustand/ProductsCRUD'
import { css } from '../../styled-system/css'

export default function Zustand() {
  return (
    <div className={container}>
      <ProductsCRUD />
    </div>
  )
}

const container = css({
  minH: '100vh',
  backgroundColor: 'slate.600',
  display: 'flex',
  placeContent: 'center'
})
