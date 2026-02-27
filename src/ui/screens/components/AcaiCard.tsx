import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, useWindowDimensions, Dimensions } from 'react-native';
import { FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons';
import { Local } from '../../../domain/models/Local';
import Logo from './../../../assets/images/Flag.svg';


interface Props {
  local: Local;
  onPressMap?: () => void;
  onPressShare?: () => void;
  onPressOptions?: () => void;
}

const { width } = Dimensions.get('window');

export const AcaiCard: React.FC<Props> = ({ local,
  onPressMap, onPressShare, onPressOptions }) => {

  const { width } = useWindowDimensions();

  return (
    <View
      style={[styles.container, { width: width * 0.95 }]}>
      <View
        accessibilityElementsHidden
        importantForAccessibility="no"
        style={styles.iconContainer}>
        <Logo width={24} height={24} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}
          accessibilityRole="header"
          numberOfLines={1}>
          {local.nome}
        </Text>
        <Text style={styles.subtitle}>
          {local.bairro}
        </Text>
        <Text style={styles.address}>
          {local.endereco}
        </Text>
      </View>

      {/* Lado Direito: Ações */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={`Abrir ${local.nome} no mapa`}
          accessibilityHint="Abre o aplicativo de mapas com a localização"
          onPress={onPressMap} style={styles.actionButton}>
          <Image
            source={require('../../../assets/images/icon-mapa2.png')}
            resizeMode="contain"
            accessibilityElementsHidden
            importantForAccessibility="no"
          />
        </TouchableOpacity>

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={`Compartilhar ${local.nome}`}
          accessibilityHint="Abre as opções de compartilhamento"
          onPress={onPressShare} style={styles.actionButton}>
          <Entypo accessibilityElementsHidden
            importantForAccessibility="no"
            name="share-alternative"

            size={20} color="#757575" />
        </TouchableOpacity>

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={`Mais opções para ${local.nome}`}
          accessibilityHint="Abre o menu de opções"
          onPress={onPressOptions} style={styles.actionButton}>
          <Entypo
            accessibilityElementsHidden
            importantForAccessibility="no"
            name="dots-three-horizontal"

            size={20} color="#757575" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: '#C4C4C4',

    marginVertical: 10,
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#FCE4EC',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#EF476F',
    marginTop: 2,
  },
  address: {
    fontSize: 12,
    color: '#BDBDBD',
    marginTop: 2,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
});

