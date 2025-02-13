import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Lugar } from '../models/Lugares';


interface LugarSlice {
  lugarHasModified?: boolean;
  lugares?: Lugar[];
}

const initialState: LugarSlice = {
  lugarHasModified: false,
  lugares: [],
};

export const Lugares = createSlice({
  name: 'lugar',
  initialState,
  reducers: {
    setLugarHasModified: (state, action: PayloadAction<LugarSlice>) => {
      state.lugarHasModified = action.payload.lugarHasModified;
    },
    
    setLugares: (state, action: PayloadAction<LugarSlice>) => {
      state.lugares = action.payload.lugares;
    },
  },
});

export const {
  setLugarHasModified,
  setLugares,
} = Lugares.actions;

export default Lugares.reducer;
