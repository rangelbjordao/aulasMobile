import { getGreeting } from "@/api/greeting";
import { getPosts } from "@/api/posts";
import { postKey } from "@/api/todo";
import { Post } from "@/types/post";
import { useEffect, useState } from "react";
import { Button, FlatList, Text, View } from "react-native";

export default function Index() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [greeting, setGreeting] = useState("");
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    }
    loadData();
  }, []);

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

  async function handlePress() {
    try {
      const apiKeyResponse = await postKey("pf2128", "segredo");

      setApiKey(apiKeyResponse.api_key);
    } catch (error) {
      console.error("create api key", error);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button title="Criar api key" onPress={handlePress} />
      <Text>Api key: {apiKey}</Text>
      <FlatList
        data={posts}
        keyExtractor={(post) => post.id.toString()}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        ListHeaderComponent={() => <Text>{greeting}</Text>}
      />
    </View>
  );
}
