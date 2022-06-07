import React from 'react';
import Button from './Button';

const AppFrame = ({ children }) => {
  return (
    <>
      <div className="bg-orange-100 p-2 rounded flex items-center">
        <Button kind="toolbar" text="Customers" />
        <Button kind="toolbar" text="Orders" />
        <Button kind="toolbar" text="About" />
        <div className="ml-auto font-bold">React Frontend</div>
      </div>

      {children}
    </>
  );
};

export default React.memo(AppFrame);
