import React,{useState}from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './components/Main';
import Create from './components/create/create';
import Checkin from './components/checkin/checkin';
import Home from './components/home/home';
import Detail from './components/detail/detail';
import FillOut from './components/home/fillOut';
import GetPast from './components/home/getPast';
import Css from './components/css/css';



function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path={`/`} element={<Main/>} />
      <Route path={`/create`} element={<Create />} />
      <Route path={`/checkin`} element={<Checkin />} />
      <Route path={`/checkin/error`} element={<Checkin err={true}/>} />
      <Route path={`/home/:id/user/:userId`} element={<Home />} />
      <Route path={`/css`} element={<Css/>}/>
      <Route path={`/home/:id/user/:name/:userId/fillOut`} element={<FillOut />} />
      
    </Routes>
    </BrowserRouter>
  );
}

const rootElement = document.getElementById('app');
const root = ReactDOM.createRoot(rootElement);
root.render(
  <App />
);
