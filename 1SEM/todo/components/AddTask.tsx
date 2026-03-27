import { postTodoItem } from "@/api/todo";
import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

interface Props {
  onAddTask: () => void;
}

const AddTask = ({ onAddTask }: Props) => {
  const [taskName, setTaskName] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handlePress = async () => {
    try {
      setIsPending(true);
      await postTodoItem({
        name: taskName,
        note: "",
        tags: [],
      });
      setTaskName("");
      onAddTask();
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="O que voce deseja fazer?"
        value={taskName}
        onChangeText={setTaskName}
      />
      <Button title="Adicionar" onPress={handlePress} disabled={isPending} />
      {isPending && <ActivityIndicator size={24} />}
    </View>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
    width: "100%",
    paddingVertical: 16,
  },
  textInput: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#C0C0C0",
    borderRadius: 12,
    flex: 1,
  },
});
