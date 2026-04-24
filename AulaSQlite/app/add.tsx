import React,{useState} from "react";
import {View,TextInput,Button,Alert,StyleSheet} from "react-native"
import { useRouter } from "expo-router";
import { addNote } from "@/src/db/db";

export default function AddNoteScreen(){
    const[title,setTitle]=useState("")//Estado para armazer o titulo da nota
    const[content,setContent]=useState("")//Conteúdo da nota
    const router = useRouter()//Hook de navegação

    //Função chamada ao pressionar o botão Salvar
    function handleSave(){
        if(!title.trim()){
            Alert.alert("Atenção","Digite um título para a nota.")
            return
        }

        addNote(title,content)//Adiciona a nota no banco de dados
        router.back()//Retorna para tela index
    }

    return(
        <View style={styles.container}>
            <TextInput 
                style={styles.input}
                placeholder="Digite o título da nota."
                value={title}
                onChangeText={(value)=>setTitle(value)}
            />
            <TextInput 
                style={[styles.input,{height:120}]}
                placeholder="Digite o conteúdo da nota"
                multiline
                value={content}
                onChangeText={(value)=>setContent(value)}
            />
            <Button 
                title="Salvar Nota"
                onPress={handleSave}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,padding:20
    },
    input:{
        borderWidth:1,
        padding:10,
        marginBottom:10,
        borderRadius:8
    }
})