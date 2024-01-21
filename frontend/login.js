
const create_user = "http://localhost:2007/pelis-plus/users"

let user = {
    nombre:"",
    edad:"",
    email:"",
    password:"",
    saved_movies:[],
    liked_movies:[],
    saved_series:[],
    liked_series:[],
    liked_genres:[],
    icon:""
}

async function setUser(nombre,password_new,password_verify,mail_new,edad,icon){

    if (verifyPass(password_new,password_verify,nombre,edad,mail_new)==false){
        alert("password dont match or email and name not filled");
    }else{
        user.nombre = nombre.value;
        user.password = password_new.value;
        user.email = mail_new.value;
        user.edad = edad.value;
        user.icon = icon.value
        console.log(JSON.stringify(user));
        sendUser(user);
}

function verifyPass(password_new,password_verify,nombre,edad,emal){
    if(nombre.value === '' || edad.value.trim === '' || emal.value === ''){
        return false;
    }else{
        if (password_new.value===password_verify.value) {
            return true;
        }else{return false}
    }
}
async function sendUser(user){
    try {
        const response = await fetch(create_user, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });

        const responseData = await response.json();
        console.log('Server response:', responseData); 
      } catch (error) {
        console.error('Error posting data:', error);
        alert("erro creating User");
      } finally {
        setTimeout(()=>{
            alert("user created");
            setTimeout(()=>{location.href = "/pelis-plus/home";},800)
        },1000);
      }
    }
}