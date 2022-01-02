// Import Main Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

// Import Pages
import AllCoins from './pages/All Coins/AllCoins';
import CoinDetail from './pages/Coin Detail/CoinDetail';
import ExchangeDetail from './pages/Exchange Detail/ExchangeDetail';
import AllExchanges from './pages/All Exchanges/AllExchanges';
import About from './pages/About/About';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={ AllCoins } />
          <Route exact path="/about" component={ About } />
          <Route exact path="/exchanges" component={ AllExchanges } />
          <Route exact path="/exchange/:slug" component={ ExchangeDetail } />        
          <Route exact path="/coin/:slug" component={ CoinDetail } />        
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
