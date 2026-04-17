import * as SQLite from "expo-sqlite";

//Abre ou cria o banco de dados
const db = SQLite.openDatabaseSync("notas.db");

//Criado tabelas notas caso nao exista
db.execSync(`
    CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT,
        createdAt TEXT NOT NUL
);
`);

//Funcao para ler todas as notas do banco de dados
export function getNotes() {
  //Retorna todas as notas em ordem descrescente(nota recente no topo)
  return db.getAllSync("SELECT * FROM notes ORDER BY id DESC");
}

//Funcao para adicionar uma nova nota
export function addNote(title: string, content: string) {
  const createdAt = new Date().toISOString(); //Pega data/hora atual
  db.runSync("INSERT INTO notes (title, content, createdAt) VALUES (?, ?, ?)", [
    title,
    content,
    createdAt,
  ]);
}

//Funcao de atualizar nota(ja existente)
export function updateNote(id: number, title: string, content: string) {}
