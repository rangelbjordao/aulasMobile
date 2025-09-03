import { StyleSheet, Text, View } from "react-native";
import Circle from "./Circle";

const Circles = () => {
  return (
    <View style={styles.container}>
      <Circle fill={true} />
      <Circle fill={false} />
      <Circle fill={false} />
      <Circle fill={false} />
    </View>
  );
};
export default Circles;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
    marginVertical: 16,
  },
});
