import React, { useContext, useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import {useChatContext} from '../context/useChatContext'

const Chat = () => {
    const [currentMsg, setCurrentMsg] = useState("")
    const [messageList, setMessageList] = useState([])
    const {socket, username, room} = useContext(useChatContext)

    const sendMessage = async () => {
        if(currentMsg!== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMsg,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
            }

            await socket.emit("send_message", messageData)
            setMessageList((list) => [...list, messageData])
            setCurrentMsg("")
        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data])
            
        })
        return () => {
            socket.off("receive_message");
        };

    }, [socket])
    console.log(messageList)
  return (
    <div className='chat-window'>
        <div className="chat-header"> 
            <p>Live Chat  room: {room}</p>
        </div>
        <div className="chat-body">
            <ScrollToBottom className="message-container">
                {messageList.map((messageContent) => {
                    return (
                        <div className="message" id={username === messageContent.author ? "you" : "other"}>
                            <div className="message-content">
                                <p>{messageContent.message}</p>
                            </div>
                            <div className="message-meta">
                                <p id="time">{messageContent.time}</p>
                                <p id="author">{messageContent.author}</p>
                            </div>
                        </div>
                    
                    )
            })}
            </ScrollToBottom>
        </div>
        <div className="chat-footer">
            <input 
                type="text" 
                placeholder="..." 
                value={currentMsg}
                onChange={(e) => setCurrentMsg(e.target.value)}
                onKeyDown={(e => { (e.key === "Enter")  && sendMessage()})}/>
            <button  onClick={sendMessage}>&#9658;</button>
        </div>
    </div>
  )
}

export default Chat