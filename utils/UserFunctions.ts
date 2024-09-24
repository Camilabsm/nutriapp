import * as SQLite from 'expo-sqlite';

export function useUserDatabase() {
    const db = SQLite.useSQLiteContext()

    async function getUser(username: string, password: string) {
        try {
            const query = "SELECT * FROM usuarios WHERE usuario = ? AND senha = ?"
            const result = await db.getFirstAsync(query, username, password)
            if (result) {
                return true
            } else {
                return false
            }
        } catch (error) {
            throw error
        }
    }

    return { getUser }
}