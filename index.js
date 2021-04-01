const express = require("express");
const cors = require("cors")
const PORT = 3000;

const server = express();

server.use(cors());

var camisas = [
  { nome: "Camisa 0", tamanho: "M", preco: 100 },
  { nome: "Camisa 1", tamanho: "M", preco: 110 },
  { nome: "Camisa 2", tamanho: "M", preco: 120 },
];

server.use(express.json());

//read
//Lista todas as camisas
server.get("/pegarTodasCamisas", (req, res) => {
  return res.json(camisas);
});

//read
server.get("/pegarCamisaPeloNome/:nome", (req, res) => {
  const nome = req.params.nome;
  if (!nome) return res.send("Informe a camisa");

  const camisa = camisas.filter((el) => el.nome === nome)[0];

  return res.json(camisa);
});

//create
//Adiciona uma nova camisa
server.put("/adicionarCamisa", (req, res) => {
  const { nome, tamanho, preco } = req.body;

  const camisa = { nome, tamanho, preco };

  camisas.push(camisa);
  return res.status(201).send("Camisa criada!");
});

//delete
//deleta uma camisa pelo nome
server.delete("/deletarCamisaPeloNome", (req, res) => {
  const { nome } = req.body;

  if (!nome) return res.send("Informe a camisa");

  const novaListaCamisas = camisas.filter((el) => el.nome !== nome);
  camisas = novaListaCamisas;

  return res.send(camisas);
});

//update
//modifica uma camisa pelo nome
server.put("/modificarCamisaPeloNome", (req, res) => {
  const { nome, tamanho, preco } = req.body;

  const novaListaCamisas = camisas.map((el) => {
    if(el.nome === nome){
      return {
        nome: nome || el.nome,
        tamanho: tamanho || el.tamanho,
        preco: preco || el.preco,
      };
    } else {
      return el
    }
    
  });
  camisas = novaListaCamisas;

  return res.status(201).send(camisas);
});

server.listen(PORT, () => console.log(`servidor online na porta ${PORT}`));
