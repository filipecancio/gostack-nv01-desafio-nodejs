const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");

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
  if(!isUuid(id)){
    return response.status(400).send();
  }
  const index = repositories.findIndex(i =>  i.id == id );

  if(index<0){
    return response.status(400).send();
  }
  
  let { title , url , techs, likes } = request.body;
  repositories[index].title = title ? title: repositories[index].title;
  repositories[index].url = url ? url: repositories[index].url;
  repositories[index].techs = techs ? techs: repositories[index].techs;
  likes = repositories[index].likes;

  return response.json({id, title , url , techs, likes });
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  if(!isUuid(id)){
    return response.status(400).send();
  }

  const index = repositories.findIndex(i =>  i.id === id );

  if(index < 0){
    return response.status(400).send();
  }
    repositories.splice(index,1);
    return response.status(204).send();


  
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  if(!isUuid(id)){
    return response.status(400).send();
  }
  const index = repositories.findIndex(i =>  i.id == id );

  if(index<0){
    return response.status(400).send();
  }

  repositories[index].likes ++;
  return response.json(repositories[index]);
});

module.exports = app;
