import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Solicitud } from '../models/Solicitud';

interface SolicitudSlice {
    solicitudHasModified?: boolean;
    solicitudesEnviadas?: Solicitud[];
    solicitudesFeed?: Solicitud[];
    allSolicitudes?: Solicitud[];
    }

const initialState: SolicitudSlice = {
    solicitudHasModified: false,
    solicitudesEnviadas: [],
    solicitudesFeed: [],
    allSolicitudes: [],
};

export const Solicitudes= createSlice({
    name: 'solicitud',
    initialState,
    reducers: {
        setSolicitudHasModified: (state, action: PayloadAction<SolicitudSlice>) => {
            state.solicitudHasModified = action.payload.solicitudHasModified;
        },
        setSolicitudesEnviadas: (state, action: PayloadAction<SolicitudSlice>) => {
            state.solicitudesEnviadas = action.payload.solicitudesEnviadas;
        },
        setSolicitudesFeed: (state, action: PayloadAction<SolicitudSlice>) => {
            state.solicitudesFeed = action.payload.solicitudesFeed;
        },
        setAllSolicitudes: (state, action: PayloadAction<SolicitudSlice>) => {
            state.allSolicitudes = action.payload.allSolicitudes;
        },
    },
});

export const {
    setSolicitudHasModified,
    setSolicitudesEnviadas,
    setSolicitudesFeed,
    setAllSolicitudes,
} = Solicitudes.actions;

export default Solicitudes.reducer;