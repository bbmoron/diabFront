import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Index from './Components/Index';
import DocReg from './Components/DocReg';
import Panel from './Components/Panel';
import LogOut from './Components/LogOut';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Index />
        </Route>
        <Route path="/panel" exact>
          <Panel />
        </Route>
        <Route path="/exit" exact>
          <LogOut />
        </Route>
        <Route path="/docreg" exact>
          <DocReg />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
