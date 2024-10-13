import React, { useEffect, useState } from "react";
import { FlatList, Text, Box, Spinner, ScrollView, Toast } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import TarefaItem from './TarefaItem';
import AsyncStorage from "@react-native-community/async-storage";
import AdicionarTarefa from './AdicionarTarefa'; // Importar o componente AdicionarTarefa

interface Tarefa {
  id: number;
  tarefa: string;
}

const ListaTarefas: React.FC = () => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar tarefas
  const fetchTarefas = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        setError('Usuário não autenticado.');
        return;
      }

      const response = await fetch('http://localhost:3000/api/tarefas', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar tarefas');
      }

      const data = await response.json();
      setTarefas(data);
    } catch (error) {
      setError("Erro ao buscar tarefas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTarefas();
  }, []);

  // Função para atualizar a lista após adicionar uma tarefa
  const handleAdicionarTarefa = () => {
    fetchTarefas(); // Recarrega a lista de tarefas após adicionar uma nova
  };

  // Função para atualizar uma tarefa existente
  const handleUpdateTarefa = async (id: number, tarefa: string) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('Token não encontrado!');
        return;
      }

      const response = await fetch(`http://localhost:3000/api/tarefas/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tarefa }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao atualizar tarefa');
      }

      // Atualiza a lista de tarefas localmente
      const updatedTarefas = tarefas.map((item) =>
        item.id === id ? { ...item, tarefa } : item
      );
      setTarefas(updatedTarefas);
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      alert(error.message); // Mostra a mensagem de erro para o usuário
    }
  };

  // Função para deletar uma tarefa
  const handleDeleteTarefa = async (id: number) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('Token não encontrado!');
        return;
      }

      const response = await fetch(`http://localhost:3000/api/tarefas/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao excluir tarefa');
      }

     
      setTarefas(tarefas.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
      alert(error.message);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Box padding={4}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </Box>
    );
  }

  return (
    <>
      {/* Adicionando o componente para adicionar tarefas */}
      <AdicionarTarefa onAdicionarTarefa={handleAdicionarTarefa} />

      {/* Lista de tarefas */}
      <FlatList
        data={tarefas}
        renderItem={({ item }) => (
          <TarefaItem
            id={item.id}
            titulo={item.tarefa}
            onUpdate={handleUpdateTarefa}
            onDelete={handleDeleteTarefa}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </>
  );
};

export default ListaTarefas;