import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Appbar, Button } from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import supabase from "../supabase";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

function TiketScreen({ navigation }) {

  const [data, setData] = useState([]);

  //script dijalankan ketika screen diakses
  useEffect(() => {
    getData();
  }, [data]);

  const getData = async () => {
    //data : hasil query, error : pesan error
    const { data, error } = await supabase
      .from('tiket')
      .select('id_tiket, kereta: id_kereta(*), pelanggan:id_pelanggan(*), rute_kereta:id_rute_kereta (*), kota:id_kota(*), kota2: id_kota2(*)')
      // .order('id_kereta, id_pemesan, id_rute', { ascending: false });
    // console.log(data)
    //mengisi state data
    setData(data);
  }

  const onPrint = async(data) => {
    //file content
    let html = `<ul>`;
                //looping data
                data.map((item) => {
                  html += 
                  `<table>
                    <tr>
                      <td> ===============================</td>
                    </tr>
                    <tr>
                      <td>`+ item.kereta.nama_kereta+`(`+item.kereta.kelas_kereta +`)</td>
                    </tr>
                    <tr>
                      <td> Rp `+item.rute_kereta.harga+`</td>
                    </tr>
                    <tr>
                      <td>`+item.kota.nama_kota+`-`+item.kota2.nama_kota+`</td>
                    </tr>
                    <tr>
                      <td>`+item.rute_kereta.jam_berangkat+`-`+item.rute_kereta.jam_sampai+`</td>
                    </tr>
                    <tr>
                      <td>`+item.rute_kereta.tanggal+`</td>
                    </tr>
                    <tr>
                      <td>Pemesan</td>
                    </tr>
                    <tr>
                      <td>Nama : `+item.pelanggan.nama+`</td>
                    </tr>
                    <tr>
                      <td>Jenis Kelamin : `+item.pelanggan.jenis_kelamin+`</td>
                    </tr>
                    <tr>
                      <td>Nomor : `+item.pelanggan.nomor+`</td>
                    </tr>
                  </table>`
                  // console.log(item.kereta)
                })
        html += `</ul>`;


    // export file pdf
    const { uri } = await Print.printToFileAsync({
      html
    });

    //share file
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  }
  const onPrint2 = async(data) => {
    //file content
    console.log(data)
    let html = `<table>`;
    //looping data
      html += 
      `<tr>
          <td> ==============================</td>
        </tr>
        <tr>
          <td>`+ data.kereta.nama_kereta+`(`+data.kereta.kelas_kereta +`)</td>
        </tr>
        <tr>
          <td> Rp `+data.rute_kereta.harga+`</td>
        </tr>
        <tr>
          <td>`+data.kota.nama_kota+`-`+data.kota2.nama_kota+`</td>
        </tr>
        <tr>
          <td>`+data.rute_kereta.jam_berangkat+`-`+data.rute_kereta.jam_sampai+`</td>
        </tr>
        <tr>
          <td>`+data.rute_kereta.tanggal+`</td>
        </tr>
        <tr>
          <td>Pemesan</td>
        </tr>
        <tr>
          <td>Nama : `+data.pelanggan.nama+`</td>
        </tr>
        <tr>
          <td>Jenis Kelamin : `+data.pelanggan.jenis_kelamin+`</td>
        </tr>
        <tr>
          <td>Nomor : `+data.pelanggan.nomor+`</td>
        </tr>
        <tr>
          <td> ==============================</td>
        </tr>`
html += `</table>`;
    // let html = `<ul>`;
    //               html += `<li>`+data.kereta.nama_kereta+`(`+data.kereta.kelas_kereta+`) </li>`;
    //     html += `</ul>`;


    // export file pdf
    const { uri } = await Print.printToFileAsync({
      html
    });

    //share file
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack("")} />
        <Appbar.Content
          title="Info Tiket"
          color="white"
        />
        <Appbar.Action icon="printer" onPress={() => onPrint(data)} />
      </Appbar.Header>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View key={index}>
            <View style={styles.container}>
              <View>
                <View style={styles.container2}> 
                  <Text style={styles.nama_kereta}>{item.kereta.nama_kereta} ({item.kereta.kelas_kereta})</Text>
                  <Text style={{fontSize: 20}}>Rp {item.rute_kereta.harga}</Text>
                </View>
                <View style={styles.container2}>
                  <View>
                    <Text style={styles.fontsize}>{item.kota.nama_kota}</Text>
                    <Text style={{marginLeft: 20}}>|</Text>
                    <Text style={{marginLeft: 20}}>|</Text>
                    <Text style={styles.fontsize}>{item.kota2.nama_kota}</Text>
                  </View>
                  <View style={styles.tanggal}>
                    <Text style={styles.fontsize}>{item.rute_kereta.jam_berangkat} - {item.rute_kereta.jam_sampai} </Text>
                    <Text style={{marginRight: 35}}>|</Text>
                    <Text style={{marginRight: 35}}>|</Text>
                    <Text style={styles.fontsize}>{item.rute_kereta.tanggal}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.container2}>
                <View>
                  <Text style={{fontSize: 20, color:"#f08200"}}>Pemesan</Text>
                  <Text style={styles.fontsize}>Nama                : {item.pelanggan.nama}</Text>
                  <Text style={styles.fontsize}>Jenis kelamin  : {item.pelanggan.jenis_kelamin}</Text>
                  <Text style={styles.fontsize}>Nomor               : {item.pelanggan.nomor}</Text>
                </View>
                <View style={styles.print}>
                  <Text> </Text>
                  <Text> </Text>
                  <MaterialCommunityIcons 
                    name="printer" 
                    size={24} 
                    color="black"
                    onPress={() => onPrint2(item)} 
                    />
                </View>
              </View>
            </View>
          </View>

        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    margin:5,
    borderRadius: 10,
  },

  container2:{
    flexDirection:"row",
    justifyContent: "space-between",
    margin: 10,
  },

  container3:{
    margin: 10,
  },

  tanggal:{
    flexDirection:"column", 
    alignItems:"flex-end",
  },

  nama_kereta:{
    fontSize:20,
    color:"#4B7BE5"
  },

  fontsize:{
    fontSize: 16
  },
  kursi:{
    flexDirection:"column",
    alignItems:"flex-end",
  },

  print:{
    flexDirection:"column", 
    alignItems:"flex-end",
    marginRight: 20
  }
});

export default TiketScreen;