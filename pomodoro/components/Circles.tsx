import { StyleSheet, Text, View } from "react-native";
import Circle from "./Circle";

interface CirclesProps {
  firstCompleted: boolean;
  secondCompleted: boolean;
  thirdCompleted: boolean;
  fourthCompleted: boolean;
}

const Circles = ({
  firstCompleted,
  secondCompleted,
  thirdCompleted,
  fourthCompleted,
}: CirclesProps) => {
  return (
    <View style={styles.container}>
      <Circle fill={firstCompleted} />
      <Circle fill={secondCompleted} />
      <Circle fill={thirdCompleted} />
      <Circle fill={fourthCompleted} />
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
