import React from 'react';
import { TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const InputBox = ({ placeholder, icon, onChangeText, value, secureTextEntry } ) => {
   
    const { boxContanier, box } = styles;   
    return (
        <View style={boxContanier} >
            <Icon.Button name={icon} size={15} backgroundColor="transparent" style={{marginLeft:10}} />
            <TextInput 
                style={box}
                placeholder={placeholder}
                underlineColorAndroid='transparent'
                placeholderTextColor="#d3d3d3"
                onChangeText={onChangeText}
                value={value}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
};

const styles = {
    boxContanier: {
        flexDirection: 'row', 
        alignItems: 'center', 
        borderColor: '#d0d0d0',
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 10,
        borderRadius: 3, 
        backgroundColor: 'rgba(255, 255, 255, .1)'
    },
    box: {
        flex: 1,
        color: 'white',
        padding: 6,
        paddingLeft: 0 
    },
    iconBox: {   
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center',  
    },
    iconBoxText: { 
        paddingLeft: 16, 
        borderRadius: 0, 
        paddingRight: 5, 
        borderBottomLeftRadius: 3, 
        borderTopLeftRadius: 3,
        paddingTop: 10,
        paddingBottom: 10,
    }
};

export { InputBox };
