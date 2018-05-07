import React, { Component } from 'react';
import { Image, Button, Dimensions, WebView, TouchableHighlight,View,Text, BackHandler } from 'react-native';   
import HTMLView from 'react-native-htmlview';    
import { NavigationActions } from 'react-navigation'; 
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { _ } from 'lodash';

import { SBHeaderStyle, headerProp } from '../config/Config'; 
class ViewBook extends Component {    
    static navigationOptions = ({ navigation }) => {
        const header = headerProp(navigation);
        header.headerLeft = <TouchableHighlight
            underlayColor='transparent'
            onPress={() =>  { 
                if(navigation.state.routeName == 'BS6Main'){
                  return navigation.navigate('BS4Main', { data:{id:navigation.state.params.id,name:navigation.state.params.name},route:navigation.state.params.route }); 
                }else{
                    return navigation.navigate('BS4', { data:{id:navigation.state.params.id,name:navigation.state.params.name} });
                }
            }}
        >
            <MaterialIcons
                name='arrow-back'
                size={25}
                style={{ color: 'white', marginLeft: 20 }}
            />
        </TouchableHighlight>;

        header.headerRight = <View
            style={{ marginLeft: 20 }}
        />;
        header.headerTitle = navigation.state.params.data.name;

        return (header);
    };
    constructor(props){
        super(props); 
    }

    handleBackButtonClick() {  
        const { params } = this.props.navigation.state;
        if(this.props.navigation.state.routeName == 'BS6Main'){
          return this.props.navigation.navigate('BS4Main', { data:{id:params.id,name:params.name},route:params.route });
        }else{
          return this.props.navigation.navigate('BS4', { data:{id:params.id,name:params.name} });
        }

    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick.bind(this));
    }

        


    render() { 
        const { name, source, pdf } = this.props.navigation.state.params.data;

        const s1 = source.replace(/\+/g, '%20'); 
        const t1 = decodeURIComponent(s1);

        const htmlView = t1.replace('<img src="http://qeee.in/coursepack/site/images/pdf.png"/>', 'Pdf can be download in Download Tab')
             .replace('<img src="http://qeee.in/coursepack/site/images/pdf.png"/>', 'Pdf can be download in Download Tab')
             .replace('<img src="http://qeee.in/coursepack/site/images/pdf.png"/>', 'Pdf can be download in Download Tab')
             .replace('<img src="http://qeee.in/coursepack/site/images/pdf.png"/>', 'Pdf can be download in Download Tab')
             .replace('<img src="http://qeee.in/coursepack/site/images/pdf.png"/>', 'Pdf can be download in Download Tab')
             .replace('<img src="http://qeee.in/coursepack/site/images/pdf.png"/>', 'Pdf can be download in Download Tab')
             .replace(/<\/video>/g,"Video can be played in Videos Tab")
             .replace(/<\/?video[^>]*>/g,"")
             .replace(/<\/?strong[^>]*>/g,"")         
             .replace(/<\/?a[^>]*>/g,"");

        return ( <WebView source={{ html: htmlView }} /> );  

    }
}
const styles = ({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
    }
}); 
export default ViewBook;
