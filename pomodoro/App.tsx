import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Timer from "./components/Timer";
import Controls from "./components/Controls";
import Circles from "./components/Circles";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

const FOCUS_TIME = 1_5;
const SHORT_BREAK = 3;
const LONG_BREAK = 1_2;

const CYCLES = [
  FOCUS_TIME,
  SHORT_BREAK,
  FOCUS_TIME,
  SHORT_BREAK,
  FOCUS_TIME,
  SHORT_BREAK,
  FOCUS_TIME,
  LONG_BREAK,
];

export default function App() {
  const [time, setTime] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [completed, setCompleted] = useState(0);

  const currentCycle = completed % 8;

  useEffect(() => {
    if (isRunning) {
      const ref = setInterval(() => {
        console.log("tick");
        setTime((currentValue) => {
          if (currentValue > 0) {
            return currentValue - 1;
          } else {
            setCompleted((curr) => {
              const cycle = curr % 8;
              setTime(CYCLES[cycle === 7 ? 0 : cycle + 1]);
              return curr + 1;
            });
            return currentValue;
          }
        });
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

  let bgColor, cycleText;
  if (currentCycle % 2 === 0) {
    bgColor = styles.focusTime;
    cycleText = "Focus time";
  } else if (currentCycle % 7 === 0) {
    bgColor = styles.longBreak;
    cycleText = "Long Break";
  } else {
    bgColor = styles.shortBreak;
    cycleText = "Break";
  }

  return (
    <View style={[styles.container, bgColor]}>
      <Timer time={time} />
      <Controls
        onStart={handleStart}
        onNext={handleNext}
        onPause={handlePause}
        isRunning={isRunning}
      />
      <Circles
        firstCompleted={currentCycle > 0}
        secondCompleted={currentCycle > 2}
        thirdCompleted={currentCycle > 4}
        fourthCompleted={currentCycle > 6}
      />
      <Text style={styles.text}>{cycleText}</Text>
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
  focusTime: {
    backgroundColor: "#BA4949",
  },
  shortBreak: {
    backgroundColor: "#38858A",
  },
  longBreak: {
    backgroundColor: "#397097",
  },
  text: {
    color: "#fff",
    fontSize: 34,
    marginVertical: 36,
  },
});
