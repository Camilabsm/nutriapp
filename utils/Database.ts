import { type SQLiteDatabase } from 'expo-sqlite';
import { Alert } from 'react-native';

const database_name = 'NutriApp.db';
const database_location = 'default';
const database_version = '1.0';
const database_displayname = 'NutriApp Database';
const database_size = 200000;

export async function initializeDatabase(database: SQLiteDatabase) {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL,
      usuario TEXT NOT NULL, 
      senha TEXT
    );  
  `)
}
 