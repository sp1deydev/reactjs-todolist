import { Redirect, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import TodoFeature from './features/TodoFeature';

function App() {
  return (
    <div className="App">
    <Switch>
      <Redirect from='/' to='/todos' exact/>
      <Route path='/todos' component={TodoFeature}/>
    </Switch>
    </div>
  );
}

export default App;
