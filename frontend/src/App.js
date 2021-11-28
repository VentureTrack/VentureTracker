import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Domains from './pages/domains';
import Registrars from './pages/registrars';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={ Domains } />
          <Route exact path="/registrar" component={ Registrars } />
          
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
