import React, { Component } from 'react';
import { Image, Button, Dimensions, WebView, TouchableHighlight,View,Text, BackHandler } from 'react-native';   
import HTMLView from 'react-native-htmlview';    
import { NavigationActions } from 'react-navigation'; 
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { _ } from 'lodash';
import Pdf from 'react-native-pdf';
import RNFetchBlob from 'react-native-fetch-blob';

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
    
    lapsList(d) {
        
       return d.map((data, i) => {
        
          return (
            <View key={i}>
                <Text>{data.title}</Text>
                <View style={{paddingTop:10,alignItems: 'center'}}>
                    <TouchableHighlight
                     onPress={()=>{
                        RNFetchBlob.config({
                          fileCache : true,

                            addAndroidDownloads : {
                                useDownloadManager : true, // <-- this is the only thing required 
                                // Optional, override notification setting (default to true) 
                                notification : true,
                                // Optional, but recommended since android DownloadManager will fail when 
                                // the url does not contains a file extension, by default the mime type will be text/plain 
                                mime : 'application/pdf',
                                path: '/storage/emulated/0/DCIM_PDF/',
                                description : 'File downloaded by download manager.'
                            }
                        })
                        .fetch('GET', data.source)
                          .then((res) => {
                            console.log(res);
                        }) 
                     }}
                    >
                    <Image
                      style={{ width: 50, height: 50,}}
                      source={{uri: 'http://qeee.in/coursepack/site/images/pdf.png'}}
                    />
                    </TouchableHighlight>
                </View> 
            </View>
          )
        })
    }



    render() { 
        const { name, source, pdf } = this.props.navigation.state.params.data;

        const s1 = source.replace(/\+/g, '%20'); 
        const t1 = decodeURIComponent(s1);
       
        const video = t1.replace(/<\/?video[^>]*>/g,"<p><b>"+name+"</b> - (Video can be played in Videos tab)</p>");    
        const pdf_file = t1.replace(/<\/?img[^>]*>/g, '<p>'+name+'</p>');        
        

        if(video.indexOf('video') === -1)
            // return ( <WebView source={{ html: pdf_file }} /> );    
            return ( <View >
                      {this.lapsList(pdf)}
                    </View> );
        return ( <WebView source={{ html: video }} /> );    
        

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
