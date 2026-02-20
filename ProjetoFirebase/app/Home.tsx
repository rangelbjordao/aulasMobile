import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Text, StyleSheet, View, Button } from "react-native";

export default function Home() {
  const router = useRouter(); // Hook de navegacao

  const realizarLogoff = async () => {
    await AsyncStorage.removeItem("@user"); // Limpa o usuario do Async
    router.replace("/"); // Redireciona para a tela de login
  };
  return (
    <View style={styles.main}>
      <Text>Tela Home</Text>
      <Button title="Realizar logoff" onPress={realizarLogoff} />
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
