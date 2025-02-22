const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  return res.json(repositories);
});

app.post("/repositories", (req, res) => {
  const {title, url, techs} = req.body;

  const repository = {id: uuid(), title, url, techs, likes: 0,};

  repositories.push(repository);

    return res.json(repository);
});

app.put("/repositories/:id", (req, res) => {
  const {title, url, techs} = req.body;
  const {id} = req.params;

  const findRepositoryIndex = repositories.findIndex(repository => repository.id == id);

    if(findRepositoryIndex == -1) {
        return res.status(400).json({ error: 'Repository not found'});
    }

    const repository = { 
        id,
        title,
        url,
        techs,
        likes: repositories[findRepositoryIndex].likes,
    };

    repositories[findRepositoryIndex] = repository;

    return res.json(repository);
});

app.delete("/repositories/:id", (req, res) => {
  const {id} = req.params;

  const findRepositoryIndex = repositories.findIndex(repository => repository.id == id);

    if(findRepositoryIndex == -1) {
        return res.status(400).json({ error: 'Repository not found'});
    }

    repositories.splice(findRepositoryIndex, 1);

    return res.status(204).send();
});

app.post("/repositories/:id/like", (req, res) => {
  const {id} = req.params;

  const findRepositoryIndex = repositories.findIndex(repository => repository.id == id);

    if(findRepositoryIndex == -1) {
        return res.status(400).json({ error: 'Repository not found'});
    }

  repositories[findRepositoryIndex].likes += 1;

    return res.json(repositories[findRepositoryIndex]);
});

module.exports = app;
