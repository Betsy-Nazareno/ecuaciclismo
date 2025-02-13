import React from "react";
import BasePaginasSecundarias from "../components/templates/BasePaginasSecundarias";
import { RootDrawerParamList } from "../models/Screens.types";
import { RouteProp } from "@react-navigation/native";
import BicicletaDetalle from "../components/templates/Bicicleta/BicicletaDetalle";

interface DetalleBicicletaProps {
    route: RouteProp<RootDrawerParamList, 'DetalleBicicleta'>
}

const DetalleBicicleta= ({ route }: DetalleBicicletaProps) => {
    return (
      <BasePaginasSecundarias>
        <BicicletaDetalle token={route.params?.token as string}></BicicletaDetalle>
      </BasePaginasSecundarias>
    )
  }
  
  export default DetalleBicicleta