import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Button,
} from "react-native";
import { useQuery, useMutation } from "@tanstack/react-query"; //Hook para fazer queries
import { fetchUsers, createUser } from "./api/users";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  //useQuery é o hook principal do Tanstack Query
  // queryKey: chave única para identifcar essa query
  // queryFn: função que executa a requisição

  const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  //Mutation para criar uma novo usuário
  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => refetch(), //Atualiza a lista com o novo usuário criado.
  });

  //Dados do novo usuário
  const novoUser = {
    name: "Rangel",
    userId: 4,
  };

  //Exibe um spinner enquanto os dados são carregados
  if (isLoading) {
    return <ActivityIndicator size="large" style={styles.center} />;
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
    <SafeAreaView>
      <Button
        title={mutation.isPending ? "Criando usuario..." : "Criar novo usuario"}
        onPress={() => mutation.mutate(novoUser)}
        disabled={mutation.isPending}
      />
      <FlatList
        data={data}
        refreshing={isFetching} //Mostra o spinner durante o refetch
        onRefresh={refetch} // chamar automáticamente o refetch ao puxar
        renderItem={({ item }) => (
          <View>
            <Text style={styles.name}>{item.name}</Text>
          </View>
        )}
      />
    </SafeAreaView>
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
