import React from 'react';
import ReactDOM from 'react-dom/client';
/*import App from './App.jsx';
import { InventoryProvider } from './context/InventoryContext.jsx';
*/
import './assets/css/styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <InventoryProvider> */}
      <App />
    {/* </InventoryProvider> */}
  </React.StrictMode>
);