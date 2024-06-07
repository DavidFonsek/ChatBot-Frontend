import React, {useState} from 'react';
import {Button, Text, View, FlatList, TextInput} from 'react-native';

interface Message {
    type: "system" | "human";
    message: string;
}

const SystemMessage = ({item}) => {
    return(
        <Text style={{backgroundColor: "#FF6961",
            margin: 5,
            borderRadius: 3,
            padding: 10,
            fontSize: 18}}>
            {item}</Text>
    );
}

const HumanMessage = ({item}) => {
    return(
        <Text style={{backgroundColor: "#AEC6CF",
            margin: 5,
            borderRadius: 3,
            padding: 10,
            textAlign: "right",
            fontSize: 18}}>
            {item}</Text>
    );
}

const AnyMessage = ({item}:{item:Message}) => {
    return item.type === "system" ? <SystemMessage item={item.message}/> : <HumanMessage item={item.message}/>
}

const Index = props => {
    const [messages, setMessages] = useState<Message[]>([{type: "system", message: "Bienvenido al chatBot, escribe algo"}])
    const [message, setMessage] = useState('')

    const addMessage = (message) =>{
        const newMessages:Message[] = [{type: "human", message}, ...messages]

        fetch('http://localhost:8000?pregunta=' + message)
            .then(response => response.text())
            .then(data => {
                setMessages([{type: "system", message: data}, ...newMessages])
            })
            .catch(error => console.error(error));

        setMessages(newMessages)
        setMessage('')
    }

    return (
        <View style={{flex: 1}}>
            <FlatList data={messages} renderItem={AnyMessage} inverted style={{flexGrow: 1}}/>
            <TextInput value={message} onChangeText={setMessage} style={{backgroundColor: "#CFCFC4",
                paddingVertical: 15,
                paddingHorizontal: 10,
                fontSize: 18,
                borderColor: "black"}}/>
            <Button title='ENVIAR' onPress={() => addMessage(message)}></Button>
        </View>
    );
};

export default Index;