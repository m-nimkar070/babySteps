import { useEffect } from 'react';
import io from 'socket.io-client';
import { store } from '../redux/store';
import { api } from '../services/api';

const socket = io('https://babysteps-backend-horw.onrender.com');

export const useSocket = () => {
  useEffect(() => {
    const handleSlotUpdate = (data: { doctorId: string; date: string }) => {
      store.dispatch(api.util.invalidateTags(['Slots']));
    };

    socket.on('slot-update', handleSlotUpdate);
    return () => {
      socket.off('slot-update', handleSlotUpdate);
    };
  }, []);
};