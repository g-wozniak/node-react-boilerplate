import { createStore, combineReducers, applyMiddleware, compose, Store } from 'redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import * as ReactDOM from 'react-dom'
import * as React from 'react'
import thunk from 'redux-thunk'

import { Reducers } from './_intf/Common'

import r_app from './redux/app/reducer'
import RouteWrapper from './pages/route'

const getReduxStore = (): Store => {
  const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose
  const reducers: Reducers = {
    r_app
  }
  return createStore(combineReducers(reducers), composeEnhancers(applyMiddleware(thunk)))
}

class App extends React.Component<unknown, never> {

  public render(): JSX.Element {
    return (
      <Provider store={getReduxStore()}>
        <BrowserRouter>
          <Switch>
            <Route
              path={'/'}
              exact={true}
              component={() => 
                <RouteWrapper
                  name="home"
                  path="/"
                  component={() => <h1>Hello World! <img src="/assets/ico_yes.png" /></h1>}
                />
              }
            />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app') as HTMLElement
)