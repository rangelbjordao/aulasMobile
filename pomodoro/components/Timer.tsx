import { StyleSheet, Text, View } from "react-native";
import { formatTime } from "../utils/formatTime";

interface TimerProps {
  time: number;
}

const Timer = ({ time }: TimerProps) => {
  return (
    <View style={styles.circle}>
      <Text style={styles.text}>{formatTime(time)}</Text>
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
