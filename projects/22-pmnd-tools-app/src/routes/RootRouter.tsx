import { Switch, Route } from 'wouter'

import Home from '../screens/Home'
import Jotai from '../screens/Jotai'
import ReactSpring from '../screens/ReactSpring'
import Valtio from '../screens/Valtio'
import Zustand from '../screens/Zustand'
import TextLengthExample from '../modules/jotai/examples/TextLength'
import TodosExample from '../modules/jotai/examples/Todos'
import HackerNewsExample from '../modules/jotai/examples/HackerNews'

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

      <Route
        path='/jotai/text-length'
        component={TextLengthExample}
      />

      <Route
        path='/jotai/todos'
        component={TodosExample}
      />

      <Route
        path='/jotai/hacker-news'
        component={HackerNewsExample}
      />
    </Switch>
  )
}
