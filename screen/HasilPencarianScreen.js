import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { Appbar, List } from "react-native-paper";
import supabase from "../supabase";

function HasilPencarianScreen({ navigation, route }) {
  // console.log (route)
  //filter kota, dan tanggal
  // let filter = route.params
  //ganti route.params aja

  //state data : default array (karena untuk menyimpan banyak data)
  const [data, setData] = useState([]);
  //script dijalankan ketika screen diakses
  useEffect(() => {
    getData();
  }, [data]);

  const getData = async () => {
    //data : hasil query, error : pesan error
    const { data, error } = await supabase
      .from('rute_kereta')
      .select('id_rute_kereta, tanggal, jam_berangkat, jam_sampai, harga,kereta:id_kereta(*)')
      .eq('id_kota', route.params.id_kota)
      .eq('id_kota2', route.params.id_kota2)
      .eq('tanggal', route.params.tanggal)
    // .order('id_rute', { ascending: false });
    // console.log(error)
    //mengisi state data
    setData(data);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack("")} />
        <Appbar.Content title="Hasil Pencarian" color="white" />
        <Appbar.Action icon="dots-vertical" color="white" />
      </Appbar.Header>

      <View style={style.bg}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View key={index} style={style.container}>
                <View style={style.container2}>
                  <Text style={style.nama_kereta}>{item.kereta.nama_kereta}</Text>
                  <Text style={style.nama_kereta}>Rp. {item.harga}</Text>
                </View>
                <View style={style.container2}>
                  <Text style={style.kelas_kereta}>{item.kereta.kelas_kereta}</Text>
                  <Text style={style.kelas_kereta}>{item.jam_berangkat} - {item.jam_sampai}</Text>
                </View>
                <Text onPress={() =>
                navigation.navigate("FormPemesananScreen", { id_kereta: item.kereta.id_kereta, id_rute_kereta: item.id_rute_kereta , id_kota:route.params.id_kota, id_kota2: route.params.id_kota2, kursi:route.params.kursi})
              } style={style.pilih}> Pilih </Text>

            </View>
          )}
        />
      </View>
    </>
  );
}

const style = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 0.1,
    backgroundColor: "#fff",
    borderWidth: 1,
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },
  container2: {
    flexDirection: "row",
    justifyContent:"space-between",
    marginTop: 5,
    marginBottom: 5
  },
  nama_kereta: {
    color: "#4B7BE5",
    fontSize: 20
  },
  kelas_kereta:{
    fontSize: 17
  }, 
  pilih: {
    textAlign:"center",
    flex: 0.3,
    backgroundColor: "beige",
    borderWidth: 2,
    backgroundColor:"#FFA500",
    padding: 1,
    borderRadius: 10,
    marginLeft: 110 ,
    marginRight: 110,
    marginTop: 10
  }
  
});
export default HasilPencarianScreen;