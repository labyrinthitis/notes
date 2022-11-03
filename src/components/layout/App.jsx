import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';

const App = () => {
  const [lightMode, setLightMode] = useState(false);

  return (
    <>
      <div className={lightMode ? 'light-mode' : 'dark-mode'}>
        <Routes>
          <Route path='/' element=
            {
              <Home
                handleBgLightMode={lightMode}
                handleToggleLightMode={setLightMode}
              />
            }
          />
        </Routes>
      </div>
    </>
  )
}

export default App;