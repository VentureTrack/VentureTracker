// Import Main Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

// Import Pages
import AllCoins from './pages/All Coins/AllCoins';
import CoinDetail from './pages/Coin Detail/CoinDetail';
import ExchangeDetail from './pages/Exchange Detail/ExchangeDetail';
import AllExchanges from './pages/All Exchanges/AllExchanges';
import About from './pages/About/About';
import NotFound from './pages/Not Found/NotFound';
import PrivacyPolicy from './pages/Privacy Policy/PrivacyPolicy';
import TermsOfService from './pages/Terms Of Service/TermsOfService';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          {/* Routes */}
          <Route exact path="/" component={ AllCoins } />
          <Route exact path="/about" component={ About } />
          <Route exact path="/exchanges" component={ AllExchanges } />
          <Route exact path="/exchange/:slug" component={ ExchangeDetail } />        
          <Route exact path="/coin/:slug" component={ CoinDetail } />
          <Route exact path="/privacy-policy" component={ PrivacyPolicy } />
          <Route exact path="/terms-of-service" component={ TermsOfService } />

          {/* 404 Page */}
          <Route path="*" component={ NotFound } />        
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
