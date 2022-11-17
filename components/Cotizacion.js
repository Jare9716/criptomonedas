import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text
} from 'react-native';

//De esta forma se valida si un objeto esta llamado sobre todo a la hora de llamar hooks

const Cotizacion= ({resultado}) => {

    if(Object.keys(resultado).length === 0 ) return null;
    return(
        <View style = {styles.resultado}>
            <Text style ={[styles.texto,styles.precio]}>
                <Text style ={styles.span}>{resultado.PRICE}</Text>
            </Text>
            <Text style ={styles.texto}> Precio mas alto del día: {''}
                <Text style ={styles.span}>{resultado.HIGHDAY}</Text>
            </Text>
            <Text style ={styles.texto}> Precio mas bajo del día: {''}
                <Text style ={styles.span}>{resultado.LOWDAY}</Text>
            </Text>
            <Text style ={styles.texto}> Variación las últimas 24 horas: {''}
                <Text style ={styles.span}>{resultado.CHANGEPCT24HOUR} % </Text>
            </Text>
            <Text style ={styles.texto}> Última actualización: {''}
                <Text style ={styles.span}>{resultado.LASTUPDATE}</Text>
            </Text>
        </View>      
    )
}

const styles = StyleSheet.create({
    resultado:{
        backgroundColor: '#5E49E2',
        padding: 20,
    },
    texto:{
        color: '#FFF',
        fontFamily : 'Lato-Regular',
        fontSize: 18,
        marginBottom: 10,
    },
    precio:{
        fontSize: 38,
    },
    span:{
        fontFamily: 'Lato-Black',
    }
})

export default Cotizacion