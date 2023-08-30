// RoomContext.js
import React, { createContext, useReducer, useContext } from 'react';

const RoomContext = createContext();

const initialState = [
  { adults: 2, children: 1 },
];

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT_ADULTS':
      return state.map((room, index) =>
        index === action.roomIndex
          ? { ...room, adults: room.adults + 1 }
          : room
      );
    case 'DECREMENT_ADULTS':
      return state.map((room, index) =>
        index === action.roomIndex && room.adults > 0
          ? { ...room, adults: room.adults - 1 }
          : room
      );
    case 'INCREMENT_CHILDREN':
      return state.map((room, index) =>
        index === action.roomIndex
          ? { ...room, children: room.children + 1 }
          : room
      );
    case 'DECREMENT_CHILDREN':
      return state.map((room, index) =>
        index === action.roomIndex && room.children > 0
          ? { ...room, children: room.children - 1 }
          : room
      );
    case 'ADD_ROOM':
      return [...state, { adults: 2, children: 1 }];
    case 'REMOVE_ROOM':
      if (state.length > 1) {
        return state.filter((_, index) => index !== action.roomIndex);
      }
      return state;
    default:
      return state;
  }
};

export const RoomProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <RoomContext.Provider value={{ state, dispatch }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoomContext = () => {
  return useContext(RoomContext);
};
