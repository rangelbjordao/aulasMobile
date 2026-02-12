import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useQuery } from "@tanstack/react-query"; //Hook para fazer queries
import { fetchUsers } from "./api/users";

export default function App() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  //Exibe um spinner enquanto os dados sao carregados
  if (isLoading) {
    return <ActivityIndicator size="large" style={style.center} />;
  }

  //Exibe uma mensagem de erro caso haja erro na requisição
  if (isError) {
    return (
      <View style={styles.center}>
        <Text>Erro ao buscar os dados: {error.message}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={(item) => (
        <View>
          <Text style={styles.name}>{item.name}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
