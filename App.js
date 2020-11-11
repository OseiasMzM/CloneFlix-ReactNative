import React, { useState, useRef } from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions, ImageBackground, StatusBar,
TextInput, TouchableOpacity, Image, Alert } from 'react-native';

import { LinearTextGradient } from "react-native-text-gradient";

import Carousel from 'react-native-snap-carousel';

import Icon from 'react-native-vector-icons/MaterialIcons';



const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export default function App() {
  const [lista, setLista] = useState([
    {
        title:"O Justiceiro",
        text: "Após o assassinato de sua família, Frank Castle está traumatizado e sendo caçado. No submundo do crime, ele se tornará aquele conhecido como O Justiceiro",
        release: 2018,
        img: 'https://sujeitoprogramador.com/wp-content/uploads/2020/05/background.jpg'
    },
    {
        title:"Bad Boys for life",
        text: "Terceiro episódio das histórias dos policiais Burnett (Martin Lawrence) e Lowrey (Will Smith), que devem encontrar e prender os mais perigosos traficantes de drogas da cidade.",
        release: 2020,
        img: 'https://sujeitoprogramador.com/wp-content/uploads/2020/05/badboy.jpg'
    },
    {
        title:"Viúva Negra",
        text: "Em Viúva Negra, após seu nascimento, Natasha Romanoff (Scarlett Johansson) é dada à KGB, que a prepara para se tornar sua agente definitiva.",
        release: 2020,
        img: 'https://sujeitoprogramador.com/wp-content/uploads/2020/05/blackwidow.jpg'
    },
    {
        title:"Top Gun: MAVERICK",
        text: "Em Top Gun: Maverick, depois de mais de 30 anos de serviço como um dos principais aviadores da Marinha, o piloto à moda antiga Maverick (Tom Cruise) enfrenta drones e prova que o fator humano ainda é fundamental no mundo contemporâneo das guerras tecnológicas.",
        release: 2020,
        img: 'https://sujeitoprogramador.com/wp-content/uploads/2020/05/topgun.jpeg'
    },
    {
        title:"BloodShot",
        text: "Bloodshot é um ex-soldado com poderes especiais: o de regeneração e a capacidade de se metamorfosear. ",
        release: 2020,
        img: 'https://sujeitoprogramador.com/wp-content/uploads/2020/05/blood.jpg'
    },
    {
        title:"Free Guy",
        text: "Um caixa de banco preso a uma entediante rotina tem sua vida virada de cabeça para baixo quando ele descobre que é personagem em um brutalmente realista vídeo game de mundo aberto.",
        release: 2020,
        img: 'https://sujeitoprogramador.com/wp-content/uploads/2020/05/freeguy.jpg'
    },
  ]);

  const [background, setBackground] = useState(lista[0].img);
  
  const carouselRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const _renderItem = ({ item, index }) => {
    return (
      <View>

        <TouchableOpacity>
          <Image
            source = {{uri: item.img}}
            style = {styles.carouselImg}
          />
          <Text style = {styles.carouselText}>{item.title}</Text>
          <Icon
            name="play-circle-outline"
            size={30} color = "#fff"
            style = {styles.carouselIcon}  
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style = {styles.container}>
    <StatusBar barStyle = "light-content" hidden = {false}  backgroundColor = "#181818" />
        <View style = {{flex: 1, height: screenHeight}}>
            <View style = {{...StyleSheet.absoluteFill, BackgroundColor: '#22222a'}}>
                <ImageBackground
                source = {{ uri: background}}
                style={styles.imgBg}
                blurRadius = {4.5}
                >
                  <View style = {styles.viewSearch}>
                    <TextInput
                      style = {styles.input}
                      placeholder = "Procurar filmes"
                    />
                    <TouchableOpacity style = {styles.icon}>
                      <Icon name="search" color="#000" size={25}></Icon>
                    </TouchableOpacity>
                  </View>

                  <Text
                  style = {{color: '#fff', fontSize: 25, fontWeight: 'bold', marginLeft: 10, marginVertical: 10,}}
                  >
                    Novidades
                  </Text>

                  <View style = {styles.slideView}>
                    <Carousel
                      style={styles.carousel}
                      ref={carouselRef}
                      data={lista}
                      renderItem={_renderItem}
                      sliderWidth={screenWidth}
                      itemWidth={200}
                      inactiveSlideOpacity={0.5}
                      onSnapToItem = { (index) => {
                        setBackground(lista[index].img);
                        setActiveIndex(index);
                      }}
                    />
                  </View>
                  
                  <View style = {styles.moreInfo}>
                      <View style = {{marginTop: 10}}>
                        

                        <LinearTextGradient
                          style = {styles.movieTitle}
                          locations={[0, 1]}
                          colors={['#f2ffb6', '#10d164']}
                          start={{ x: 0, y: 1}}
                          end={{ x: 1, y: 0}}
                        >
                          <Text style={styles.movieTitle}>{lista[activeIndex].title}</Text>
                        </LinearTextGradient> 
                        
                        <Text style={styles.movieDesc}>{lista[activeIndex].text}</Text>
                      </View>
                      
                      <TouchableOpacity
                        style = {{marginRight: 35, marginTop: 10}}
                        onPress = { () => Alert.alert('','Filme adicionado aos favoritos')}
                      >
                        <Icon name="queue" 
                          color="#fff"
                          size={30} 
                        />

                      </TouchableOpacity>


                  </View>

                </ImageBackground>
            </View>
        </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgBg: {
    flex: 1,
    width: null,
    height: null,
    opacity: 1,
    justifyContent: "flex-start",
    backgroundColor: "#17161c",
  },
  viewSearch: {
    marginTop: 20,
    backgroundColor: '#fff',
    elevation: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '95%',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  input: {
    width: '90%',
    padding: 13,
    paddingLeft: 20,
    fontSize: 17,
  },
  icon: {
    position: 'absolute',
    right: 20,
    top: 15,
  },
  slideView: {
    width: '100%',
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carousel: {
    flex: 1,
    overflow: 'visible',
  },
  carouselImg: {
    alignSelf: 'center',
    width: 200,
    height: 300,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  carouselText: {
    padding: 15,
    color: '#fff',
    position: 'absolute',
    bottom: 10,
    left: 2,
    fontWeight: 'bold',
  },
  carouselIcon: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
  moreInfo: {
    backgroundColor: '#181818',
    width: screenWidth,
    height: screenHeight,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    
  },
  movieTitle: {
    paddingLeft: 50,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  movieDesc: {
    paddingTop: 25,
    paddingLeft: 50,
    color: '#838383',
    fontSize: 14,
    fontWeight: '200',
  }
});
