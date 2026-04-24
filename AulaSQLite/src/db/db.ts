import * as SQLite from "expo-sqlite"

//Abre ou cria o banco de dados local
const db = SQLite.openDatabaseSync("notas.db")

//Criando tabela notes caso não exista
db.execSync(`
    CREATE TABLE IF NOT EXISTS notes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT,
        createdAt TEXT NOT NULL
    );
`)

//Função para ler todas as notas do banco
export function getNotes(){
    //Retorna todas as notas em ordem decrescente(nota recente no topo)
    return db.getAllSync("SELECT * FROM notes ORDER BY id DESC")
}

//Função para adicionar uma nova nota
export function addNote(title:string, content:string){
    const createdAt = new Date().toISOString()//Pega data/hora atual
    db.runSync(
        'INSERT INTO notes(title,content,createdAt) VALUES (?, ?, ?)',
        [title,content,createdAt]
    )
}

//Função de atualizar nota(já existente)
export function updateNote(id:number,title:string,content:string){
    db.runSync("UPDATE notes SET title=?,content = ? WHERE id = ?",[title,content,id])
}

//Função para deletar uma nota pelo ID
export function deleteNote(id:number){
    db.runSync("DELETE FROM notes WHERE id=?",[id])
}

