import React, { useState } from "react";
import { Box, Text, IconButton, Input, HStack, Button, Modal } from 'native-base';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

interface TarefaItemProps {
  id: number;
  titulo: string;
  onUpdate: (id: number, tarefa: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

const TarefaItem: React.FC<TarefaItemProps> = ({ id, titulo, onUpdate, onDelete }) => {
  const [isEditMode, setIsEditMode] = useState(false); // Alterna entre modo de edição e visualização
  const [newTarefa, setNewTarefa] = useState(titulo); // Mantém o valor da nova tarefa
  const [isModalOpen, setIsModalOpen] = useState(false); // Controla a visibilidade do modal

  // Função para lidar com a atualização da tarefa
  const handleUpdate = async () => {
    if (newTarefa.trim() === "") {
      return alert("A tarefa não pode estar vazia.");
    }

    try {
      await onUpdate(id, newTarefa); // Chama a função de atualização passada via props
      setIsEditMode(false); // Sai do modo de edição após a atualização bem-sucedida
    } catch (error) {
      alert("Erro ao atualizar a tarefa."); // Exibe um erro caso a atualização falhe
    }
  };

  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      bg="gray.200"
      p={4}
      my={2}
      mx={2}
      borderRadius={8}
    >
      {isEditMode ? (
        <HStack flex={3} alignItems="center">
          <Input
            value={newTarefa}
            onChangeText={setNewTarefa}
            autoFocus
          />
          <IconButton icon={<AntDesign name="check" size={24} />} onPress={handleUpdate} />
        </HStack>
      ) : (
        <Text flex={3} fontSize={18}>{titulo}</Text>
      )}
      
      {/* Botões de Editar e Excluir */}
      <HStack space={2}>
        <IconButton
          icon={<AntDesign name="edit" size={24} />}
          onPress={() => setIsEditMode(!isEditMode)} // Alterna entre modo de edição e visualização
        />
        <IconButton
          icon={<MaterialIcons name="delete" size={24} />}
          onPress={() => setIsModalOpen(true)} // Abre o modal de confirmação para excluir
        />
      </HStack>

      {/* Modal de confirmação para exclusão */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Content>
          <Modal.Header>Excluir Tarefa</Modal.Header>
          <Modal.Body>Deseja realmente excluir esta tarefa?</Modal.Body>
          <Modal.Footer>
            <Button.Group>
              <Button colorScheme="coolGray" onPress={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button colorScheme="danger" onPress={async () => {
                await onDelete(id);
                setIsModalOpen(false);
              }}>
                Excluir
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
};

export default TarefaItem;
