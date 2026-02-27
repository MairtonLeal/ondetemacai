import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, FlatList, Text, ActivityIndicator, View, Button, TouchableOpacity, Linking, TextInput } from "react-native";
import { styles } from "./styles";
import { Local } from "../../../domain/models/Local";
import { LocalRepositoryFirestore } from "../../../domain/repositories/LocalRepositoryFirestore";
import { AcaiCard } from "../components/AcaiCard";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { COLORS } from "../../theme/color";
import { Share } from "react-native";

export default function HomeScreen() {
  const [locais, setLocais] = useState<Local[]>([]);
  const repository = new LocalRepositoryFirestore();
  const [loading, setLoading] = useState(true);
  const navigation: any = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredLocais, setFilteredLocais] = useState<Local[]>([]);


  const handleOpenMaps = (item: Local) => {
    const enderecoCompleto = `${item.nome}, ${item.endereco}, ${item.bairro}`;
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(enderecoCompleto)}`;

    Linking.openURL(mapsUrl)
      .catch(err => console.error('Erro ao abrir o Google Maps:', err));
  };

  const handleShare = async (item: Local) => {
    try {
      await Share.share({
        message: `📍 ${item.nome}
        Bairro: ${item.bairro}
        Endereço: ${item.endereco}`,
      });
    } catch (error) {
      console.error("Erro ao compartilhar:", error);
    }
  };

  const handleCreate = () => {
    navigation.navigate('Create');
  }

  const handleDetails = (item: Local) => {
    navigation.navigate("Details", { local: item })
  }

  const load = async () => {
    try {
      const data = await repository.findAll();
      setLocais(data);
      setFilteredLocais(data);

    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      load();

      return () => {
        isActive = false; // cancela atualização se sair da tela durante a requisição
      };
    }, [])
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };
  

const handleSearchPress = () => {
  const text = search.trim();

  if (!text) {
    // Se vazio, mostra todos
    setFilteredLocais(locais);
    return;
  }

  const filtered = locais.filter(
    item =>
      item.nome.toLowerCase().includes(text.toLowerCase()) ||
      item.bairro.toLowerCase().includes(text.toLowerCase())
  );

  setFilteredLocais(filtered);
};

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text>Carregando locais...</Text>
      </View>
    );
  }
  return (
    <View   accessible={false} 
    style={{ 
      flex: 1,
       backgroundColor: '#fff'
        }}>
      <View 
        accessibilityRole="search"
        accessibilityLabel="Campo de busca por nome ou bairro"
      style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar por nome ou bairro..."
          value={search}
          style={styles.searchInput}
          onChangeText={setSearch}
          returnKeyType="search"
          onSubmitEditing={handleSearchPress}
          accessible={true}
          accessibilityLabel="Digite o nome ou bairro para buscar"
          accessibilityHint="Pressione Enter ou o botão de busca para filtrar a lista"
        />
        <TouchableOpacity 
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Buscar locais"
        accessibilityHint="Filtra os locais pelo texto digitado"
        onPress={handleSearchPress}>
        <MaterialIcons name="search" size={24} color={COLORS.grey} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredLocais}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <AcaiCard local={item}
            onPressMap={() => handleOpenMaps(item)}
            onPressShare={() => handleShare(item)}
            onPressOptions={() => handleDetails(item)}

          />
        )}
        contentContainerStyle={[
          { paddingBottom: 100 } // espaço do FAB
        ]}
        accessibilityRole="list"
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListEmptyComponent={
          <View 
          accessible={true}
        accessibilityRole="text"
        accessibilityLiveRegion="polite"
          style={styles.emptyContainer}>
            <MaterialIcons name="not-listed-location" size={100} 
            accessibilityElementsHidden
            importantForAccessibility="no"
            color={COLORS.text} />
          <Text
            accessibilityRole="text"
            accessibilityLiveRegion="polite"
            style={styles.emptyText}>
            Nenhum local encontrado ou cadastrado ainda.
          </Text>
          </View>
        }
      />
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Cadastrar novo local"
        accessibilityHint="Abre a tela para cadastrar um novo local"
        style={styles.fab}
        onPress={handleCreate}>
        <MaterialIcons
          accessibilityElementsHidden
          importantForAccessibility="no"
          name="add-location-alt"
          size={24} color="#fff" />

      </TouchableOpacity>
    </View>
  );
}

