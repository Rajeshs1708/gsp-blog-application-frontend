import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Content from './pages/Content';
import './App.css';
import Navbar from './components/Navbar';
import FileUpload from './pages/FileUpload';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/content" element={<Content />} />
          <Route path="/file-upload" element={<FileUpload />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;