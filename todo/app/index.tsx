import { getGreeting } from "@/api/greeting";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    async function loadTodoGreeting() {
      try {
        const data = await getGreeting();
        setGreeting(data.greeting);
      } catch (error) {
        console.log("greeting error", error);
      }
    }

    loadTodoGreeting();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Api key: {greeting}</Text>
    </View>
  );
}
