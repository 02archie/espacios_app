import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Image, Text, View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { RootStackParams } from '../navigation/Navigation';

import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';
import Icon from 'react-native-vector-icons/Ionicons';

const screenHeight = Dimensions.get('screen').height;



interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> { };

export const DetailScreen = ({ route, navigation }: Props) => {

    const movie = route.params;
    const uri = `https://www.educaciontrespuntocero.com/wp-content/uploads/2020/04/El-mago-de-Oz-768x496.jpg.webp`;

    const { isLoading, cast, movieFull } = useMovieDetails(movie.id);


    return (

        <ScrollView style={styles.backgroundComponent} >
            <View style={styles.imageContainer}>
                <View style={styles.imageBorder}>
                    <Image
                        source={{ uri }}
                        style={styles.posterImage}
                    />
                </View>
            </View>

            <View style={styles.marginContainer}>
                <Text style={styles.subTitle}>{movie.original_title}</Text>
                <Text style={styles.title}>{movie.title}</Text>
            </View>


            {
                isLoading
                    ? <ActivityIndicator size={35} color="grey" style={{ marginTop: 20 }} />
                    : <MovieDetails movieFull={movieFull!} cast={cast} />
            }

            {/* Boton para cerrar */}
            <View style={styles.backButton}>
                <TouchableOpacity
                    onPress={() => navigation.pop()}
                >
                    <Icon
                        color="white"
                        name="arrow-back-outline"
                        size={60}
                    />
                </TouchableOpacity>
            </View>


        </ScrollView>
    )
}


const styles = StyleSheet.create({
    backgroundComponent: {
        backgroundColor:'#02152E'
    },
    imageContainer: {
        backgroundColor: '#02152Ed',
        // overflow: 'hidden',
        width: '100%',
        height: screenHeight * 0.7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,

        elevation: 9,
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25
    },

    imageBorder: {
        flex: 1,
        overflow: 'hidden',
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25
    },
    posterImage: {
        flex: 1,
    },

    marginContainer: {
        marginHorizontal: 20,
        marginTop: 20
    },
    subTitle: {
        fontSize: 16,
        opacity: 0.8,
        color:'white'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color:'white'
    },
    backButton: {
        position: 'absolute',
        zIndex: 999,
        elevation: 9,
        top: 30,
        left: 5,
    }
});