import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header'
import Homepage from './Pages/Homepage'
import Coinpage from './Pages/Coinpage';
import Footer from './Components/Footer';

function App() {

  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/coins/:id" element={<Coinpage/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
