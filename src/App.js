import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import LoginPage from './components/LoginPage';
import PlanPage from './components/PlanPage';

function App() {
  return (
    <Router>
      <Route exact path="/" component={LoginPage}/>
      <Route exact path="/plan" component={PlanPage}/>
    </Router>
  );
}


export default App;
