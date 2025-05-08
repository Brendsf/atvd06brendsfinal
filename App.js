import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { Button, Avatar, SearchBar } from '@rneui/themed'; 
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Rating } from 'react-native-ratings';

export default function MenuClinica() {
  const [usuarios, setUsuarios] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [doutores, setDoutores] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/usuarios')
      .then(res => res.json())
      .then(data => setUsuarios(data));

    fetch('http://localhost:3000/servicos')
      .then(res => res.json())
      .then(data => setServicos(data));

    fetch('http://localhost:3000/doutores')
      .then(res => res.json())
      .then(data => setDoutores(data));
  }, []);

  return (
    <ScrollView style={styles.container}>

      {usuarios.length > 0 && (
        <View style={styles.avatar}>
          <Image
            source={{ uri: usuarios[0].foto }}
            style={{ width: 80, height: 80, borderRadius: 40, marginRight: 10 }}
          />
          <Text style={styles.legendaAvatar}>{usuarios[0].nome}</Text>
        </View>
      )}

      <View>
        <Text style={styles.legendaAvatar}>Serviços:</Text>
        <View style={styles.botoes}>
          {servicos.map(servico => (
            <View key={servico.id} style={styles.botao}>
              <Image
                source={{ uri: servico.icon }}
                style={{ width: 40, height: 40, marginBottom: 5 }}
              />
              <Text style={styles.legendaBotao}>{servico.titulo}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.topDoutores}>
        <Text style={styles.legendaAvatar}>Top Doutores</Text>
        {doutores.map(doutor => (
          <View key={doutor.id} style={styles.doutor}>
            <Avatar size={80} rounded source={{ uri: doutor.foto }} />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.nomeDoutores}>{doutor.nome}</Text>
              <Text style={styles.descriDoutores}>{doutor.especializacao}</Text>
              <Rating 
                type="star" ratingCount={5} imageSize={20} readonly startingValue={doutor.rating}
              />
            </View>
          </View>
        ))}
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fce4ec',
    padding: 16,
  },
  avatar: {
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  legendaAvatar: {
    fontSize: 20,
    color: '#ec407a',
    fontWeight: 'bold',
  },
  barraPesquisa: {
    marginBottom: 20,
  },
  botoes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  botao: {
    backgroundColor: '#f48fb1',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    width: 100,
    height: 100,
    justifyContent: 'center',
  },
  legendaBotao: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  topDoutores: {
    marginTop: 40,
    marginBottom: 20,
  },
  nomeDoutores: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ec407a',
  },
  descriDoutores: {
    fontSize: 14,
    color: '#f48fb1',
    marginBottom: 10,
  },
  doutor: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
});
