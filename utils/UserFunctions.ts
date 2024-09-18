import { useSQLiteContext } from "expo-sqlite"

export function useUserDatabase() {
    const database = useSQLiteContext()
    async function createUser() {

    }

    async function getUser(username: string, password: string) {
        try {
            const query = "SELECT * FROM usuarios WHERE usuario = ? AND senha = ?"
            const result = await database.getFirstAsync(query, username, password)
            if (result) {
                return true
            } else {
                return false
            }
        } catch (error) {
            throw error
        }
    }

    return { createUser, getUser }
}