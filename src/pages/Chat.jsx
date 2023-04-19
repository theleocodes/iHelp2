import React, { useState, useEffect, useRef } from 'react'
import "../styles/Chat.css"
import io from 'socket.io-client/dist/socket.io.js';

const Chat = () => {
  const [user, setUser] = useState({name: 'Guest'})
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [socket, setSocket] = useState(null)
  const chatBox = useRef(null)

  useEffect(() => {
    const newSocket = io('http://localhost:5000') // replace with your backend URL
    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log('connected to server')
      })
      socket.on('message', message => {
        setMessages([...messages, message])
      })
    }
  }, [socket, messages])

  useEffect(() => {
    chatBox.current.scrollTop = chatBox.current.scrollHeight
  }, [messages])

  const handleInput = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      socket.emit('message', { user: user.name, message: input })
      setInput('')
    }
  }

  return (
    <>
      <div className="container-chat_main_parent">
        <div className="chat_subparent">
          <div className="chat_header">
            <p className='chat_header_p1'>Welcome to the community chatapp {user.name}</p>
          </div>
          <div className="chat_box" ref={chatBox}>
            {messages.map((message, index) => (
              <div className={`chat_message ${message.user === user.name ? 'self' : 'other'}`} key={index}>
                <div className="chat_message_user">{message.user}</div>
                <div className="chat_message_text">{message.message}</div>
              </div>
            ))}
          </div>
          <form className='chat_input_form' onSubmit={handleSubmit}>
            <input className='chat_input' type="text" value={input} onChange={handleInput} placeholder="Type a message..." />
            <button className='chat_send_btn' onClick={handleSubmit}>Send</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Chat
