
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import { AuthContextProvider } from "./context/AuthContext";
import LoginPage from './Pages/LoginPage'
import SignUp from "./Pages/SignUp";
import Account from './components/Account';
import Nav from "./components/Nav";
import ProtectedRoute from "./components/ProtectedRoute";



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
        <Route 
        path='/Account'
         element={
          <ProtectedRoute>
          <Account />
          </ProtectedRoute>
          } 
          />
      </Routes>
      </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
