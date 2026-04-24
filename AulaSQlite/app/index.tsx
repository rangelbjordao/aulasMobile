import { deleteNote, getNotes } from "@/src/db/db"
import { useFocusEffect, useRouter } from "expo-router"
import React, { useState } from "react"
import { Alert, Button, FlatList, StyleSheet, Text, View } from "react-native"

export default function HomeScreen() {
    const [notes, setNotes] = useState<any[]>([])//Estado para armazenar as notas
    const router = useRouter()//Hook de navegação do Expo Router

    //useFocusEffect executa sempre que a tela volta a ser foco
    //útil para autalizar ao retornar a tela
    useFocusEffect(
        React.useCallback(() => {
            setNotes(getNotes())//Carrega as notas do banco
        }, [])
    )

    //Função para deletar a nota
    function handleDelete(id: number) {
        Alert.alert(
            "Exclusão de nota",
            "Tem certeza que deseja excluir a nota?",
            [
                {
                    text: "Cancelar"
                },
                {
                    text: "Confirmar",
                    onPress: () => {
                        deleteNote(id)//Remove a nota do banco
                        setNotes(getNotes())//Atualizar a lista com as notas
                    }
                }
            ]
        )


    }

    return (
        <View style={styles.container}>
            <Text style={styles.textPrincipal}>App de Notas</Text>
            <Button
                title="Adicionar Nota"
                onPress={() => router.push("/add")}
            />
            <FlatList
                style={{ marginTop: 20 }}
                data={notes}
                ListEmptyComponent={<Text>Lista Vazia - Sem notas criadas.</Text>}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.cardText}>{item.title}</Text>
                        <Text>{item.content}</Text>
                        <View style={{ flexDirection: "row" }}>
                            <Button
                                title="Editar"
                                onPress={() => router.push(`./edit/${item.id}`)}
                            />
                            <View style={{ width: 10 }} />
                            <Button
                                color="red"
                                title="Deletar"
                                onPress={() => handleDelete(item.id)}
                            />
                        </View>
                    </View>
                )}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, alignItems: "center" },
    card: { borderWidth: 1, padding: 10, marginBottom: 5, borderRadius: 8 },
    cardText: { fontWeight: "bold", fontSize: 14 },
    textPrincipal: { fontSize: 22, fontWeight: "bold", marginBottom: 30 }
})