import dotenv from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import New from './New';
import { BrowserRouter } from 'react-router-dom';

dotenv.config(); //keep keys and values safe in '.env'

ReactDOM.render(<BrowserRouter><New /></BrowserRouter>, document.getElementById('app'));

module.hot.accept();
