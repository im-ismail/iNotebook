import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoteState from './context/NoteState';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Error from './components/Error';
import Feature from './components/Feature';
import Alert from './components/Alert';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import Identify from './components/Identify';
import ResetPassword from './components/ResetPassword';
function App() {

  // This is for showing alert
  const [alert, setAlert] = useState({});
  // Function to be called for setting alert property //
  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert({})
    }, 2000);
  };
  // Function for showing alert ends //

  return (
    <BrowserRouter>
      <NoteState showAlert={showAlert} >
        <Navbar />
        <Alert alert={alert} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<Error />} />
          <Route path='/feature' element={<Feature />} />
          <Route path='/login' element={<Login showAlert={showAlert} />} />
          <Route path='/register' element={<Register showAlert={showAlert} />} />
          <Route path='/logout' element={<Logout showAlert={showAlert} />} />
          <Route path='/identify' element={<Identify showAlert={showAlert} />} />
          <Route path='/reset-password' element={<ResetPassword showAlert={showAlert} />} />
        </Routes>
      </NoteState>
    </BrowserRouter>
  );
}

export default App;
