import React from 'react';
import { ActivityIndicator, Dimensions, View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Carousel from 'react-native-snap-carousel';

import { MoviePoster } from '../components/MoviePoster';
import { useMovies } from '../hooks/useMovies';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { NavigationBar } from 'navigationbar-react-native';


const { width: windowWidth } = Dimensions.get('window');

export const HomeScreen = () => {

    const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies();
    const { top } = useSafeAreaInsets();
   

    if ( isLoading ) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                <ActivityIndicator color="red" size={ 100 } />
            </View>
        )
    }


    return (

        <ScrollView>
            <View style={{ marginTop: top + 20 , backgroundColor: '#02152E'}}>
                {/* Carosel Principal */}
                <View style={{ height: 440 }}>
                    <Carousel 
                        data={ nowPlaying }
                        renderItem={ ({ item }: any) => <MoviePoster movie={ item } /> }
                        sliderWidth={ windowWidth }
                        itemWidth={ 300 }
                        inactiveSlideOpacity={0.9}
                    />
                </View>

                {/* obras populares */}
                <HorizontalSlider title="Obras populares" movies={ popular } />
                <HorizontalSlider title="Mejores Obras" movies={ topRated } />
                <HorizontalSlider title="Proximamente" movies={ upcoming } />


            </View>
        </ScrollView>
    )
}
