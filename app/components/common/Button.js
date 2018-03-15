import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const Button = ({ onPress, children, disabled, childText }) => {
    
    const { buttonStyle, buttonText, buttonNonText } = styles;
    
    if(disabled !== true){
        styles.disableButton = {};
    }

    if(childText === true)
     {
        return (
            <TouchableOpacity 
                onPress={onPress} 
                style={[buttonStyle, styles.disableButton]} 
                disabled={disabled}
            >
                <Text style={buttonText} >{children}</Text>
            </TouchableOpacity>
        );         
     } else {
        return (
            <TouchableOpacity 
                onPress={onPress} 
                style={[buttonStyle, styles.disableButton]} 
                disabled={disabled}
            >
                <View style={buttonNonText} >{children}</View>
            </TouchableOpacity>
        );            
     }

};

const styles = {
    buttonText: {
        fontSize: 16,
        alignSelf: 'center',
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
        color: 'white'
    },
    buttonStyle: {
        // borderWidth: 1,
        backgroundColor: '#f8576b',
        borderRadius: 5, 
        alignSelf: 'stretch',
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 2,
        paddingBottom: 2,
        marginTop: 10
    },
    disableButton: {
        backgroundColor: '#ff8492' 
    },
    buttonNonText: {
        padding: 10
    }
};

export { Button };
