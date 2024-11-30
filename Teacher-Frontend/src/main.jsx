import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './Redux/store.jsx'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'
import {AuthProvider} from './components/Auth/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  
)
