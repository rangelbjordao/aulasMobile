//Importando a lib Express
//Framework muito utilizado para criar servidores e API no Node
//Facilita a criacao de rotas e tratamento de requisições HTTP
const express = require("express");

//Importando a lib json web token (JWT)
const jwt = require("jsonwebtoken");

//Importando a lib CORS
//Permite que aplicacoes de outros dominios (nosso ap React Native)
//Acesse a Api sem bloqueios
const cors = require("cors");

//Cria uma aplicação Express
//Iniciando nosso Servidor backend
const app = express();

//Permitir que o servidor entenda requisições de dados em JSON
//Ex: Quando o cliente envia e-mail e senha no login
app.use(express.json());
//Habilia o CORS para permitir requisições externas
//Sem o CORS configurado, apps com web e mobile poderiam ser bloqueados ao
//Acessar a api
app.use(cors());

//Chave Secreta usada para gerar e validar os tokens JWT
//Funciona com assinatura digital do token
//Geralmente fica em um arquivo ou variavel de ambiente
const SECRET = "segredo_jwt_aula";

//ROTA DE LOGIN
//Essa rota vai receber email e senha, etando tudo correto é gerado JWT
//e retornado para nosso APP
app.post("/login", (req, res) => {
  console.log("Requisicoes de login recebida");

  const { email, senha } = req.body;

  // Simulando usuario cadastrado no sistema
  if (email === "admin@email.com" && senha === "123456") {
    const token = jwt.sign(
      // Payload -> Dados que serao armazenados dentro do token
      // Armazenando somente o email, nesse exemplo
      { email: email },
      // Chave secreta para assinar o token
      // Servidor usara essa mesma chave depois para validar o token
      SECRET,

      // Configuracoes adicionais
      {
        expiresIn: "1h", // Token expira em uma hora
      }
    );
    // Enviado o token para o cliente
    // o cliente guarda o token(Async Storage)
    // Envia-lo nas proximas requisicoes protejidas
    return res.json({ token });
  }

  // Se o email ou senha tiverem incorretos
  // Retornamos erro 401(nao autorizado)
  return res.status(401).json({ error: "Credenciais invalidas" });
});

// Rota Protejida

// Essa rota somente sera acessada se o cliente enviar um token JWT valido

app.get("/perfil", (req, res) => {
  // Pegamos o Header Authorization da requisicao
  // Header contem o token JWT enviado pelo cliente
  // Authorization: Bearer TOKEN
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    // Retornamos erro 401(nao autorizado)
    return res.status(401).json({ error: "Credenciais invalidas" });
  }

  // O header vem no Bearer TOKEN
  // Usamos a funcao split para separar pelo espaco
  // Em seguida pegamos somente o TOKEN
  const token = authHeader.split(" ")[1];

  try {
    // Verificar se o token é valido
    const decoded = jwt.verify(token, SECRET);

    // Mostra no console o conteudo do token
    console.log("Token validado: ", decoded);

    // Se o token for valido, vamos liberar o acesso
    return res.json({
      message: "Acesso permitido",
      // decoded contem os dados que estavam dentro do token
      user: decoded,
    });
  } catch {
    // Retornamos erro 401(token invalido)
    return res.status(401).json({ error: "Token invalido" });
  }
});

// Iniciando Servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
