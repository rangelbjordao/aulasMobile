import { StyleSheet, Text, View } from "react-native";

interface TimerProps {
  time: string;
}

const Timer = ({ time }: TimerProps) => {
  return (
    <View style={styles.circle}>
      <Text style={styles.text}>{time}</Text>
    </View>
  );
};
export default Timer;
const styles = StyleSheet.create({
  circle: {
    borderWidth: 3.5,
    borderColor: "#fff",
    width: 230,
    height: 230,
    borderRadius: 115,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 64,
    color: "#fff",
    fontWeight: "light",
  },
});
