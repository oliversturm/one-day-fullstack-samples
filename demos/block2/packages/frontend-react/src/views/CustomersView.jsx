import React from 'react';
import Button from '../components/Button';
import CustomerTable from '../components/CustomerTable';

const CustomersView = () => {
  return (
    <div>
      <CustomerTable data={[]} />
      <Button kind="separate" text="New Customer" />
    </div>
  );
};

export default React.memo(CustomersView);
