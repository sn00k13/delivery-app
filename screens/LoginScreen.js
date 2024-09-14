import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const LoginScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:"white", alignItems: "center" }}>
      <View>
        <Image
            style={{ width: 150, height: 100, marginTop: 50 }}
            source={{
                uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png"
            }}
        />
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 12, color: "#041E42" }}>Login to your Account</Text>
        </View>

        <View style={{marginTop: 70}}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#d0d0d0", paddingVertical: 5, borderRadius: 5}}>
                <MaterialIcons name="email" size={24} color="black" />
                <TextInput placeholder='Enter your email'/>
            </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})