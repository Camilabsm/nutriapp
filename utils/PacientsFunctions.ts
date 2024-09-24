import * as SQLite from 'expo-sqlite';
import { Alert } from 'react-native';

export function usePatientDatabase() {
    const db = SQLite.useSQLiteContext()

    async function getPatients() {
        try {
            const query = "SELECT * FROM pacientes"
            const result = await db.getAllAsync(query)
            return result
        } catch (error) {
            throw error
        }
    }

    async function deletePatient(id: string) {
        try {
            const query = "DELETE FROM pacientes WHERE id = $id"
            await db.runAsync(query, {$id: id})
            Alert.alert('Sucesso', 'Paciente deletado com sucesso!')
        } catch (error) {
            throw error
        }
    }

    async function addPatient(name: string, plan: string, initialDate: Date) {
        try {
            const query = `INSERT INTO pacientes (nome, plano, data_inicial) VALUES (${name}, ${plan}, ${initialDate})`
            await db.runAsync(query)
        } catch (error) {
            throw error
        }
    }

    async function modifyPatient(id: number, name: string, plan: string, initialDate: Date) {
        try {
            const query = `UPDATE pacientes SET plan = ${plan} WHERE id = ${id};
                UPDATE pacientes SET data_inicial = ${initialDate} WHERE id = ${id};
            `
            await db.execAsync(query)
        } catch (error) {
            throw error
        }
    }

    return { getPatients, deletePatient, addPatient, modifyPatient }
}