import { StyleSheet, Text, View } from "react-native";

interface CircleProps {
  fill: boolean;
}

const Circle = ({ fill }: CircleProps) => {
  return <View style={[styles.circle, fill ? styles.fill : null]}></View>;
};

export default Circle;

const styles = StyleSheet.create({
  circle: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 12,
    width: 24,
    height: 24,
  },
  fill: {
    backgroundColor: "#fff",
  },
});
