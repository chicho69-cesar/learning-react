import { Switch, Route } from 'wouter'
import Home from '../screens/Home'

export default function RootRouter() {
  return (
    <Switch>
      <Route
        path='/'
        component={Home}
      />
    </Switch>
  )
}
