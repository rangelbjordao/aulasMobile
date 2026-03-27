import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email("Informe um e-mail valido"),
  password: z.string().min(6),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

const IndexScreen = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit({ email, password }: LoginFormData) {
    console.log("submit", email, password);
    const plainUsers = await AsyncStorage.getItem("@usersDB");
    const users = JSON.parse(plainUsers || "[]");

    const user = users.find(
      (item: LoginFormData) =>
        item.email === email && item.password === password
    );

    if (user) {
      // redirect
      router.replace("/home");
    } else {
      Alert.alert("Usuario/senha invalido");
    }
  }

  async function onSignUp(data: LoginFormData) {
    console.log("cadastrar usuario", data.email, data.password);
    const plainUsers = await AsyncStorage.getItem("@usersDB");
    const users = JSON.parse(plainUsers || "[]");
    const newUsers = [...users, data];
    await AsyncStorage.setItem("@usersDB", JSON.stringify(newUsers));
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ color: "#fff" }}>Login</Text>
      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}
      <Controller
        name="password"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}
      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
        <Text style={styles.text}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSubmit(onSignUp)} style={styles.button}>
        <Text style={styles.text}>Cadastrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default IndexScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#333",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 48,
    gap: 16,
  },
  input: {
    backgroundColor: "#f3f3f3",
    borderColor: "#d5d5d5",
    borderWidth: 1,
    borderRadius: 8,
    width: "100%",
  },
  button: {
    backgroundColor: "rgba(57, 0, 157, 1)",
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  text: {
    color: "#fff",
  },
  errorText: {
    color: "rgba(231, 45, 45, 1)",
  },
});
