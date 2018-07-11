import dotenv from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

dotenv.config(); //keep keys and values safe in '.env'

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('app'));

module.hot.accept();
