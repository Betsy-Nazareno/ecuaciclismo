export const html = (fecha_registro: string, 
					 nombre: string, 
					 direccion: string, 
					 celular: string, 
					 owner: string,
					 cedula1: string,
					 cedula2: string,
					 email: string,
					 servicio: string,
					 hora_inicio: string,
					 hora_fin: string,
					 ciudad: string,
					 parqueadero: string,
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

			.ft13{
				font-size:16px;
				font-family:Times;
				color:#ff0000;
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
					<b>SOLICITUD DE REGISTRO COMO LOCAL SEGURO</b>
				</p>

				<p class="ft14">
					Por medio de la presente solicito voluntariamente se me acepte como LOCAL SEGURO en la 
					Aplicación <b>Ecuaciclismo</b>, para poder poner a la disposición de los ciclistas mis (
					<a class="ft13">instalaciones, restauran, taller, otros</a>
					) y así brindar la ayuda necesaria a los ciclistas que la requieran y a su vez
					puedan conocer los servicios que ofrezco. También, en caso de haber elegido el “Plan anual”, me 
					comprometo a cancelar la cuota de registro para el uso de la aplicación <b>Ecuaciclismo</b>.
				</p>

				<p class="ft12">
					A continuación, detallo mis datos:
				</p>

				<table class="bordered-table" style="margin: 8px 0;">
					<tr>
						<td><p class="table">Fecha de registro</p></td>
						<td><p class="table">${fecha_registro}</p></td>
					</tr>

					<tr>
						<td><p class="table">Nombre del local</p></td>
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
						<td><p class="table">Nombre del dueño</p></td>
						<td><p class="table">${owner}</p></td>
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
						<td><p class="table">E-mail</p></td>
						<td><p class="table">${email}</p></td>
					</tr>

					<tr>
						<td><p class="table">Servicio que ofrece</p></td>
						<td><p class="table">${servicio}</p></td>
					</tr>

					<tr>
						<td><p class="table">Horarios de atención</p></td>
						<td><p class="table">${hora_inicio} - ${hora_fin}</p></td>
					</tr>

					<tr>
						<td><p class="table">Ciudad</p></td>
						<td><p class="table">${ciudad}</p></td>
					</tr>

					<tr>
						<td><p class="table">Cuenta con parqueadero<br/>de bicicleta</p></td>
						<td><p class="table">${parqueadero}</p></td>
					</tr>
				</table>

				<p class="ft14">
					El valor de registro para el plan anual es de: $5.00 dólares por un año, con lo cual tiene derecho a 
					publicar sus servicios y productos en la aplicación Ecuaciclismo, ofrecer sus servicios y 
					productos a los miembros de la comunidad.
				</p>

				<div style="display: flex; justify-content: center; margin: 6px 0;">
					<img class="responsive-image" src="${payment}" alt="pago"/>
				</div>

				<p class="ft11">
					<b><ins>Exención de responsabilidades y declaraciones</ins></b>
				</p>
				<p class="ft14">
					Declaro conocer que esta es una aplicación para benéficos de los ciclistas y no se permite 
					publicare relacionado a política, religión o futbol, así mismo me comprometo prestar 
					voluntariamente la ayuda que sea necesaria si estoy en las posibilidades de hacerlo para 
					solucionar algún problema de algún ciclista, por lo tanto, no haré responsable a Ecuaciclismo de 
					posibles lesiones, daños físicos y/o psicológicos.
				</p>
				<p class="ft14">
					Sin perjuicios de lo antes dicho Ecuaciclismo, brinda la información necesaria para que pueda 
					cumplir con su función como local seguro.
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