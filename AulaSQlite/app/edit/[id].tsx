import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";

//Funções do banco SQLite
import { getNotes, updateNote } from "@/src/db/db";

//Definindo uma tipagem para as notas
interface Note {
  id: number,
  title: string,
  content: string,
  createdAt: string
}

export default function EditNoteScreen() {
  //Pega o parâmentro da rota
  const params = useLocalSearchParams<{ id: string }>()
  const router = useRouter()//Hook para navegar..

  //Estados para armazenar o titulo e conteudo
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  //useEffect executa ao carregar tela
  useEffect(() => {
    //Validação simples
    if (!params.id) return

    //Busca a nota pelo ID usando getNotes()
    const note = (getNotes() as Note[]).find(n => n.id === Number(params.id))

    //Se encotrou a nota, preenche os estados de titulo e conteudo
    if (note) {
      setTitle(note.title)
      setContent(note.content)
    }
  }, [params.id])

  function handleUpdate() {
    //Validação simples para que não seja possível cadastrar uma nota
    //com título em branco
    if (!title.trim()) {
      Alert.alert("Atenção", "Digite um título para a nota")
      return
    }

    //Atualizar a nota no SQLite
    updateNote(Number(params.id), title, content)

    //Voltar para a tela anterior(index)
    router.back()
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={(value) => setTitle(value)}
      />

      <TextInput
        placeholder="Conteúdo"
        value={content}
        onChangeText={(value) => setContent(value)}
        multiline
        style={[styles.input, { height: 120 }]}
      />

      <Button
        title="Atualizar Nota"
        onPress={handleUpdate}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8
  }
})