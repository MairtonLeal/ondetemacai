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

//   { nome: "Açaí do Gaia", endereco: "Avenida Conselheiro Furtado, 3105", bairro: "Batista Campos", licenciado: true },
//   { nome: "Açaí K", endereco: "Avenida Serzedelo Correa, 305", bairro: "Batista Campos", licenciado: true },
//   { nome: "Açaí do Batista", endereco: "Rua Serzedelo Correa, 861", bairro: "Batista Campos", licenciado: true },
//   { nome: "Ivaneide Wanzeler dos Santos", endereco: "Passagem Mirandinha, 157", bairro: "Barreiro", licenciado: true },
//   { nome: "Açaí do Guido", endereco: "Rua do Japonês, 3-A", bairro: "Bengui", licenciado: true },
//   { nome: "Bengui Açaí", endereco: "Rua São Pedro, 204", bairro: "Bengui", licenciado: true },
//   { nome: "Grupo Açaí 2 Irmãos LTDA", endereco: "Rua Principal, 62", bairro: "Cabanagem", licenciado: true },
//   { nome: "Açaí do Ronaldo", endereco: "Rua Morada dos Ventos, 29", bairro: "Cabanagem", licenciado: true },
//   { nome: "Açaí Duelvis Nature", endereco: "Travessa Henrique Dias, 166", bairro: "Cabanagem", licenciado: true },
//   { nome: "Leidiane dos Santos Meireles da Silva", endereco: "Avenida Brasil, 100", bairro: "Cabanagem", licenciado: true },
//   { nome: "Açaí da Galeria", endereco: "Av. Presidente Vargas, 560", bairro: "Campina", licenciado: true },
//   { nome: "Açaí do Cascaes", endereco: "Rua Carlos Gomes, 193", bairro: "Campina", licenciado: true },
//   { nome: "Luiz Vanderlei Novaes Ferreira", endereco: "Rua Carlos Gomes, 93", bairro: "Campina", licenciado: true },
//   { nome: "Açaí de Ponta", endereco: "Rua Doutor Silva Rosa, 692", bairro: "Canudos", licenciado: true },
//   { nome: "Açaí do Yan", endereco: "Rua Roso Danin, 1099", bairro: "Canudos", licenciado: true },
//   { nome: "Cantinho do Açaí", endereco: "Rua Euclides da Cunha, 126-A", bairro: "Castanheira", licenciado: true },
//   { nome: "Açaí Passagem", endereco: "Lopo de Castro, 47", bairro: "Cidade Velha", licenciado: true },
//   { nome: "Açaí do Honorato", endereco: "Rua São Boaventura, 11", bairro: "Cidade Velha", licenciado: true },
//   { nome: "Sueli Pinheiro Correa", endereco: "Rua Ângelo Custódio, 585", bairro: "Cidade Velha", licenciado: true },
//   { nome: "Mais Açaí", endereco: "Travessa de Breves, 518", bairro: "Cidade Velha", licenciado: true },
//   { nome: "Açaí do Cardoso", endereco: "Av. Roberto Camelier, 1850", bairro: "Condor", licenciado: true },
//   { nome: "Açaí da Kiki", endereco: "Av. Alcindo Cacela, 3874", bairro: "Condor", licenciado: true },
//   { nome: "Açaí do Simão", endereco: "Rua Nova, 1ª, 430", bairro: "Condor", licenciado: true },
//   { nome: "Açaí do Davi", endereco: "Avenida Roberto Camelier, 1967", bairro: "Condor", licenciado: true },
//   { nome: "Açaí do Zé", endereco: "Travessa dos Tupinambás, 2084", bairro: "Condor", licenciado: true },
//   { nome: "Açaí do Zé", endereco: "Travessa Nove de Janeiro, 3116", bairro: "Condor", licenciado: true },
//   { nome: "Açaí do Zeca", endereco: "Travessa dos Tupinambás, 1555", bairro: "Condor", licenciado: true },
//   { nome: "Açaí do Magrão", endereco: "Rua Lauro Malcher, 3370", bairro: "Condor", licenciado: true },
//   { nome: "Açaí do Zé", endereco: "Avenida Roberto Camelier, 1919, Ap 100", bairro: "Condor", licenciado: true },
//   { nome: "Açaí Mano a Mano", endereco: "Conjunto Satélite WE-8", bairro: "Coqueiro", licenciado: true },
//   { nome: "Grupo Açaí Salmo 23", endereco: "Tv. WE 8, Conjunto Satélite, 595", bairro: "Coqueiro", licenciado: true },
//   { nome: "Açaí Pirâmide", endereco: "Conjunto Jardim Maguari, 45, Alameda 3", bairro: "Coqueiro", licenciado: true },
//   { nome: "Açaí do Abraão Satélite", endereco: "Travessa WE9 - Conjunto Satélite, 656", bairro: "Coqueiro", licenciado: true },
//   { nome: "Açaí do Josenil", endereco: "Rua dos Mundurucus, 2516", bairro: "Cremação", licenciado: true },
//   { nome: "Açaí da Nita", endereco: "Rua São Miguel, S/N, Box 2", bairro: "Cremação", licenciado: true },
//   { nome: "Antônio Augusto da Costa", endereco: "Travessa 14 de março, 2629", bairro: "Cremação", licenciado: true },
//   { nome: "Açaí do Rodrigol", endereco: "Travessa 14 de março, 3162", bairro: "Cremação", licenciado: true },
//   { nome: "Yann Wesche de Mattos Faria", endereco: "Avenida Fernando Guilhon, 783-B", bairro: "Cremação", licenciado: true },
//   { nome: "Açaí da Zaira", endereco: "Rua Fernando Guilhon, 1963", bairro: "Cremação", licenciado: true },
//   { nome: "Açaí do André", endereco: "Rua dos Timbiras, 2577", bairro: "Cremação", licenciado: true },
//   { nome: "Açaí do Anderson", endereco: "Avenida Doutor Freitas, 3361", bairro: "Curioutinga", licenciado: true },
//   { nome: "Glória a Deus Nosso Açaí", endereco: "Passagem Napoleão Laureano, 198", bairro: "Guamá", licenciado: true },
//   { nome: "Açaí do Júnior", endereco: "Passagem Mucajás, 70", bairro: "Guamá", licenciado: true },
//   { nome: "Açaí do Lobão", endereco: "Travessa Castelo Branco, 50 - Casa B", bairro: "Guamá", licenciado: true },
//   { nome: "Açaí do Papi", endereco: "Passagem Monte Serrat, 50", bairro: "Guamá", licenciado: true },
//   { nome: "Açaí do Dedel", endereco: "Avenida José Bonifácio, 2653 A", bairro: "Guamá", licenciado: true },
//   { nome: "Açaí da Japonesa", endereco: "Travessa 25 de junho, 164 - A", bairro: "Guamá", licenciado: true },
//   { nome: "Açaí do Naldo", endereco: "Avenida José Bonifácio, 2648", bairro: "Guamá", licenciado: true },
//   { nome: "Açaí Bool", endereco: "Vila Monte Serrat, 03 - Frente", bairro: "Guamá", licenciado: true },
//   { nome: "Açaí do Paulo", endereco: "Avenida José Bonifácio, 2348", bairro: "Guamá", licenciado: true },
//   { nome: "Açaí Especial do Irmão", endereco: "Travessa Mucajás, 08", bairro: "Guamá", licenciado: true },
//   { nome: "Açaí do Diel", endereco: "Passagem Rui Barbosa, 153", bairro: "Guamá", licenciado: true },
//   { nome: "Valmir Coutinho David", endereco: "Rua Silva Castro, 550", bairro: "Guamá", licenciado: true },
//   { nome: "Maria Cristolange Alves Wanzeler", endereco: "Travessa Guerra Passos, 1119", bairro: "Guamá", licenciado: true },
//   { nome: "Açaí da Rosa", endereco: "Passagem São José de Ribamar, 86", bairro: "Icoaraci", licenciado: true },
//   { nome: "Distribuidora de Açaí Deus é fiel", endereco: "Rua 8 de Maio, 585", bairro: "Icoaraci", licenciado: true },
//   { nome: "Vitaminosa do Baixinho", endereco: "Trav. De Breves, 1250", bairro: "Jurunas", licenciado: true },
//   { nome: "Açaí do Dinho", endereco: "Ps. Moura Carvalho, 02 - Entrada Vila Nova", bairro: "Jurunas", licenciado: true },
//   { nome: "Açaí do JN", endereco: "Trav. Dos Tupinambás, 561", bairro: "Jurunas", licenciado: true },
//   { nome: "Açaí do Preto", endereco: "Rua dos Caripunas, 728", bairro: "Jurunas", licenciado: true },
//   { nome: "Açaí da Ju", endereco: "Travessa Monte Alegre, 1412", bairro: "Jurunas", licenciado: true },
//   { nome: "Ivanildo Brabo Soares", endereco: "Rua dos Pariquis, 198", bairro: "Jurunas", licenciado: true },
//   { nome: "Açaí do Cream", endereco: "Rua São Miguel, 58, QD C", bairro: "Jurunas", licenciado: true },
//   { nome: "Super Açaí da Ilha", endereco: "Passagem Jacob, 14", bairro: "Jurunas", licenciado: true },
//   { nome: "La Fabrica de Açaí LTDA", endereco: "Avenida Roberto Camelier, 284", bairro: "Jurunas", licenciado: true },
//   { nome: "Tomy Açaí", endereco: "Avenida Engeheiro Fernando Guilhon, 962", bairro: "Jurunas", licenciado: true },
//   { nome: "Açaí do Jaime", endereco: "Rua dos Timbiras, 349", bairro: "Jurunas", licenciado: true },
//   { nome: "Açaí do Francisco", endereco: "Rua dos Tamoios, 86", bairro: "Jurunas", licenciado: true },
//   { nome: "Açaí da Mônica", endereco: "Passagem Liberdade, 151", bairro: "Jurunas", licenciado: true },
//   { nome: "Açai do Mundinho", endereco: "Avenida Bernardo Sayão, 1921", bairro: "Jurunas", licenciado: true },
//   { nome: "Ponto da Benção", endereco: "Travessa Monte Alegre, 124", bairro: "Jurunas", licenciado: true },
//   { nome: "Açaí do Pastor", endereco: "Avenida Roberto Camelier, 1599", bairro: "Jurunas", licenciado: true }
//   // continue a lista até o último item...
// ];

//  const createAllLocais = async () => {
//   setLoading(true);
//   try {
//     const createdLocais: Local[] = [];

//     // Percorre o array de dados crus
//     for (const data of locaisData) {
//       // Cria uma instância de Local
//       const local = new Local({
//         nome: data.nome,
//         endereco: data.endereco,
//         bairro: data.bairro,
//         licenciado: data.licenciado,
//         createdAt: Timestamp.fromDate(new Date()),
//         updatedAt: Timestamp.fromDate(new Date()),
//       });

//       // Salva no Firestore
//       const id = await repository.create(local);
//       local.id = id; // adiciona o id retornado pelo Firestore
//       createdLocais.push(local);
//     }

//     // Atualiza estado para exibir no FlatList
//     setLocais(createdLocais);
//     console.log(`Criados ${createdLocais.length} locais com sucesso!`);
//   } catch (error) {
//     console.error("Erro ao criar locais:", error);
//   } finally {
//     setLoading(false);
//   }
// };