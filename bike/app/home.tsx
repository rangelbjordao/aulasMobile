import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
const HomeScreen = () => {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Link replace href="/">
        Sair
      </Link>
    </View>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({});
