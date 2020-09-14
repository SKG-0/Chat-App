import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};
import React, { Component } from 'react'
import {Platform,KeyboardAvoidingView,SafeAreaView} from 'react-native'
import {GiftedChat} from 'react-native-gifted-chat'
import Fire from '../Fire'
export class ChatScreen extends Component {
    state={
        messages:[]
    }
    get user(){
        return {
            _id:Fire.uid,
            name:this.props.navigation.state.params.name
        }
    }
    componentDidMount(){
        Fire.get(message=> this.setState(previous=>({
            messages:GiftedChat.append(previous.messages,message)
        })))
    }
    componentWillUnmount(){
        Fire.off();
    }
    render() {
        const chat=<GiftedChat messages={this.state.messages} onSend={Fire.send} user={this.user} />;
        if(Platform.OS==='android'){
            return(
                <KeyboardAvoidingView style={{flex:1}}  keyboardVerticalOffset={0} enabled>
                    {chat}
                </KeyboardAvoidingView>
            )
        }
        return <SafeAreaView style={{flex:1}}>{chat}</SafeAreaView>
    }
}
export default ChatScreen
