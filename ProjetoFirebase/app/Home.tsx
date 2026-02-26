import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Text, StyleSheet, View, Button, Alert } from "react-native";
import { auth } from "../services/firebaseConfig";
import { deleteUser } from "firebase/auth";

export default function Home() {
  const router = useRouter(); // Hook de navegacao

  const realizarLogoff = async () => {
    await AsyncStorage.removeItem("@user"); // Limpa o usuario do Async
    router.replace("/"); // Redireciona para a tela de login
  };

  const excluirConta = () => {
    Alert.alert(
      "Confirmar Exclusao",
      "Tem certeza que deseja excluir sua conta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: async () => {
            try{
              const user = auth.currentUser
              if(user) {
                await deleteUser(user)
                await AsyncStorage.removeItem("@user")
                Alert.alert("Sucesso", "Conta excluida!")
                router.replace("/")
              } else {
                Alert.alert("Erro", "Nenhum usuario logado.")
              }
            } catch(error) {
              console.log("Erro ao excluir conta.")
              Alert.alert("Erro", "Nao foi possivel excluir a conta")
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.main}>
      <Text>Tela Home</Text>
      <Button title="Realizar logoff" onPress={realizarLogoff} />
      <Button title="Excluir conta" color="red" onPress={excluirConta} />
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
