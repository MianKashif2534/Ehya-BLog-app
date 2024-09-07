import './App.css';
import ArticlesDetails from './pages/articleDetails/ArticlesDetails';
import Homepage from './pages/home/Homepage'
import { Route , Routes } from 'react-router-dom';
function App() {
  return (
    <div className="font-opensans">
    <Routes>
      <Route index path='/' element={<Homepage/>}/>
      <Route  path='/blog/:id' element={<ArticlesDetails/>}/>
    </Routes>
    </div>
  );
} 

export default App;
