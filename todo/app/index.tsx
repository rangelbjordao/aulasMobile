import { getGreeting } from "@/api/greeting";
import TodoList from "@/components/TodoList";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [greeting, setGreeting] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTodoGreeting() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getGreeting();
        setGreeting(data.greeting);
        console.log(data);
      } catch (error) {
        console.log("greeting error", error);
        setError("Erro na requisicao");
      } finally {
        setIsLoading(false);
      }
    }

    loadTodoGreeting();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size={96} />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        padding: 16,
      }}
    >
      <Text>{greeting}</Text>
      {error && <Text style={{ color: "#f00" }}>{error}</Text>}
      <TodoList />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
