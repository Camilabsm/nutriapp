import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const MetricsView: React.FC = () => {
  const [totalPacientes, setTotalPacientes] = useState<number | null>(null);
  const [pacientesPorPlano, setPacientesPorPlano] = useState<Array<{ plano: string, quantidade: number }> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMetrics() {
      try {
        const total = 50;
        const porPlano = [{ plano: "Mensal", quantidade: 10 }, { plano: "Trimestral", quantidade: 25 }, { plano: "Semestral", quantidade: 15 }]

        setTotalPacientes(total);
        setPacientesPorPlano(porPlano);
      } catch (error) {
        console.error('Erro ao carregar métricas:', error);
      } finally {
        setLoading(false);
      }
    }

    loadMetrics();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const planos = pacientesPorPlano ? pacientesPorPlano.map(item => item.plano) : [];
  const quantidades = pacientesPorPlano ? pacientesPorPlano.map(item => item.quantidade) : [];

  const data = {
    labels: planos,
    datasets: [
      {
        data: quantidades
      }
    ]
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.metricTitle}>Métricas</Text>

      <Text style={styles.metricItem}>Total de Pacientes: {totalPacientes}</Text>

      <Text style={styles.metricItemTitle}>Pacientes por Plano (Gráfico de Barras):</Text>
      <BarChart
        data={data}
        width={screenWidth - 40}
        height={220}
        yAxisLabel=""
        yAxisSuffix=''
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 0, // Mostrar números inteiros
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726'
          }
        }}
        verticalLabelRotation={30} // Rotação das labels no eixo X
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  metricTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  metricItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  metricItem: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default MetricsView;
