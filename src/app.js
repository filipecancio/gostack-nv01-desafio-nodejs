const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title , url , techs } = request.body;
  const project = {id:uuid(),title , url , techs, likes: 0};
  repositories.push(project);
  return response.json(project);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const index = repositories.findIndex(i =>  i.id == id );

  if(index<0){
    response.status(400);
  }
  
  let { title , url , techs } = request.body;
  repositories[index].title = title ? title: repositories[index].title;
  repositories[index].url = url ? url: repositories[index].url;
  repositories[index].techs = techs ? techs: repositories[index].techs;


  return response.json({ title , url , techs });
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const index = repositories.findIndex(i =>  i.id == id );

  if(index<0){
    response.status(400);
  }

  const project = repositories.splice(index,1);
  return response.status(204);
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  const index = repositories.findIndex(i =>  i.id == id );

  if(index<0){
    response.status(400);
  }

  repositories[index].likes += 1;
  return response.json(repositories[index]);
});

module.exports = app;
