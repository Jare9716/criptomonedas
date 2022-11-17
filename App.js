
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  ActivityIndicator

} from 'react-native';

import Header from './components/Header';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';

import axios from 'axios';

const App= () => {

  const [moneda, setMoneda] = useState ('')
  const [criptoMoneda, setCriptoMoneda] = useState ('')
  const [consultarAPI, setConsultarAPI] = useState (false)
  const [resultado, setResultado] = useState ({});
  const [cargando, setCargando] = useState(false)
  
  useEffect(()=>{

    const cotizarCriptomoneda = async ()=>{
      if(consultarAPI){
        //Consultar la API para obtener la cotización
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`  
        const resultado = await axios.get(url)

        console.log(resultado.data.DISPLAY[criptoMoneda][moneda])

        setCargando(true)
        // Ocultar el spinner y mostrar el resultado
        setTimeout(() => {
          setResultado(resultado.data.DISPLAY[criptoMoneda][moneda])
          setConsultarAPI(false)
          setCargando(false)
        }, 300);
      }
    }
    cotizarCriptomoneda()
  },[consultarAPI])

  //mostrar el spinner o resultado esta finción es llamada dentro del return y actua como cotización 
  const componente = cargando ? <ActivityIndicator size={'large'} color = '#5E49E2'/> : 
    <Cotizacion
    resultado={resultado}
    />

  return (
    <>
      <ScrollView>
        <Header />

        <Image
          style = {styles.imagen}
          source = {require('./assets/img/cryptomonedas.png')}
        />

        <View style = {styles.contenido}>
          <Formulario
            moneda = {moneda}
            criptoMoneda = {criptoMoneda}
            setMoneda = {setMoneda}
            setCriptoMoneda = {setCriptoMoneda}
            setConsultarAPI = {setConsultarAPI}
          />
        
        </View>
        <View style = {{marginTop: 40}}>
          {componente}
        </View>
        
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%'
  },
  contenido:{
    marginHorizontal: '2.5%',
  },

});

export default App;
