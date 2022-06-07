<script>
  import { v4 as uuid } from 'uuid';
  import Button from '$lib/Button.svelte';
  import CustomerTable from '$lib/CustomerTable.svelte';
</script>

<CustomerTable data={[]} />
<Button kind="separate" text="New Customer" target={`/customer/${uuid()}`} />
