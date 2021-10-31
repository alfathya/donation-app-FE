import React from 'react';
import DonationForm from './components/donationForm';
import Thanks from './components/thanks';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom'
import Success from './routes/success'
function App() {

  return (
      
      <div className="min-h-screen">
        <Router>
          <Switch>
            <Route exact path="/" component={DonationForm} />
            <Success exact path="/thanks" component={Thanks} />
          </Switch>
        </Router>
    </div>
    
      
    // </div>
  );
}

export default App;