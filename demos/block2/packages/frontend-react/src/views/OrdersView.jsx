import React from 'react';
import OrderTable from '../components/OrderTable';

const OrdersView = () => {
  return <OrderTable data={[]} />;
};

export default React.memo(OrdersView);
