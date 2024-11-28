import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import networkService from '../helpers/networkService';

const WebSocketContext = createContext();

const WebSocketProvider = ({children, currentUser}) => {
  const user = currentUser;
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [ws, setWs] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const wsUrl = 'ws://localhost:8000/ws/';
  const connectionEstablished = useRef(false);
  const roomCreatedCallbackRef = useRef(null);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const apiUrl = 'chat/users/';
      await networkService.get(apiUrl).then(response => {
        console.log('chat/users/ response', response);
        setUsers(response.data.users);
        console.log('users', response.data.users);
      });
    };

    fetchUsers();
  }, []);

  const establishConnection = useCallback(() => {
    if (user && !connectionEstablished.current) {
      const socket = new WebSocket(`${wsUrl}${user.uuid}/`);
      socket.onopen = () => {
        console.log('WebSocket connection established');
        setIsConnected(true);
        connectionEstablished.current = true;
      };
      socket.onmessage = event => {
        const data = JSON.parse(event.data);
        console.log('WebSocket message received:', data);
        if (data.action === 'get_rooms') {
          console.log('get_rooms', data.rooms);
          setRooms(data.rooms);
        }
        if (data.action === 'room_connected') {
          console.log('connect_room', data);
          setRooms(prevRooms => {
            const newRooms = prevRooms.map(room => {
              if (room.id.toString() === data.room_id) {
                console.log('adding messages to room', room.id);

                return {
                  ...data.room,
                  messages: data.messages.reverse(),
                  page_number: 1,
                };
              }
              return room;
            });
            return newRooms;
          });
        }
        if (data.action === 'room_notification') {
          console.log('room_notification', data);
          setRooms(prevRooms => {
            const roomExists = prevRooms.some(room => room.id === data.room.id);
            if (!roomExists) {
              return [...prevRooms, data.room];
            }
            return prevRooms;
          });
        }
        if (data.action === 'room_created') {
          console.log('room_created', data);
          setRooms(prevRooms => {
            const roomExists = prevRooms.some(room => room.id === data.room.id);
            if (!roomExists) {
              return [...prevRooms, data.room];
            }
            return prevRooms;
          });
          if (roomCreatedCallbackRef.current) {
            roomCreatedCallbackRef.current(data.room); // Call the callback
          }
        }
        if (data.action === 'new_message') {
          console.log('new_message', data);
          setRooms(prevRooms => {
            const newRooms = prevRooms.map(room => {
              if (room.id.toString() === data.room_id) {
                console.log('adding new message to room', room.id);

                return {
                  ...room,
                  last_message: data.message,
                  messages: [data.message, ...room.messages],
                };
              }
              return room;
            });
            return newRooms;
          });
        }
        if (data.action === 'notify_new_message') {
          console.log('notify_new_message', data);

          setRooms(prevRooms => {
            const newRooms = prevRooms.map(room => {
              if (room.id.toString() === data.room_id) {
                console.log('adding new message to room', room.id);

                return {
                  ...room,
                  last_message: data.message,
                  unread_messages: room.unread_messages + 1,
                };
              }
              return room;
            });
            return newRooms;
          });
        }
        if (data.action === 'older_messages') {
          console.log('older_messages', data);
          setRooms(prevRooms => {
            const newRooms = prevRooms.map(room => {
              if (room.id.toString() === data.room_id) {
                console.log('adding older messages to room', room.id);

                return {
                  ...room,
                  messages: [...room.messages, ...data.messages],
                };
              }
              return room;
            });
            return newRooms;
          });
        }
      };
      socket.onclose = () => {
        console.log('WebSocket connection closed');
        connectionEstablished.current = false;
        setIsConnected(false);
      };
      socket.onerror = error => {
        console.error('WebSocket error:', error);
      };
      setWs(socket);
    }
  }, [user, wsUrl]);

  useEffect(() => {
    establishConnection();
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [connectionEstablished]);

  const getRooms = useCallback(() => {
    console.log('inside getRooms');
    if (ws) {
      console.log('inside getRooms ws');
      const data = {
        action: 'get_rooms',
      };
      ws.send(JSON.stringify(data));
    }
  }, [ws]);

  useEffect(() => {
    if (isConnected) {
      getRooms();
    }
  }, [isConnected, getRooms]);

  const createRoom = (roomName, isGroup, memberUuids) => {
    console.log('isGrouup', isGroup);

    if (ws) {
      const data = {
        action: 'create_room',
        room_name: roomName,
        is_group: isGroup,
        member_uuids: memberUuids,
      };
      ws.send(JSON.stringify(data));
    }
  };

  const connectRoom = roomId => {
    if (ws) {
      const data = {
        action: 'connect_room',
        room_id: roomId,
      };
      ws.send(JSON.stringify(data));
    }
  };

  const disconnectRoom = roomId => {
    if (ws) {
      const data = {
        action: 'disconnect_room',
        room_id: roomId,
      };
      ws.send(JSON.stringify(data));
    }
  };
  const getOlderMessages = roomId => {
    const room = rooms.find(room => room.id.toString() === roomId);
    const page_number = room.page_number + 1;

    if (ws) {
      const data = {
        action: 'get_older_messages',
        room_id: roomId,
        page_number: page_number,
      };
      ws.send(JSON.stringify(data));
      setRooms(prevRooms => {
        const newRooms = prevRooms.map(room => {
          if (room.id.toString() === roomId) {
            return {
              ...room,
              page_number: page_number,
            };
          }
          return room;
        });
        return newRooms;
      });
    }
  };

  const sendMessage = (roomId, message) => {
    if (ws) {
      const data = {
        action: 'send_message',
        room_id: roomId,
        message: message,
      };
      ws.send(JSON.stringify(data));
    }
  };

  return (
    <WebSocketContext.Provider
      value={{
        users,
        rooms,
        setRooms,
        getRooms,
        selectedRoom,
        setSelectedRoom,
        ws,
        createRoom,
        connectRoom,
        disconnectRoom,
        sendMessage,
        getOlderMessages,
        setRoomCreatedCallback: callback => {
          roomCreatedCallbackRef.current = callback;
        },
      }}>
      {children}
    </WebSocketContext.Provider>
  );
};

WebSocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {WebSocketProvider, WebSocketContext};
