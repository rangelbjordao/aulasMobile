import { getTodoItems } from "@/api/todo";
import { TodoItem } from "@/types/todo";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AddTask from "./AddTask";

const TodoList = () => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  async function loadItems() {
    setIsLoading(true);
    setHasError(false);

    try {
      const items = await getTodoItems();
      setTodoItems(items);
    } catch (error) {
      setHasError(true);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  async function handleAddTask() {
    await loadItems();
  }

  if (isLoading) {
    return <ActivityIndicator size={48} />;
  }

  return (
    <View>
      <AddTask onAddTask={handleAddTask} />
      {hasError && (
        <View style={styles.errorView}>
          <Text>Falha ao carregar os seus TODOs.</Text>
          <Button title="Recarregar" onPress={() => loadItems()} />
        </View>
      )}
      <FlatList
        data={todoItems}
        renderItem={({ item }) => (
          <Text style={styles.todoItem}>{item.name}</Text>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  todoItem: {
    fontSize: 20,
    fontWeight: "600",
    padding: 16,
  },
  errorView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
