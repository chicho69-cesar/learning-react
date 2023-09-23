import { Switch, Route } from 'wouter'

import Home from '../screens/Home'
import Jotai from '../screens/Jotai'
import ReactSpring from '../screens/ReactSpring'
import Valtio from '../screens/Valtio'
import Zustand from '../screens/Zustand'

export default function RootRouter() {
  return (
    <Switch>
      <Route
        path='/'
        component={Home}
      />

      <Route
        path='/jotai'
        component={Jotai}
      />

      <Route
        path='/valtio'
        component={Valtio}
      />

      <Route
        path='/zustand'
        component={Zustand}
      />

      <Route
        path='/react-spring'
        component={ReactSpring}
      />
    </Switch>
  )
}
