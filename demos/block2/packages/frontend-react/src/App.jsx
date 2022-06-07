import React from 'react';
import AppFrame from './components/AppFrame';
import CustomersView from './views/CustomersView';

const App = () => {
  return (
    <div className="container mx-auto border-solid border-2 rounded-lg my-4 p-4 shadow-lg">
      <AppFrame>
        <div>
          <CustomersView />
        </div>
      </AppFrame>
    </div>
  );
};

export default App;
