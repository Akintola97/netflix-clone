
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import { AuthContextProvider } from "./context/AuthContext";
import LoginPage from './components/LoginPage'
import SignUp from "./components/SignUp";
import Account from './components/Account';
import Nav from "./components/Nav";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
     <AuthContextProvider>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<LoginPage />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/Account' element={<Account />} />
      </Routes>
      </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
