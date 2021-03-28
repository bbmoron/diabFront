import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import background from './background.png';
import ripples from './ripples.png';
import send from './send.png';
import clip from './clip.png';

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${background});
`;

const WorkForm = styled.div`
  width: 96vw;
  height: 90vh;
  background: rgba(255,255,255,1);
  border-radius: 5px;
  box-shadow: 1px 0px 5px rgba(0,0,0,0.3);
  padding: 30px 10px 30px 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Bar = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const LogOut = styled.h3`
  color: #3E3E3E;
  cursor: pointer;
  padding: 0;
  margin: 0;
  margin-left: 15px;

  &:hover {
    text-decoration: underline;
  }
`;

const NLink = styled(Link)`
  color: #3E3E3E;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Switch = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  & i {
    position: relative;
    display: inline-block;
    width: 46px;
    height: 26px;
    background-color: #e6e6e6;
    border-radius: 23px;
    vertical-align: text-bottom;
    transition: all 0.3s linear;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      width: 42px;
      height: 22px;
      background-color: #fff;
      border-radius: 11px;
      transform: translate3d(2px, 2px, 0) scale3d(1, 1, 1);
      transition: all 0.25s linear;
    }

    &::after {
      content: "";
      position: absolute;
      left: 0;
      width: 22px;
      height: 22px;
      background-color: #fff;
      border-radius: 11px;
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.24);
      transform: translate3d(2px, 2px, 0);
      transition: all 0.2s ease-in-out;
    }
  }

  &:active {
    & i::after {
      width: 28px;
      transform: translate3d(2px, 2px, 0);
      transform: translate3d(16px, 2px, 0);
    }

    & input:checked {
      transform: translate3d(16px, 2px, 0);
    }
  }

  & input { display: none; }

  & input:checked + i {
    background-color: #4BD763;
  }

  & input:checked + i::before {
      transform: translate3d(18px, 2px, 0) scale3d(0, 0, 0);

  }

  & input:checked + i::after {
      transform: translate3d(22px, 2px, 0);
    }
  }

  & h3 {
    padding: 0;
    margin: 0;
    padding-right: 15px;
  }
`;

const Chat = styled.div`
  width: 100%;
  height: 90%;
  border: 1px solid rgba(126, 126, 126, 0.3);
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Contacts = styled.div`
  width: 20%;
  height: 100%;
  border-right: 1px solid rgba(126, 126, 126, 0.3);
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Contact = styled.div`
  width: 100%;
  min-height: 63px;
  border-bottom: 1px solid rgba(126, 126, 126, 0.3);
  cursor: pointer;

  &:hover {
    background: rgba(0,0,0,0.05);
  }

  & h4 {
    padding: 0;
    margin: 0;
    padding-left: 7px;
    padding-top: 5px;
  }

  & p {
    padding: 0;
    margin: 0;
    padding-left: 7px;
    padding-top: 5px;
    color: rgba(0,0,0,0.4);
  }
`;

const BlankContact = styled.div`
  width: 100%;
  min-height: 90px;
`;

const ChatWindow = styled.div`
  width: 80%;
  height: 100%;
  border-radius: 0px 5px 5px 0px;
  background-image: url(${ripples});
  position: relative;
`;

const Messages = styled.div`
  width: 100%;
  height: 93%;
  overflow-y: scroll;
`;

const InputArea = styled.div`
  width: 100%;
  height: 7%;
  background: white;
  border-radius: 0px 0px 5px 0px;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Input = styled.textarea`
  width: 95%;
  height: 80%;
  outline: none;
  border: none;
  resize: none;
  font-size: 16px;
  padding: 5px;
`;

const SendButton = styled.div`
  width: 5%;
  height: 80%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const MessageBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 99%;
  margin-left: 0.5%;
`;

const MessageBlockRecepient = styled.div`
  width: fit-content;
  padding: 8px 12px 8px 12px;
  border-radius: 12px;
  background: #B8B8B8;
  color: white;

  & p {
    padding: 0;
    margin: 0;
  }
`;

const MessageBlockAuthor = styled.div`
  width: fit-content;
  padding: 8px 12px 8px 12px;
  border-radius: 12px;
  background: #F1F2EC;

  & p {
    padding: 0;
    margin: 0;
  }
`;

function Panel() {
  const [clients, setClients] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatID, setChatID] = useState(0);
  const [id, setId] = useState(0);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState('');
  const [newMessages, setNewMessages] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('data'));
    if(!data) return;
    setId(data.id);
    setUsername(data.username);
    setEmail(data.email);
    setActive(data.ready === 'true' ? true : false);
  }, []);

  useEffect(() => {
    if(!id) return;
    setInterval(() => {
      fetch(`http://194.87.248.56:8080/chats?id=${id}`)
        .then(response => response.json())
        .then(async data => {
          // setClients(data);
          const clients = data.map(async chat => {
            const resp = await fetch(`http://194.87.248.56:8080/history?chatId=${chat.ID}`);
            const body = await resp.json();
            return {
              messages: body,
              ...chat
            };
          });
          Promise.all(clients).then(arr => { 
            setClients(arr);
            setUpdate(true);
            setLoading(false);
          });
        });
    }, 5000);
  }, [id]);

  useEffect(() => {
    if (!update || !chatID) return;
    const formatted = clients.filter(client => client.ID === chatID)[0].messages.map(message => {
      if (message.authorId != chatID) return (
        <><MessageBlock style={{ alignItems: 'flex-end' }}><MessageBlockAuthor>{message.content.indexOf('data:image/') !== -1 ? <a href={message.content} target="_blank"><img src={message.content} style={{ height: '200px' }} /></a> : <p>{message.content}</p>}</MessageBlockAuthor></MessageBlock><br /></>
      )
      return (
        <><MessageBlock style={{ alignItems: 'flex-start' }}><MessageBlockRecepient>{message.content.indexOf('data:image/') !== -1 ? <a href={message.content} target="_blank"><img src={message.content} style={{ height: '200px' }} /></a> : <p>{message.content}</p>}</MessageBlockRecepient></MessageBlock><br /></>
      )
    });
    setNewMessages(formatted);
    setUpdate(false);
  }, [update]);

  const openChat = (id) => {
    setContent('');
    setChatID(id);
    setMessages(clients.filter(client => client.ID === id)[0].messages);
    setUpdate(true);
  };

  const sendMessage = () => {
    if(content == '') return;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    var urlencoded = new URLSearchParams();
    urlencoded.append('chatId', chatID);
    urlencoded.append('authorId', id);
    urlencoded.append('content', content);

    var requestOptions = {
      method: 'POST',
      headers: headers,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch('http://194.87.248.56:8080/message', requestOptions)
      .then(response => response.json())
      .then(result => setContent(''))
      .catch(error => console.error(error));
  };

  const sendImage = () => {
    // TODO:
  };

  const switchStatus = (e) => {
    const checked = e.target.checked;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    var urlencoded = new URLSearchParams();
    urlencoded.append('uid', id);
    urlencoded.append('ready', `${e.target.checked}`);

    var requestOptions = {
      method: 'POST',
      headers: headers,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch('194.87.248.56:8080/doctors', requestOptions)
      .then(response => response.text())
      .then(result => setActive(checked))
      .catch(error => setActive(!checked));
  }

  return(
    <Wrap>
      <WorkForm>
        <Bar>
          <h3>{ email } { username && `(${ username })` }</h3>
          <RightSide>
            <Switch>
              <h3>Active?</h3>
              <input type="checkbox" checked={ active } onClick={ switchStatus } />
              <i></i>
            </Switch>
            <LogOut><NLink to="/exit" >Log Out</NLink></LogOut>
          </RightSide>
        </Bar>
        <Chat>
          <Contacts>
            { clients[0] ? <></> : <span style={{ color: 'rgba(0,0,0,0.3)', padding: '10px 5px 10px 5px' }}>You don't have any clients at the moment. Try setting status to active to start receiving new users.</span> }
            { !loading && clients.map(client => {
              const msgs = client.messages;
              const def = '...no previous communication';
              const imageType = 'data:image/';
              const docType = 'data:document/';
              let content = msgs[0] ? msgs[msgs.length - 1].content : def;
              if(content.indexOf(imageType) != -1) content = '🖼️ Image';
              else if(content.indexOf(docType) != -1) content = '📝 Document';
              return(
                <Contact onClick={ e => openChat(client.ID) }>
                  <h4>{ client.patientId }</h4>
                  <p>{ content }</p>
                </Contact>
              );
            }) }
            <BlankContact></BlankContact>
          </Contacts>
          <ChatWindow>
            <Messages>
              { newMessages }
            </Messages>
            <InputArea>
              <Input onChange={ e => setContent(e.target.value) } value={content}></Input>
              <SendButton>
                <img onClick={ sendImage } alt="attach file" src={clip} style={{ width: '40%' }} />
                <img onClick={ sendMessage } alt="send message text" src={send} style={{ width: '40%' }} />
              </SendButton>
            </InputArea>
          </ChatWindow>
        </Chat>
      </WorkForm>
    </Wrap>
  );
}

export default Panel;
