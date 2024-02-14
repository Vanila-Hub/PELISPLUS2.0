const sesion_activa = document.getElementById('userTXT');
const getUser = JSON.parse(localStorage.getItem('user'));

if (getUser !== null) {
  sesion_activa.innerHTML = 'Sing-out, ' + getUser.nombre;
  sesion_activa.href = "/pelis-plus/home"
}
localStorage.removeItem('user');
console.log(getUser);
