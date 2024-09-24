import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';

interface Action {
  id: string;
  descricao: string;
  data: string;
}

interface ProfileProps {
  name: string;
  email: string;
  picture: string; 
  actions: Action[];
}

const nutri: ProfileProps = {
    name: "Nutricionista Camila",
    email: "camila@email.com",
    picture: "https://img.freepik.com/vetores-premium/ilustracao-de-uma-menina-bonita-lendo-um-livro-enquanto-segura-uma-maca-vermelha_1142-83582.jpg",
    actions: [
      {id: "1", descricao: "Adicionou um novo paciente: Paciente 4", data: "23/09/2024"}, 
      {id: "2", descricao: "Adicionou um novo paciente: Paciente 5", data: "23/09/2024"}, 
      {id: "3", descricao: "Deletou o Paciente 2", data: "23/09/2024"}, 
      {id: "4", descricao: "Alterou os dados do Paciente 3", data: "23/09/2024"}
    ],
  }

const ProfileView: React.FC<ProfileProps> = () => {

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image source={{ uri: nutri.picture }} style={styles.picture} />
        <Text style={styles.name}>{nutri.name}</Text>
        <Text style={styles.email}>{nutri.email}</Text>
      </View>

      <Text style={styles.acaoTitle}>Últimas Ações:</Text>
      <FlatList
        data={nutri.actions}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.acaoItem}>
            <Text style={styles.acaoDescricao}>{item.descricao}</Text>
            <Text style={styles.acaoData}>{item.data}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  picture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#555',
  },
  acaoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  acaoItem: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 5,
    elevation: 2,
  },
  acaoDescricao: {
    fontSize: 16,
  },
  acaoData: {
    fontSize: 12,
    color: '#999',
  },
});

export default ProfileView;
