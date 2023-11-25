export const getTiempoTranscurrido =(fechaStr: string) => {

    const fechaActual = new Date();
    const fechaPasada = new Date(fechaStr);

    const diferenciaMilisegundos = fechaActual.getTime() - fechaPasada.getTime();
    const segundos = Math.floor(diferenciaMilisegundos / 1000);

    if (segundos < 60) {
      return `hace ${segundos} segundos`;
    }

    const minutos = Math.floor(segundos / 60);
    if (minutos < 60) {
      return `hace ${minutos} minutos`;
    }

    const horas = Math.floor(minutos / 60);
    if (horas < 24) {
      return `hace ${horas} horas`;
    }

    const dias = Math.floor(horas / 24);
    if (dias <= 7) {
      return `hace ${dias} días`;
    }

    // Si han pasado más de 7 días, mostrar la fecha en un formato adecuado
    const options = { year: "numeric", month: "long", day: "numeric" } as const;
    return fechaPasada.toLocaleDateString(undefined, options);

    
  }

  export const getTiempoTranscurridoReseña = (fechaStr: string) => {
    const fechaActual = new Date();
    const fechaPasada = new Date(fechaStr.replace(/-/g, '/'));

    const diferenciaMilisegundos = fechaActual.getTime() - fechaPasada.getTime();
    const segundos = Math.floor(diferenciaMilisegundos / 1000);

    if (segundos < 60) {
        return `hace ${segundos} segundos`;
    }

    const minutos = Math.floor(segundos / 60);
    if (minutos < 60) {
        return `hace ${minutos} minutos`;
    }

    const horas = Math.floor(minutos / 60);
    if (horas < 24) {
        return `hace ${horas} horas`;
    }

    const dias = Math.floor(horas / 24);
    if (dias <= 7) {
        return `hace ${dias} días`;
    }

    // Si han pasado más de 7 días, mostrar la fecha en el formato "YYYY-MM-DD HH:mm:ss"
    const formattedDate = fechaPasada.toISOString().slice(0, 19).replace("T", " ");
    return formattedDate;
};
