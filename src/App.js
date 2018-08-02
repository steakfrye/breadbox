import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import History from './History';
import Main from './Main';
import New from './New';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
          <div className='container'>
            <Switch>
              <Route exactPath='/' component={Main}/>
              <Route path='/recipes' component={History}/>
              <Route path='/new' component={New}/>
            </Switch>
          </div>
        <Footer />
      </div>
    );
  }
}

export default App;
