
     const hamburger = document.getElementById("hamburger-menu");
      const menuDropdown = document.getElementById("menu-dropdown");

      hamburger.addEventListener("click", e => {
        e.stopPropagation();
        menuDropdown.classList.toggle("active");
      });

      document.addEventListener("click", () => {
        menuDropdown.classList.remove("active");
      });

      menuDropdown.addEventListener("click", e => e.stopPropagation());
        const loginBtn = document.getElementById('login-signup-btn');
  loginBtn.addEventListener('click', () => {
    window.location.href = 'login.html';
  });
  

  