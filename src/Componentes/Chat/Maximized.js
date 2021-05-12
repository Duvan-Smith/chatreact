import * as React from 'react'
import { Avatar, TitleBar, MessageList, Message, MessageText, AgentBar, Title, Subtitle, MessageGroup, TextComposer, Row, Fill, Fit, IconButton, CloseIcon, Column, RateGoodIcon, RateBadIcon, SendIcon } from '@livechat/ui-kit'
import Button from '@material-ui/core/Button';
import '../../Css/Appp.css';
import TextField from '@material-ui/core/TextField';
import * as firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: cookies.get('uid'),
            nombre: cookies.get('primernombre'),
            foto: cookies.get('Avatar'),
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
        docReaf.set({
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

        this.setState({ id: cookies.get('uid'), nombre: cookies.get('primernombre'), foto: cookies.get('Avatar') })

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
                            return this.state.id === messages.idu & messages.nombre === this.state.nombre ?
                                <MessageGroup onlyFirstWithMeta key={messages.id} >
                                    <Message date="21:38" isOwn={this.state.id === messages.idu} authorName={messages.nombre}>
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