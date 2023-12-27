import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import PersistentDrawerLeft from './components/Navbar/Navbar';
import { Profile } from './components/Profile/Profile';
import { Products } from './components/Products/Products';


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
      <div className="App"> 
          <PersistentDrawerLeft/>
          <Routes>
            <Route path='/profile' element={<Profile/>}>
            </Route>
            <Route path='/products' element={<Products/>}>
            </Route>
          </Routes>
          
      </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
