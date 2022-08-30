// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import UserPhotos from "./components/UserPhotos/UserPhotos";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-photos/:userId" element={<UserPhotos />} />
      </Routes>
    </div>
  );
}

export default App;
