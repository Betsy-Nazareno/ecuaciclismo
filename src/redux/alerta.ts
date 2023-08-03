import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Alerta } from '../models/Alertas';

interface AlertaSlice {
  alertaHasModified?: boolean;
  alertasEnviadas?: Alerta[];
  alertasFeed?: Alerta[];
  allAlertas?: Alerta[];
}

const initialState: AlertaSlice = {
  alertaHasModified: false,
  alertasEnviadas: [],
  alertasFeed: [],
  allAlertas: [],
};

export const Alertas = createSlice({
  name: 'alerta',
  initialState,
  reducers: {
    setAlertaHasModified: (state, action: PayloadAction<AlertaSlice>) => {
      state.alertaHasModified = action.payload.alertaHasModified;
    },
    setAlertasEnviadas: (state, action: PayloadAction<AlertaSlice>) => {
      state.alertasEnviadas = action.payload.alertasEnviadas;
    },
    setAlertasFeed: (state, action: PayloadAction<AlertaSlice>) => {
      state.alertasFeed = action.payload.alertasFeed;
    },
    setAllAlertas: (state, action: PayloadAction<AlertaSlice>) => {
      state.allAlertas = action.payload.allAlertas;
    },
  },
});

export const {
  setAlertaHasModified,
  setAlertasEnviadas,
  setAlertasFeed,
  setAllAlertas,
} = Alertas.actions;

export default Alertas.reducer;
