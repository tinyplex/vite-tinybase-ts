import './index.css';
import { createStore, ValueOrUndefined } from 'tinybase';

// Convenience function for attaching an action to a button
const onClick = (id: string, onClick: () => void) =>
  document.getElementById(id)!.addEventListener('click', onClick);

// Convenience function for writing out pretty JSON into an element
const updateJson = (id: string, content: any) =>
  (document.getElementById(id)!.innerText = JSON.stringify(content, null, 2));

// Convenience function for generating a random integer
const getRandom = (max = 100) => Math.floor(Math.random() * max);

addEventListener('load', () => {
  // Create the TinyBase Store
  const store = createStore();

  // Attach events to the buttons to mutate the data in the TinyBase Store
  onClick('countButton', () =>
    store.setValue(
      'counter',
      (value: ValueOrUndefined) => ((value ?? 0) as number) + 1
    )
  );
  onClick('randomButton', () => store.setValue('random', getRandom()));
  onClick('addPetButton', () =>
    store.addRow('pets', {
      name: ['fido', 'felix', 'bubbles', 'lowly', 'polly'][getRandom(5)],
      species: store.getRowIds('species')[getRandom(5)],
    })
  );

  // Bind listeners to all Values and Tables in the Store to print the content
  store.addValuesListener(() => updateJson('valuesJson', store.getValues()));
  store.addTablesListener(() => updateJson('tablesJson', store.getTables()));

  // Initialize the Store's data
  store
    .setValue('counter', 0)
    .setRow('pets', '0', { name: 'fido', species: 'dog' })
    .setTable('species', {
      dog: { price: 5 },
      cat: { price: 4 },
      fish: { price: 2 },
      worm: { price: 1 },
      parrot: { price: 3 },
    });
});
