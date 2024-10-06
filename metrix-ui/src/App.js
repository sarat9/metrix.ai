import './App.css';
import * as axiosInterceptor from './helpers/axios-interceptor.js'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import React, { lazy, Suspense } from 'react'
import MetrixForm from './layouts/Metrix/MetrixForm.jsx';
import MetrixList from './layouts/Metrix/MetrixListLayout.jsx';
import MetricDashboard from './layouts/MetricDashboard/MetricDashboard.js';
import Home from './layouts/Home/HomeLayout.jsx';

function App() {
  return (
    <div className="app-root">
      <Router>
      <Suspense fallback={<p>Loading... Waiting for the satellites to align...</p>}>
        <Routes>
          <Route path='/' element={<Home />} >
            <Route path='/dashboard' element={<MetricDashboard />} />
            <Route path='/metrics' element={<MetrixList />} />
            <Route path='/metric' element={<MetrixForm />} />
            <Route path='/metric/:id' element={<MetrixForm />} />
            <Route path='/' element={<MetricDashboard />} />
          </Route>
        </Routes>
        </Suspense>
      </Router>
    </div>

  );
}

export default App;
