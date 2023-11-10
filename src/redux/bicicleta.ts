import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Bicicleta } from '../models/Bicicletas';

interface BicicletaSlice {
  bicicletaHasModified?: boolean;
  bicicletasRegistradas?: Bicicleta[];
  bicicletasFeed?: Bicicleta[];
  allBicicletas?: Bicicleta[];
}

const initialState: BicicletaSlice = {
  bicicletaHasModified: false,
  bicicletasRegistradas: [],
  bicicletasFeed: [],
  allBicicletas: [],
};

export const Bicicletas = createSlice({
  name: 'alerta',
  initialState,
  reducers: {
    setBicicletaHasModified: (state, action: PayloadAction<BicicletaSlice>) => {
      state.bicicletaHasModified = action.payload.bicicletaHasModified;
    },
    setBicicletaRegistrada: (state, action: PayloadAction<BicicletaSlice>) => {
      state.bicicletasRegistradas = action.payload.bicicletasRegistradas;
    },
    setBicicletaFeed: (state, action: PayloadAction<BicicletaSlice>) => {
      state.bicicletasFeed = action.payload.bicicletasFeed;
    },
    setAllBicicletas: (state, action: PayloadAction<BicicletaSlice>) => {
      state.allBicicletas = action.payload.allBicicletas;
    },
  },
});

export const {
  setBicicletaHasModified: setBicicletaHasModified,
  setBicicletaRegistrada: setBicicletaRegistrada,
  setBicicletaFeed: setBicicletaFeed,
  setAllBicicletas: setAllBicicletas,
} = Bicicletas.actions;

export default Bicicletas.reducer;
