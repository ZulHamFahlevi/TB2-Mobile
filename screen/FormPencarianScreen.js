import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet} from "react-native";
import { Appbar, Button, TextInput } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import DatePicker from "react-native-datepicker";
import supabase from '../supabase';

function FormPencarianScreen({ navigation}) {
  const [dataPicker, setDataPicker] = useState([]);
  const [asal, setAsal] = useState('');
  const [tujuan, setTujuan] = useState('');
  const [date, setDate] = useState('');
  const [kursi, setKursi] = useState('');

  useEffect(() => {
    getRute();
  }, []);

  //list data picker
  const getRute = async() => {
    const { data, error } = await supabase
                              .from('kota')
                              .select('id_kota, nama_kota')
    console.log(data)
    setDataPicker(data);
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Tiket Kereta Api" color="white" />
        <Appbar.Action icon="bell" color="white" />
        <Appbar.Action icon="dots-vertical" color="white" />
      </Appbar.Header>

      <View style={style.container}>
        <Text style={style.text2}>Dari</Text>
        <Picker //stasiun awal
          style={style.picker}
          selectedValue={asal}
          onValueChange={(value) => setAsal(value)}        
          >
          <Picker.Item label="Kota Asal" value="" />
          {dataPicker.map((row) => 
          <Picker.Item label={row.nama_kota} value={row.id_kota} />
        )}
        </Picker>
        <Text style={style.text2}>Ke</Text>
        <Picker //stasiun tujuan
          selectedValue={tujuan}
          onValueChange={(value) => setTujuan(value)}        
          >
          <Picker.Item label="Kota Asal" value="" />
          {dataPicker.map((row) => 
          <Picker.Item label={row.nama_kota} value={row.id_kota} />
        )}
        </Picker>
       
        <Text style={style.text3}>Tanggal Pergi</Text>
        <DatePicker //tanggal
        style={{width: 350, marginTop: 10, marginBottom:15}}
        date={date}
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 5,
            marginLeft: 7
          }
        }}
          // placeholder='Pilih Tanggal'
          format='YYYY-MM-DD'
          // confirmBtnText='Confirm'
          // cancelBtnText='Cancel'
          onDateChange={(date) => setDate(date)}
        />

        <TextInput
          label="Jumlah Penumpang"
          value={kursi}
          onChangeText={text => setKursi(text)}
          keyboardType="numeric"
        />

        <Button
          mode="contained"
          onPress={() => navigation.navigate("HasilPencarianScreen", 
          {id_kota: asal, id_kota2: tujuan, tanggal: date, kursi: kursi})}

          color="#ed4f1a"
          style={{
            borderRadius: 20,
            marginTop: 20,
            marginHorizontal: 50,
          }}
        >
          Cari
        </Button>
      </View>
    </>
  );
}
const style = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    backgroundColor: "white",
    flex:1
  },
  text: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
  text2: {
    marginLeft: 10,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 20,
    paddingTop: 10,
  },
  text3: {
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 1,
    paddingTop: 10,
  },
});
export default FormPencarianScreen;