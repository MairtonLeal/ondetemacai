import { Text, View, StyleSheet, Alert, TextInput, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, Dimensions, useWindowDimensions } from 'react-native';
import React, { useState } from "react";
import { Local } from '../../../domain/models/Local';
import { LocalRepositoryFirestore } from '../../../domain/repositories/LocalRepositoryFirestore';
import { Timestamp } from "firebase/firestore";
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { COLORS } from '../../theme/color';
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

const CreateLocalSreen = () => {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const repository = new LocalRepositoryFirestore();
  const navigation = useNavigation();

  const handleSaveLocal = async () => {
    // Alerta de confirmação, já é acessível, então não precisa adicionar acessibilidade
    Alert.alert(
      "Confirmar Cadastro",
      `Deseja realmente salvar este local?\n\nNome: ${nome}\nBairro: ${bairro}\nEndereço: ${endereco}`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: async () => {
            try {
              const novoLocal = new Local({
                nome: nome,
                endereco: endereco,
                bairro: bairro,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
              });

              const id = await repository.create(novoLocal);
              Alert.alert("Sucesso", "Local criado com sucesso");
              setNome("");
              setEndereco("");
              setBairro("");
              backScreen();
            } catch (error) {
              console.error(error);
              Alert.alert("Erro", "Não foi possível salvar");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const backScreen = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View
        accessible={true}
        accessibilityRole="header"
        accessibilityLabel="Cabeçalho da tela: Novo Local"
        style={styles.header}>
        <TouchableOpacity
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
          accessibilityHint="Volta para a tela anterior"
          onPress={backScreen}>
          <Feather name="chevron-left" size={28} color={COLORS.text} />
        </TouchableOpacity>
        <Text
          accessible={true}
          accessibilityRole="header"
          accessibilityLabel="Novo Local"
          style={styles.headerTitle}>Novo Local</Text>
        <View style={{ width: 28 }} />
      </View>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        accessible={false} // o container principal não precisa ser lido
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          <View
            accessible={true}
            accessibilityRole="text"
            accessibilityLabel="Preencha os campos"
            style={styles.containerTitle}>
            <Text style={styles.title}>
              Preencha os Campos
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={setNome}
              value={nome}
              placeholder='Nome'
              inputMode='text'
              accessible={true}
              accessibilityLabel="Campo Nome"
              accessibilityHint="Digite o nome do local"
              returnKeyType="next"
            />

          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={setBairro}
              value={bairro}
              placeholder='Bairro'
              inputMode='text'
              accessible={true}
              accessibilityLabel="Campo Bairro"
              accessibilityHint="Digite o bairro do local"
              returnKeyType="next"
            />

          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={setEndereco}
              value={endereco}
              placeholder='Endereço'
              inputMode='text'
              accessible={true}
              accessibilityLabel="Campo Endereço"
              accessibilityHint="Digite o endereço do local"
              returnKeyType="done"
            />

          </View>
          <TouchableOpacity
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Cadastrar Local"
            accessibilityHint="Salva os dados do novo local"
            onPress={handleSaveLocal} style={styles.button}>
            <Text style={styles.buttonText}>
              Cadastrar Local
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateLocalSreen;

