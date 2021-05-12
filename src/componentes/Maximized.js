import * as React from 'react'
import { Avatar, TitleBar, TextInput, MessageList, Message, MessageText, AgentBar, Title, Subtitle, MessageGroup, MessageButtons, MessageButton, MessageTitle, MessageMedia, TextComposer, Row, Fill, Fit, IconButton, SendButton, EmojiIcon, CloseIcon, Column, RateGoodIcon, RateBadIcon, Bubble, SendIcon, FixedWrapper } from '@livechat/ui-kit'
import Button from '@material-ui/core/Button';
import './Appp.css';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import TextField from '@material-ui/core/TextField';


import * as firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";

const theme = {
    vars: {
        'primary-color': '#427fe1',
        'secondary-color': '#fbfbfb',
        'tertiary-color': '#fff',
        'avatar-border-color': 'blue',
    },
    AgentBar: {
        Avatar: {
            size: '42px',
        },
        css: {
            backgroundColor: 'var(--secondary-color)',
            borderColor: 'var(--avatar-border-color)',
        }
    },
    Message: {
        css: {
            fontWeight: 'bold',
        },
    },
    Avatar: {
        size: '40px', // special Avatar's property, supported by this component
        css: { // css object with any CSS properties
            borderColor: 'blue',
        },
    },
    TextComposer: {
        css: {
            'color': '#000',
        },
    },
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "",
            nombre: "",
            foto: "",
            mesasge: "",
            messages: [
            ],
            messages2: [
            ],
        }
    }
    cambiarLista() {
        this.state.messages.forEach((doc) => {
            this.state.messages2[(doc.id - 1)] = doc;
        })
    }
    setData() {
        var db = firebase.firestore();
        let docReaf = db.collection('messages').doc();
        let setAda = docReaf.set({
            id: this.state.messages.length,
            text: this.state.mesasge,
            idu: this.state.id,
            foto: this.state.foto,
            nombre: this.state.nombre,
        });

        this.getData()
    }
    getData() {
        var db = firebase.firestore();
        this.setState({ messages: [] })

        this.setState({ id: this.props.id, nombre: this.props.nombre, foto: this.props.foto })

        db.collection('messages').get().then((snapshot) => {
            snapshot.forEach((doc) => {
                var u = doc.data();
                var nu = this.state.messages
                nu.push(u)
                this.setState({ messages: nu })
            });
        })
            .catch((err) => {
                console.log('Error getting documents', err);
            });
    }

    updateMessage = (e) => {
        this.setState({ mesasge: e.target.value })
        console.log(this.state.mesasge)
    }
    /* Inicia cuando cargar interfaces del chat */

    handelSubmit = (e) => {
        e.preventDefault();
        const list = this.state.messages;
        const newMessage = {
            id: this.state.messages.length,
            text: this.state.mesasge,
            idu: this.state.id,
            foto: this.state.foto,
            nombre: this.state.nombre,
        };
        //imprimir
        list.push(newMessage)
        this.setState({ messages: list, id: this.state.messages.length });
        this.setData()
    }
    componentDidMount() {
        this.getData()
    }
    render() {
        return (
            <div style={{ maxWidth: '100%', height: 300 }}>
                {this.cambiarLista()}
                <TitleBar rightIcons={[<IconButton key="close"><CloseIcon /></IconButton>,]} title={this.state.nombre} onClick={this.props.minimize} />
                <AgentBar>
                    <Row flexFill>
                        <Column>
                            <Avatar imgUrl={this.state.foto} />
                        </Column>
                        <Column flexFill>
                            <Title>{this.state.nombre}</Title>
                            <Subtitle>{this.state.id}</Subtitle>
                        </Column>
                        <Column flexFit>
                            <Row>
                                <IconButton>
                                    <RateGoodIcon style={{
                                        opacity: 'good' ? '1' : '0.5'
                                    }} />
                                </IconButton>
                                <IconButton>
                                    <RateBadIcon style={{
                                        opacity: 'bad' ? '1' : '0.5'
                                    }} />
                                </IconButton>
                            </Row>
                        </Column>
                    </Row>
                </AgentBar>
                <div style={{ flexGrow: 1, minHeight: 0, height: '100%', }}>
                    <MessageList active >
                        {this.state.messages2.map(messages => {
                            return this.state.id == messages.idu & messages.nombre == this.state.nombre ?
                                <MessageGroup onlyFirstWithMeta key={messages.id} >
                                    <Message date="21:38" isOwn={this.state.id == messages.idu} authorName={messages.nombre}>
                                        <MessageText>
                                            {messages.text}
                                        </MessageText>
                                    </Message>
                                </MessageGroup> :
                                <MessageGroup avatar={messages.foto} onlyFirstWithMeta>
                                    <Message authorName={messages.nombre} date="21:37">
                                        <MessageText>
                                            {messages.text}
                                        </MessageText>
                                    </Message>
                                </MessageGroup>
                        })
                        }
                    </MessageList>
                    <form onSubmit={this.handelSubmit.bind(this)}>

                        <TextComposer >
                            <Row align="center">
                                <Fill>
                                    <TextField
                                        type="text"
                                        value={this.state.mesasge}
                                        onChange={this.updateMessage.bind(this)}
                                    />
                                </Fill>
                                <Fit>
                                    <Button type="submit" onClick={() => this.getData}>
                                        <IconButton>
                                            <SendIcon color="#4788ef" />
                                        </IconButton>
                                    </Button>

                                </Fit>
                            </Row>
                        </TextComposer>
                    </form>
                </div>

            </div>
        );
    }
}

export default App;