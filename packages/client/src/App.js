import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './views/Home';
import Operations from './views/Operations';
import NotFounded from './views/NotFounded';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/operations">
            <Operations />
          </Route>
          <Route path="/*">
            <NotFounded />
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
