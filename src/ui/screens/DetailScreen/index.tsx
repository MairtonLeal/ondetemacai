import React, { useEffect, useState } from "react";
import { View, Text, KeyboardAvoidingView, TouchableOpacity, Modal, TextInput, Alert, ScrollView, Platform } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { Local } from "../../../domain/models/Local";
import { styles } from "./styles";
import { Feather, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../theme/color";
import { SafeAreaView } from 'react-native-safe-area-context';
import { LocalRepositoryFirestore } from "../../../domain/repositories/LocalRepositoryFirestore";
import { Timestamp } from "firebase/firestore";

type Params = {
  Details: { local: Local };
};

export default function LocalDetailsScreen() {
  const route = useRoute<RouteProp<Params, "Details">>();
  const navigation = useNavigation();
  const { local } = route.params;

  const [selectedLocal, setSelectedLocal] = useState<Local | null>(null);
  const [nome, setNome] = useState("");
  const [bairro, setBairro] = useState("");
  const [endereco, setEndereco] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const repository = new LocalRepositoryFirestore();

  const backScreen = () => {
    navigation.goBack();
  }

  const handleOpenOptions = (local: Local) => {
    setSelectedLocal(local);
    setModalVisible(true);
    setNome(local.nome);
    setBairro(local.bairro);
    setEndereco(local.endereco);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedLocal(null);
  };

  const handleDeleteLocal = (id: string) => {
    // Alerta de Exclusão, já é acessível, então não precisa adicionar acessibilidade
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja remover este local? Esta ação não pode ser desfeita.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await repository.delete(id);
              Alert.alert("Sucesso", "Local removido com sucesso!");
              backScreen()
            } catch (error) {
              console.error(error);
              Alert.alert("Erro", "Não foi possível remover o local.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleUpdate = (data: any) => {
    Alert.alert(
      "Confirmar Alteração",
      "Tem certeza que deseja salvar as alterações deste local?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Salvar",
          onPress: async () => {
            try {
              // Cria um objeto Local com os dados antigos + os novos campos
              const updatedLocal = new Local({
                id: data.id,
                nome: data.nome,
                bairro: data.bairro,
                endereco: data.endereco,
                createdAt: data.createdAt, // mantém o original
                updatedAt: Timestamp.now(),
              });
              await repository.update(updatedLocal);

              Alert.alert("Sucesso", "Local atualizado com sucesso!");
              handleCloseModal();
            } catch (error) {
              console.error(error);
              Alert.alert("Erro", "Não foi possível atualizar o local.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Voltar"
          accessibilityHint="Retorna para a tela anterior"
          onPress={backScreen}>
          <Feather name="chevron-left" size={28} color={COLORS.text} />
        </TouchableOpacity>
        <Text accessibilityRole="header" style={styles.headerTitle}>
          Detalhes do Local
        </Text>
        <View style={{ width: 28 }} />
      </View>
      <View
        accessible
        accessibilityLabel={`Nome do local: ${local.nome}. Bairro: ${local.bairro}. Endereço: ${local.endereco}`}
        accessibilityRole="summary"
        style={styles.container}>
        <Text style={styles.title}>{local.nome}</Text>
        <Text style={styles.subtitle}>Bairro: {local.bairro}</Text>
        <Text style={styles.address}>Endereço: {local.endereco}</Text>
      </View>
      <View style={styles.buttonsContainerActions}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Editar local"
          accessibilityHint="Abre o modal para editar os dados do local"
          onPress={() => {
            handleOpenOptions(local)
          }} style={styles.buttonEdit}>
          <Text style={styles.buttonText}>
            Editar Local
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Remover local"
          accessibilityHint="Exclui este local do cadastro"
          onPress={() => {
            const id = local?.id || '';
            handleDeleteLocal(id)
          }} style={styles.buttonCancel}>
          <Text style={styles.buttonText}>
            Remover Local
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        accessible
        accessibilityViewIsModal
        accessibilityLabel="Modal de edição do local"
        onRequestClose={handleCloseModal}>
        <SafeAreaView style={styles.safeModal}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 20}>
            <ScrollView
              contentContainerStyle={styles.modalEditarContainer}
              keyboardShouldPersistTaps="handled">
              <View
                accessible
                accessibilityRole="header"
                style={styles.modalEditarContainer}>
                {/* Header */}
                <View style={styles.headerModal}>
                  <Text style={styles.headerTitle}>Editar Local</Text>
                  <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityLabel="Fechar modal"
                    accessibilityHint="Fecha o modal de edição"
                    onPress={handleCloseModal}>
                    <Ionicons name="close" size={28} color={COLORS.text} />
                  </TouchableOpacity>
                </View>

                {/* Conteúdo */}
                <View accessibilityRole="header" style={styles.containerTitle}>
                  <Text style={styles.title}>
                    Atualize seus Campos
                  </Text>
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    onChangeText={setNome}
                    value={nome}
                    placeholder="Nome"
                    inputMode="text"
                    accessible
                    accessibilityLabel="Nome"
                    accessibilityHint="Edite o nome do local"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    onChangeText={setBairro}
                    value={bairro}
                    placeholder="Bairro"
                    inputMode="text"
                    accessible
                    accessibilityLabel="Bairro"
                    accessibilityHint="Edite o bairro do local"

                  />
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    onChangeText={setEndereco}
                    value={endereco}
                    placeholder="Endereço"
                    inputMode="text"
                    accessible
                    accessibilityLabel="Endereço"
                    accessibilityHint="Edite o endereço do local"
                  />
                </View>

                <TouchableOpacity
                  style={styles.button}
                  accessibilityRole="button"
                  accessibilityLabel="Salvar alterações"
                  accessibilityHint="Salva as alterações feitas neste local"
                  onPress={() => {
                    const data = {
                      id: local.id,
                      nome,
                      bairro,
                      endereco,
                      createdAt: local.createdAt
                    };
                    handleUpdate(
                      data
                    )
                  }}>
                  <Text style={styles.buttonText}>Salvar Alterações</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

