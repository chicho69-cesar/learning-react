import { css } from '../../styled-system/css'
import ExamplesList from '../modules/jotai/ExamplesList'

export default function Jotai() {
  return (
    <div className={container}>
      <ExamplesList />
    </div>
  )
}

const container = css({
  minH: '100vh',
  backgroundColor: 'slate.600',
  display: 'grid',
  placeContent: 'center'
})
