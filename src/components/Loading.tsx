import { ActivityIndicator, StyleSheet, View } from "react-native"

export function Loading(){
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#34CB79" />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})
