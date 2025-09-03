import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <TextInput placeholder='Digite o seu nome aqui'></TextInput>
      <Text style={styles.warning}>Ola,</Text>
      <Text style={styles.title}>Bem vindo</Text>
      <Image
        style={styles.image}
        src={"https://"}></Image>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    padding: 20,
  },
  warning: {
    fontSize: 24,
    color: 'yellow',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 20,
    marginBottom: 20,
  }
});
