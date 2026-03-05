import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ItemLoja({ nomeProduto }) {
  return (
    <View style={styles.container}>
      <Pressable>
        <MaterialIcons name="edit" color="black" size={24} />
      </Pressable>
      <Text style={styles.title}>{nomeProduto}</Text>
      <Pressable>
        <MaterialIcons name="delete" size={24} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "lightgrey",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
  },
  title: {
    flex: 1,
    marginLeft: 10,
    fontSize: 17,
    fontWeight: 500,
  },
});
