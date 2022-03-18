import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { PhoneProvider } from './context/PhoneContext'
import { NotebookProvider } from './context/NotebookContext'
import { AccessorieProvider } from './context/AccessorieContext'
import { OrderingProvider } from './context/OrderingContext'
import { LangProvider } from './context/LangContext'
import { TestProvider } from './context/TestContext'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <TestProvider>
        <LangProvider>
          <NotebookProvider>
            <PhoneProvider>
              <AccessorieProvider>
                <OrderingProvider>
                  <App />
                </OrderingProvider>
              </AccessorieProvider>
            </PhoneProvider>
          </NotebookProvider>
        </LangProvider>
      </TestProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
