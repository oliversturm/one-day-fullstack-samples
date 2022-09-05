<script>
  import OrderTable from '../lib/OrderTable.svelte';

  import { readModelStore } from '../lib/readModelStore';

  const endpointName = 'orders';
  const readModelEndpoint = 'http://127.0.0.1:3005'; // orders

  // TODO, lab3 task: add code to retrieve the read
  // model store. Check out how this is done in
  // customers.svelte and use the same approach -
  // everything is prepared, just one call is missing.
  const store = null;
</script>

<OrderTable {store} />
