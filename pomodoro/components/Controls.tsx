import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

interface ControlsProp {
  onStart: () => void;
  onPause: () => void;
  onNext: () => void;
  isRunning?: boolean;
}

const Controls = ({ onStart, onNext, onPause, isRunning }: ControlsProp) => {
  return (
    <View style={styles.container}>
      <Ionicons
        name={isRunning ? "pause-circle" : "play-circle"}
        size={64}
        color="#fff"
        style={{ marginLeft: 40 }}
        onPress={isRunning ? onPause : onStart}
      />

      <Ionicons
        name="play-skip-forward"
        size={32}
        color="#fff"
        onPress={onNext}
      />
    </View>
  );
};

export default Controls;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 30,
    alignItems: "center",
    gap: 16,
  },
});
