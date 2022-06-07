<script>
  import Button from './Button.svelte';
  import TextInput from './TextInput.svelte';
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<form>
  <div>
    <div class="my-4 flex">
      <label class="mr-4">
        Name
        <TextInput name="name" autoFocus />
      </label>
      <label>
        Location
        <TextInput name="location" />
      </label>
    </div>
    <div>
      <div>
        <Button kind="separate" text="Save" />
        <Button kind="separate" text="Cancel" target="/customers" />
      </div>
    </div>
  </div>
</form>
