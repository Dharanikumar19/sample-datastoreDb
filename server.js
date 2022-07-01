const express = require('express');
const crypto = require('crypto');

const app = express();
app.enable('trust proxy');

const {Datastore} = require('@google-cloud/datastore');


const datastore = new Datastore({
    projectId: 'teleport-gcp-playground',
});


async function quickstart() {
  // The kind for the new entity
  const kind = 'Task';

  // The name/ID for the new entity
  const name = 'sampletask1';

  // The Cloud Datastore key for the new entity
  const taskKey = datastore.key([kind, name]);

  // Prepares the new entity
  const task = {
    key: taskKey,
    data: {
      description: 'Buy milk',
    },
  };

  // Saves the entity
  await datastore.save(task);
  console.log(`Saved ${task.key.name}: ${task.data.description}`);
}
quickstart();

const PORT = parseInt(parseInt(process.env.PORT)) || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});