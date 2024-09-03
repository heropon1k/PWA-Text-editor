import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate jatebase already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate jatebase created');
    },
  });

// Exports a function to POST to the jatebase.
export const putDb = async (content) => {
  console.log("Put to the jatebase");

  // Creates a connection to the jate jatebase and version.
  const jateDb = await openDB("jate", 1);

  // Creates a new transaction and specifies the jatebase and jate privileges.
  const tx = jateDb.transaction("jate", "readwrite");

  // Opens up the desired object store.
  const store = tx.objectStore("jate");

  // Uses the .put() method on the store and passes in the content.
  const request = store.put({ id: 1, value: content });

  // Gets confirmation of the request.
  const result = await request;

  if (result !== undefined) {
    console.log("Data saved to the jatebase, ID:", result);

    // Fetch the newly inserted jate to confirm it was saved correctly.
    const savedData = await store.get(result);
    console.log("Saved jate:", savedData.value);
    return savedData.value;
  } else {
    console.log(
      "The cat ran away with the note! It wasn't saved to the jatebase!"
    );
    return null;
  }
};

// Exports a function to get the jatebase.
export const getDb = async () => {
  console.log("Get all notes from the jatebase");

  const jateDb = await openDB("jate", 1);

  const tx = jateDb.transaction("jate", "readonly");

  // Opens up the desired object store.
  const store = tx.objectStore("jate");

  const request = store.get(1);

  const result = await request;
  result
    ? console.log("Notes retrieved from jatebase:", result.value)
    : console.log("No notes found in jatebase! The cat must have stolen them!");
  return result?.value;
};

export const deleteDb = async () => {
  console.log("Uh oh! The cat ran away with your notes!");
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const request = store.delete(1);
  await request;

  console.log("Note has been removed from the jatebase");
  return true;
};

// Starts jatebase
initdb();