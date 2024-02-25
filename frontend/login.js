
const create_user = "http://localhost:2007/pelis-plus/users"
const uri_for_login = "http://localhost:2007/pelis-plus/user/"
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

const btn = document.getElementById('btn_singUp');
const form_create_usr = document.getElementById('create_user');
const form_login = document.getElementById('login_user');
const submit_login = document.getElementById('password_login');

btn.addEventListener('click',
function singUp() {
  form_create_usr.style.display = "block";
  form_login.style.display = "none";
});



async function setUser(nombre,password_new,password_verify,mail_new,edad,icon){
  
  if (verifyNewPass(password_new,password_verify,nombre,edad,mail_new)==false){
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

function verifyNewPass(password_new,password_verify,nombre,edad,emal){
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
            setTimeout(()=>{location.href = "/pelis-plus/home";},100)
        },1000);
      }
    }
  }

async function veryfyUser(mail_login,password_login){
  //console.log(uri_for_login + mail_login.value);
    try {
      const peticion = await fetch(uri_for_login + mail_login.value,{
        method: 'GET',
        headers: {
          'Content-Type': 'aplication/json',
        }
      })
      const respuesta = await peticion.json();
      console.log('res',respuesta.message);
      if(respuesta.message != 'User not found'){
        LoginUser(respuesta,password_login);
      }else{
        alert('User not found');
      }
    }
      catch(err){
        console.log("server dice que ->",err);
        alert('Error servidor no arranje');
      }
  }

async function LoginUser(userData,password_login){
  if(userData.password === password_login.value){
    console.log(userData.password = password_login.value);
    loginSuccesfull(userData);
  }else{
    alert('Password Incorrect');
  }
}

async function loginSuccesfull(userData){
  setTimeout(()=>{
    let favStr = userData.liked_movies;
    console.log(favStr);
    sessionStorage.setItem('liked_movies',favStr);
    sessionStorage.setItem('user',JSON.stringify(userData));
    setTimeout(()=>{location.href = "/pelis-plus/home";})
  },100);
}

function login_usr(mail_login,password_login,key){
  if(key.keyCode === 13){
    veryfyUser(mail_login,password_login);
  }
}

function singup(form){
  console.log(form);
  form.style.opacity = "1";
}
console.log(sessionStorage.getItem('user'));

const usuario = document.getElementById('mail_login');
const contraseña = document.getElementById('password_login');
const getUser = JSON.parse(sessionStorage.getItem('user'));

if( getUser !== null){
  console.log(getUser.nombre);
  usuario.style.backgroundColor = "rgb(215 186 110)";
  usuario.style.color = "black";
  contraseña.style.backgroundColor = "rgb(215 186 110)";
  contraseña.style.color = "black";

  usuario.value = getUser.nombre;
  contraseña.value = getUser.password;
}

