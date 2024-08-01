// src/App.js

import FMCSATable from './componEnts/FMCSATable';
import  './App.css'
import { QueryClient, QueryClientProvider } from 'react-query';
function App() {
  const queryClient = new QueryClient()


  return (
    <QueryClientProvider client={queryClient}>

    <div className="App">
      <h1 className="text-2xl font-bold text-center my-4">FMCSA Viewer</h1>
      <FMCSATable/>
    </div>
    </QueryClientProvider>

  );
}

export default App;
