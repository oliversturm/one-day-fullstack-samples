# One Day Fullstack Demo Block 2 Workshop - Start

....TODO - leave a choice of working with the React or the Svelte app

This project state is prepared for you to check out the details of the previous presentation block.

## Instructions

- Clone the repository to your local machine

```shell
git clone https://github.com/oliversturm/one-day-fullstack-block2-B.git
```

- Navigate to the `frontend` package directory

```shell
cd packages/frontend
```

- Install dependencies

```shell
npm install
```

- Start app

```shell
npm start
```

- Start Storybook

```shell
npm run storybook
```

## Task

The `OrderForm` is incomplete in this state, it lacks the `Save` and `Cancel` buttons you can find in the `CustomerForm`.

- Check out the situation in Storybook
- Add the two missing buttons to the `OrderForm`
- Update the code in `OrderForm.stories.js` so that the functionality of the `Cancel` button can be tested just like for the `CustomerForm`.

The `OrderTable` is equally incomplete, you can see in Storybook that it doesn't display the data passed through from `OrderTable.stories.js`.

- Add the missing elements to the `OrderTable` component to show the data
