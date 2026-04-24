import { Stack } from "expo-router"

export default function Layout() {
    return (
        <Stack screenOptions={{ animation: "slide_from_right" }}>
            <Stack.Screen
                name="index"
                options={{ title: "Tela Inicial" }}
            />

            <Stack.Screen
                name="add"
                options={{ title: "Adicionar Nota" }}
            />

            <Stack.Screen name="edit/[id]"
                options={{ title: "Tela de Edição" }}
            />

        </Stack>
    )
}