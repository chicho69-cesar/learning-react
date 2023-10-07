import { css } from '../../styled-system/css'

import AnimatingAuto from '../modules/react-spring/components/AnimatingAuto'
import AsyncCSSVariables from '../modules/react-spring/components/AsyncCSSVariables'
import BasicTrail from '../modules/react-spring/components/BasicTrail'
import BasicTransition from '../modules/react-spring/components/BasicTransition'
import CSSGradients from '../modules/react-spring/components/CSSGradients'
import CSSKeyframes from '../modules/react-spring/components/CSSKeyframes'
import Card from '../modules/react-spring/components/Card'
import CardStack from '../modules/react-spring/components/CardStack'
import ChainingTransition from '../modules/react-spring/components/ChainingTransition'
import DraggableList from '../modules/react-spring/components/DraggableList'
import FlipCard from '../modules/react-spring/components/FlipCard'
import FloatingButton from '../modules/react-spring/components/FloatingButton'
import MasonryGrid from '../modules/react-spring/components/MasonryGrid'
import MultistageTransition from '../modules/react-spring/components/MultistageTransition'
import Wordle from '../modules/react-spring/components/Wordle'

export default function ReactSpring() {
  return (
    <div className={container}>
      <AnimatingAuto />
      <AsyncCSSVariables />
      <BasicTrail />
      <BasicTransition />
      <Card />
      <CardStack />
      <ChainingTransition />
      <CSSGradients />
      <CSSKeyframes />
      <DraggableList items={'Lorem ipsum dolor sit'.split(' ')} />
      <FlipCard />
      <FloatingButton />
      <MasonryGrid />
      <MultistageTransition />
      <Wordle />
    </div>
  )
}

const container = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridAutoRows: 'minmax(100vh, auto)',
})
