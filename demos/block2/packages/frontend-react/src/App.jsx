import React from 'react';
import AppFrame from './components/AppFrame';
import CustomersView from './views/CustomersView';
import AboutView from './views/AboutView';

const App = () => {
  return (
    <div className="container mx-auto border-solid border-2 rounded-lg my-4 p-4 shadow-lg">
      <AppFrame>
        <div className="border-solid border mt-4 rounded p-2">
          {/* The React app does not route yet, since that feature
              will be based on Redux later. But for testing
              purposes, views can be swapped here manually. */}
          <CustomersView />
          {/* <AboutView /> */}
        </div>
      </AppFrame>
    </div>
  );
};

export default App;
