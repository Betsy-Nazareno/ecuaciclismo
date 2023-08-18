import axios from 'axios'

export const new_solicitud_lugar= async (token:string, token_lugar:string , path_pdf?:string) =>{
    try{
        await axios({
            method:'POST',
            url:'https://ecuaciclismoapp.pythonanywhere.com/api/solicitud/new_solicitud_lugar/',  
            headers:{Authorization:'Token '+token},
            data: {token_lugar:token_lugar,path_pdf:path_pdf?path_pdf:''}
        })
    }catch(e){
        console.error(e)
    }
}
