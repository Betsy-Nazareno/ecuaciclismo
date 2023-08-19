export const html = (fecha_inscripcion: string,
                     nombre: string,
                     direccion: string,
                     celular: string,
                     fecha_nacimiento: string,
                     cedula1: string,
                     cedula2: string,
                     tipo_sangre: string,
                     ocupacion: string,
                     email: string,
                     ciudad: string,
                     provincia: string,
                     seguro_medico: string,
                     contacto: string,
                     payment: string) => {return `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="" xml:lang="">
    <head>
        <title></title>

        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <br/>
        <style type="text/css">
            p {
                margin: 0;
                padding: 0;
            }

            .ft11{
                font-size:16px;
                font-family:Times;
                color:#000000;
                margin-bottom: 8px;
            }

            .ft12{
                font-size:16px;
                font-family:Times;
                color:#000000;
                text-align: justify;
                margin-bottom: 4px;
            }

            .ft14{
                font-size:16px;
                line-height:20px;
                font-family:Times;
                color:#000000;
                text-align: justify;
                margin-bottom: 4px;
            }

			.bordered-table {
				border: 1px solid black;
				border-collapse: collapse;
			}
			  
			.bordered-table td {
				border: 1px solid black;
				padding: 4px;
			}

            .table{
                font-size:16px;
                font-family:Times;
                color:#000000;
                text-align: justify;
                margin: 2px;
            }

			.imageContainer{
				display: flex;
				flex-direction: column;
				align-items: center;
			}

			.responsive-image {
				max-width: 80%;
				height: auto;
			  }
        </style>
    </head>

    <body bgcolor="#FFFFFF" vlink="blue" link="blue">
        <div id="page1-div" style="position:relative; width: 918px; height: 1188px;">
            <div style= "display: flex; justify-content: center;">
                <img width="195" height="98" src="https://github.com/Betsy-Nazareno/ecuaciclismo/blob/598966113f6387515c27c3aadf536c2ae57aeb66/assets/ecuaciclismo_logo.png?raw=true" alt="image"/>
            </div>
            <div style="position:relative; width: 738px; height: 1008px; margin: 10px 90px 30px 90px;">
                <p style="text-align: center;" class="ft11">
                    <b>SOLICITUD DE INSCRIPCIÓN AL CLUB Y COMPROMISO</b>
                </p>

                <p class="ft14">
                    Por medio de la presente solicito voluntariamente se me acepte como socio del Club de Ciclismo 
                    <b>Ecuaciclismo</b>, para poder acceder a los beneficios como socio y a su vez me comprometo a 
                    colaborar con los eventos que organice el Club y a cancelar la cuota de inscripción del Club 
                    de ciclismo <b>Ecuaciclismo</b>.
                </p>

                <p class="ft12">
                    A continuación, detallo mis datos:
                </p>

                <table class="bordered-table" style="margin: 8px 0;">
                    <tr>
                        <td><p class="table">Fecha de inscripción<br/>(hoy)</p></td>
                        <td><p class="table">${fecha_inscripcion}</p></td>
                    </tr>

                    <tr>
                        <td><p class="table">Nombres y apellidos</p></td>
                        <td><p class="table">${nombre}</p></td>
                    </tr>

                    <tr>
                        <td><p class="table">Dirección</p></td>
                        <td><p class="table">${direccion}</p></td>
                    </tr>

                    <tr>
                        <td><p class="table">Teléfonos</p></td>
                        <td><p class="table">${celular}</p></td>
                    </tr>

                    <tr>
                        <td><p class="table">Fecha de nacimiento</p></td>
                        <td><p class="table">${fecha_nacimiento}</p></td>
                    </tr>
                    
                    <tr>
                        <td><p class="table">Cédula de identidad</p></td>
                        <td>
                            <div class="imageContainer">
                                <img class="responsive-image" style="margin: 2px;" src="${cedula1}" alt="cedula"/>
                                <img class="responsive-image" style="margin: 2px;" src="${cedula2}" alt="cedula"/>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td><p class="table">Tipo de sangre</p></td>
                        <td><p class="table">${tipo_sangre}</p></td>
                    </tr>

                    <tr>
                        <td><p class="table">Ocupación</p></td>
                        <td><p class="table">${ocupacion}</p></td>
                    </tr>

                    <tr>
                        <td><p class="table">E-mail</p></td>
                        <td><p class="table">${email}</p></td>
                    </tr>

                    <tr>
                        <td><p class="table">Ciudad</p></td>
                        <td><p class="table">${ciudad}</p></td>
                    </tr>

                    <tr>
                        <td><p class="table">Provincia</p></td>
                        <td><p class="table">${provincia}</p></td>
                    </tr>

                    <tr>
                        <td><p class="table">Cuenta con seguro<br/>médico, indique cual</p></td>
                        <td><p class="table">${seguro_medico}</p></td>
                    </tr>

                    <tr>
                        <td><p class="table">Ponga un contacto en<br/>caso de Emergencia</p></td>
                        <td><p class="table">${contacto}</p></td>
                    </tr>
                </table>

                <p class="ft14">
                    El valor de la inscripción es de: $ 25.00 dólares por un año, con lo cual tiene 
                    derecho a: carnet del Club, fiesta de aniversario del Club EcuaCiclismo, comprar 
                    el jersey Ecuaciclismo, descuento en repuestos y accesorios de bicicleta, descuento 
                    en viajes y travesías.
                </p>

                <div style="display: flex; justify-content: center; margin: 6px 0;">
                    <img class="responsive-image" src="${payment}" alt="pago"/>
                </div>

                <p class="ft11">
                    <b><ins>Exención de responsabilidades y declaraciones</ins></b>
                </p>
                <p class="ft14">
                    Declaro gozar de las aptitudes físicas y psicológicas para participar en los eventos 
                    ciclísticos que organiza el Club EcuaCiclismo, por lo tanto, no haré responsable al 
                    Club EcuaCiclismo de posibles lesiones, daños físicos y/o psicológicos.
                </p>
                <p class="ft14">
                    Sin perjuicios de lo antes dicho el Club EcuaCiclismo, contará con su personal de 
                    logística y apoyo mecánico durante el recorrido de los ciclistas.
                </p>
                <br/>
                <br/>
                <p class="ft11">
                    Firma solicitante: _____________________________ 
                </p>
				<br/>
				<br/>
                <p class="ft12">
                    C.I.: ____________________________________________
                </p>
            </div>
        </div>
    </body>
</html>
`
}