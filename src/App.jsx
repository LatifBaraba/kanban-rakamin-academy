import { useState } from 'react'
import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            {/* <Provider store={store}> */}
            <BrowserRouter>
                <div className='App'></div>
            </BrowserRouter>
            {/* </Provider> */}
        </QueryClientProvider>
    )
}

export default App
