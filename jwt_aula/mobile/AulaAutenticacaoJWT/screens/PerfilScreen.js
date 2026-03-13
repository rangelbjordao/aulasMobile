import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";

export default function PerfilScreen({ navigation }) {
  const [user, setUser] = useState(null);

  // Função que busca os dados do usuário na API
  async function carregarPerfil() {
    // Recupera o token salvo no celular
    const token = await AsyncStorage.getItem("token");

    // Faz requisição para rota protegida
    const response = await api.get("/perfil", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Salva dados do usuário no estado
    setUser(response.data.user);
  }

  useEffect(() => {
    carregarPerfil();
    setTimeout(() => {
      verificarTokenValido();
    }, 10000);
  }, []);

  // FUNÇÃO DE LOGOUT
  async function logout() {
    // Remove o token do armazenamento do celular
    await AsyncStorage.removeItem("token");

    // Volta para tela de login
    navigation.navigate("Login");
  }

  const verificarTokenValido = () => {
    async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await api.get("/perfil", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Usuário logado: ", response.data.email);
        Alert.alert("Token Válido! Usuario Carregado.");
      } catch (err) {
        console.log("Erro 401: Token expirou.");
        Alert.alert("Token expirou, faça seu login novamente.");
        AsyncStorage.removeItem("token");
        navigation.navigate("Login");
      }
    };
  };

  const mostrarToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      Alert.alert("Token:", token);
    } catch (err) {
      Alert.alert("Erro ao recuperar token");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Usuário logado:</Text>

      {user && <Text>{user.email}</Text>}

      <View style={{ marginTop: 20 }}>
        <Button title="Logout" onPress={logout} />

        <Button title="Verificar token" onPress={verificarTokenValido} />

        <Button title="Mostrar token" onPress={mostrarToken} />
      </View>
    </View>
  );
}
