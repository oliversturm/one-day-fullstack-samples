# One Day Fullstack Workshop -- Demo Block 2

This project state is prepared for you to check out the details of the previous presentation block.

## Instructions

This lab is all about exploration of the basic frontend projects before they will be extended to fit in with the backend in the following step. You can choose to focus on either the React or the Svelte project, or spend time with both and compare the implementations. Below you can find some hints for interesting aspects of both samples.

### React Frontend

Run the project using this command:

```shell
npm run react:dev:block2
```

* `main.jsx` is the entry point with the top-level rendering structure
* `App.jsx` refers to the `AppFrame` with its navigation buttons (currently unused)
* You can swap views manually by editing `App.jsx`.
* The views are components stored in the `views` folder. 
* `components/CustomerTable.jsx` and `components/OrderTable.jsx` are the overview components that will display details of the customer and order data in the system.
* `components/CustomerForm.jsx` and `components/OrderForm.jsx` use *Formik* elements to set up data entry forms
* `components/Button.jsx` uses a basic hook (`useMemo`) to precompute the `className` attribute for the button
* `components/Table.jsx` includes several helper components to format table elements with consistent Tailwind classes. Note the use of `children`.
* `components/TextInput.jsx` contains a similar styled text editor, note the use of the spread operator for the `props`
* `components/icons/RefreshIcon.jsx` is a component that renders SVG content

### Svelte Frontend

Run the project using this command:

```shell
npm run svelte:dev:block2
```

* `src/routes/index.svelte` is the starting page, and `about.svelte` in the same folder is the only other page in the app at this point
* Both are rendered using the `src/routes/__layout.svelte` layout component
* The layout component uses the `<slot />` tag to include the content from the individual routed pages
* `src/lib/Button.svelte` is a button component with a similar implementation to the React one. It uses a Svelte *reactive assignment* for the `buttonClass` (note the `$` label)
* `src/lib/CustomerTable.svelte`, `.../OrderTable.svelte`, `.../CustomerForm.svelte` and `.../OrderForm.svelte` are similar to their React equivalents
* `src/lib/TextInput.svelte` uses `bind:value` for bidirectional data binding of the `value` property. It also uses `on:input` to pass through any `input` events to any event handler on the level of the parent component.
* The components in `src/lib/table` apply consistent Tailwind classes to table elements. They also use `<slot />` to render content passed from the outside.
* `src/lib/icons/RefreshIcon.svelte` is a component that renders SVG content
