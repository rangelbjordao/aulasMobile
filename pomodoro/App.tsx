import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Timer from "./components/Timer";
import Controls from "./components/Controls";
import Circles from "./components/Circles";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

export default function App() {
  const [time, setTime] = useState(1_500);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const ref = setInterval(() => {
        console.log("oi");
        setTime((currentValue) => currentValue - 1);
      }, 1_000);

      return () => {
        console.log("limpando o setInterval");
        clearInterval(ref);
      };
    }
  }, [isRunning]);

  function handleStart() {
    setIsRunning(true);
  }

  function handlePause() {
    setIsRunning(false);
  }

  function handleNext() {}

  return (
    <View style={styles.container}>
      <Timer time={time} />
      <Controls
        onStart={handleStart}
        onNext={handleNext}
        onPause={handlePause}
        isRunning={isRunning}
      />
      <Circles />
      <Text style={styles.text}>Focus time</Text>
      <Ionicons name="help-circle" size={24} color="#fff" />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BA4949",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 34,
    marginVertical: 36,
  },
});
