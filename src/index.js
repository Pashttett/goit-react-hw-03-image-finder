import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; 
import  App  from 'components/App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
<BrowserRouter basename="/goit-react-hw-03-image-finder">
  <App />
</BrowserRouter>
);
