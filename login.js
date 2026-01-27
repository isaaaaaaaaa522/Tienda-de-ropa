
/* Ojo de contraseña */
function AbrirCerrar() {
    const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";

  passwordInput.type = isPassword ? "text" : "password";

  togglePassword.classList.toggle("fa-eye", !isPassword);
  togglePassword.classList.toggle("fa-eye-slash", isPassword);
});
}




/* REGISTER */
function initLogin() {
  const btnRegister = document.getElementById("goRegister");

  if (!btnRegister) return;

  btnRegister.addEventListener("click", (e) => {
    e.preventDefault();
    loadRegister();
  });
}

function loadRegister() {
  fetch("register.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("content").innerHTML = html;

      // 🔑 REINICIALIZAR
      initLogin();
      AbrirCerrar();
    });
}



  initLogin();
  AbrirCerrar();