import * as SQLite from 'expo-sqlite';

export function useUserDatabase() {
    const db = SQLite.useSQLiteContext()

    async function getUser(username: string, password: string) {
        try {
            const query = `SELECT * FROM usuarios WHERE usuario = ${username} AND senha = ${password}`
            const result = await db.getFirstAsync(query)
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