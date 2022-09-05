import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderTable from '../components/OrderTable';
import { useReadModel } from '../components/SystemContext';

import { dataLoaded as ordersViewDataLoaded } from '../state/ordersView.slice';

const OrdersView = () => {
  const dispatch = useDispatch();
  const dataLoaded = useCallback(
    data => {
      dispatch(ordersViewDataLoaded(data));
    },
    [dispatch]
  );

  const { data, loadRequired } = useSelector(({ ordersView }) => ordersView);

  // TODO, lab3 task: add code to use the read model.
  // Check out how this is done in CustomersView.jsx
  // and use the same approach - everything is prepared,
  // there are only two instructions missing.

  return <OrderTable data={data} />;
};

export default React.memo(OrdersView);
