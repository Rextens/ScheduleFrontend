import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoginPage from './components/LoginPage';
import PlanPage from './components/PlanPage';
import Schedule from './components/Schedule/Schedule';

function App() {
  return (
    <Router>
      <Route exact path="/" component={LoginPage}/>
      <Route exact path="/plan" component={PlanPage}/>
      <Route exact path="/schedule" component={Schedule}/>
    </Router>
  );
}


export default App;
