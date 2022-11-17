import React, {useState, useEffect} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    Alert,
} from 'react-native';

import {Picker} from '@react-native-picker/picker'
import axios from 'axios';

const Formulario = ({moneda, criptoMoneda, setMoneda, setCriptoMoneda, setConsultarAPI}) =>{


    const [criptoMonedas, setCriptoMonedas] = useState ([])
    
    useEffect(()=>{
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            const resultado = await axios.get(url)
            setCriptoMonedas(resultado.data.Data)
        }
        consultarAPI()
    },[])

    const obtenerMoneda = moneda => {
        setMoneda(moneda)
    }

    const obtenerCriptomoneda = cripto => {
        setCriptoMoneda(cripto)
    }

    const cotizarPrecio = () => {
        if(moneda.trim() === '' || criptoMoneda.trim() === ''){
            mostratAlerta()
            return
        }

        //Cambiar el state de consultar API
        setConsultarAPI(true)
    }

    const mostratAlerta = () =>{
        Alert.alert(
            'Error...',
            'Ambos campos son obligatorios',
            [
                {text: 'OK'}
            ]

        )
    }

    return (
        <View>
            <Text style = {styles.label}>Moneda</Text>
            <Picker
                selectedValue={moneda}
                onValueChange={moneda => obtenerMoneda(moneda)}
                itemStyle = {{height: 120}}
            >
                <Picker.Item label='- Selecione -' value={''}/>
                <Picker.Item label='Dolar USA' value={'USD'}/>
                <Picker.Item label='Euro' value={'EUR'}/>
                <Picker.Item label='Libra Esterlina' value={'GBP'}/>
                <Picker.Item label='Peso Colombiano' value={'COP'}/>
            </Picker>
            
            <Text style = {styles.label}>CriptoMoneda</Text>
            <Picker
                selectedValue={criptoMoneda}
                onValueChange={cripto => obtenerCriptomoneda(cripto)}
                itemStyle = {{height: 120}}
            >
                <Picker.Item label='- Selecione -' value={''}/>
                {criptoMonedas.map(cripto =>(
                    <Picker.Item key={cripto.CoinInfo.Id} label= {cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name}/>
                ))}
            </Picker>

            <TouchableHighlight
                style = {styles.btnCotizar}
                onPress = {() => cotizarPrecio()}
            >
                <Text style = {styles.textoCotizar}>Cotizar</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        fontSize: 22,
        marginVertical: 20,
    },
    btnCotizar:{
        backgroundColor: '#5E49E2',
        padding: 10,
        marginTop: 20,
    },
    textoCotizar:{
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        textAlign: 'center',

    },
})

export default Formulario