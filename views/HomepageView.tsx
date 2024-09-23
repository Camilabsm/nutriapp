// src/screens/HomeScreen.tsx
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, StyleSheet, GestureResponderEvent } from 'react-native';
import { Avatar, BottomNavigationProps, Button, Card, Text } from 'react-native-paper';

const LeftContent1 = props => <Avatar.Icon {...props} icon="card-account-details" />
const LeftContent2 = props => <Avatar.Icon {...props} icon="chart-line" />
const LeftContent3 = props => <Avatar.Icon {...props} icon="account-box" />

const HomepageView: React.FC = () => {
  const navigation = useNavigation<BottomTabNavigationProp<any>>();

  function handlePress(e: GestureResponderEvent) {
    console.log(e.target)
    // navigation.navigate(routeName)
  }

  return (
    <View>
      <Text style={styles.title}>Bem vinda, Camila!</Text>
      <Text style={styles.cta}>O que você gostaria de fazer hoje?</Text>
        <Card style={styles.card}>
          <Card.Title title="Ver meus pacientes" left={LeftContent1} />
          <Card.Content>
            <Text variant="bodyMedium">Você poderá ver seus pacientes e adicionar novos pacientes.</Text>
          </Card.Content>
          <Card.Actions>
            <Button key="1" buttonColor='#A92C3A' textColor='#fff' onPress={handlePress}>Ir</Button>
          </Card.Actions>
      </Card>
        <Card style={styles.card}>
          <Card.Title title="Ver minhas métricas" left={LeftContent2} />
          <Card.Content>
            <Text variant="bodyMedium">Você poderá avaliar suas métricas de número de pacientes, pacientes por planos, entre outras.</Text>
          </Card.Content>
          <Card.Actions>
            <Button buttonColor='#A92C3A' textColor='#fff'>Ir</Button>
          </Card.Actions>
      </Card>
        <Card style={styles.card}>
          <Card.Title title="Ver meu perfil" left={LeftContent3} />
          <Card.Content>
            <Text variant="bodyMedium">Você poderá ver seu perfil.</Text>
          </Card.Content>
          <Card.Actions>
            <Button buttonColor='#A92C3A' textColor='#fff'>Ir</Button>
          </Card.Actions>
      </Card>
      
    </View>
    
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  cta: {
    marginLeft: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  title: {
    color: '#A92C3A',
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 20,
  }
});

export default HomepageView;
