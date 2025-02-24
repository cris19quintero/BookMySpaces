const navButtons = document.querySelectorAll('.nav-btn');
const forms = document.querySelectorAll('.form-container');

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Actualizar botones
        navButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.classList.add('inactive');
        });
        button.classList.remove('inactive');
        button.classList.add('active');

        // Mostrar formulario correspondiente
        const formType = button.getAttribute('data-form');
        forms.forEach(form => {
            form.classList.remove('active');
        });
        document.getElementById(`${formType}Form`).classList.add('active');
    });
});