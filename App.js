import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';

const App = () => {
  const [personName, setPersonName] = useState('');
  const [activityName, setActivityName] = useState('');
  const [totalValue, setTotalValue] = useState('');
  const [persons, setPersons] = useState([]);
  const [activities, setActivities] = useState([]);
  const [results, setResults] = useState('');

  const addPerson = () => {
    if (!personName.trim()) {
      Alert.alert('Erro', 'Por favor, insira um nome válido.');
      return;
    }
    if (!persons.includes(personName)) {
      setPersons([...persons, personName]);
      setPersonName('');
    } else {
      Alert.alert('Erro', 'Pessoa já adicionada.');
    }
  };

  const addActivity = () => {
    if (!activityName.trim()) {
      Alert.alert('Erro', 'Por favor, insira uma atividade válida.');
      return;
    }
    if (!activities.includes(activityName)) {
      setActivities([...activities, activityName]);
      setActivityName('');
    } else {
      Alert.alert('Erro', 'Atividade já adicionada.');
    }
  };

  const calculateDivision = () => {
    if (!totalValue || isNaN(totalValue)) {
      Alert.alert('Erro', 'Por favor, insira um valor total válido.');
      return;
    }
    if (activities.length === 0) {
      Alert.alert('Erro', 'Nenhuma atividade foi adicionada.');
      return;
    }
    const perActivityCost = parseFloat(totalValue) / activities.length;

    const division = persons.map((person) => ({
      person,
      share: perActivityCost.toFixed(2),
    }));

    const resultText = division
      .map((entry) => `${entry.person}: R$ ${entry.share}`)
      .join('\n');

    setResults(resultText);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Divisor de Viagens</Text>

      {/* Campo para adicionar pessoas */}
      <TextInput
        style={styles.input}
        placeholder="Nome da pessoa"
        value={personName}
        onChangeText={setPersonName}
      />
      <Button title="Adicionar Pessoa" onPress={addPerson} />

      {/* Campo para adicionar atividades */}
      <TextInput
        style={styles.input}
        placeholder="Nome da atividade"
        value={activityName}
        onChangeText={setActivityName}
      />
      <Button title="Adicionar Atividade" onPress={addActivity} />

      {/* Campo para inserir o valor total */}
      <TextInput
        style={styles.input}
        placeholder="Valor total (R$)"
        keyboardType="numeric"
        value={totalValue}
        onChangeText={setTotalValue}
      />
      <Button title="Calcular Divisão" onPress={calculateDivision} />

      {/* Lista de pessoas */}
      <Text style={styles.listHeader}>Pessoas:</Text>
      <FlatList
        data={persons}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.listItem}>{item}</Text>}
      />

      {/* Lista de atividades */}
      <Text style={styles.listHeader}>Atividades:</Text>
      <FlatList
        data={activities}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.listItem}>{item}</Text>}
      />

      {/* Resultado */}
      <Text style={styles.resultHeader}>Resultado:</Text>
      <Text style={styles.resultText}>{results}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  listHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  listItem: {
    fontSize: 16,
    marginVertical: 5,
  },
  resultHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  resultText: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default App;
