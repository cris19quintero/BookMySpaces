// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all tab elements
    const tabs = document.querySelectorAll('.tab');
    
    // Content for each tab
    const tabContents = {
        'Office space': {
            image: 'imagenes/ofice space.png',
            title: 'Oficinas Privadas',
            description: 'Oficinas equipadas con todo lo necesario para comenzar.',
            features: '✓ WiFi de alta velocidad<br>✓ Escritorio con silla ergonómica<br>✓ Acceso 24/7',
            price: 'Desde $150 USD',
            periodicity: 'Por mes o por año'
        },
        'Coworking': {
            image: 'imagenes/coworking.png',
            title: 'Espacios Compartidos',
            description: 'Oficinas equipadas con todo lo necesario para comenzar y para alimentarse.',
            features: '✓ Áreas comunes<br>✓ Cafetería incluida<br>✓ Networking',
            price: 'Desde $80 USD',
            periodicity: 'Por día o por mes'
        },
        'Meeting rooms': {
            image: 'imagenes/meeting.png',
            title: 'Salas de Reuniones',
            description: 'Oficinas equipadas con todo lo necesario para comenzar.',
            features: '✓ Proyector y pantalla<br>✓ Sistema de videoconferencia<br>✓ Pizarra interactiva',
            price: 'Desde $30 USD',
            periodicity: 'Por hora o por día'
        }
    };

    // Function to update content based on selected tab
    function updateContent(tabName) {
        const content = tabContents[tabName];
        
        // Update the private space content
        const privateSpace = document.querySelector('.private-space');
        
        // If we found the private space element, update its content
        if (privateSpace) {
            privateSpace.innerHTML = `
                <img src="${content.image}" alt="${content.title}">
                <div class="texto">
                    <h3 class="space-title">${content.title}</h3>
                    <p class="space-description">${content.description}</p>
                    <p class="space-features">${content.features}</p>
                    <p class="space-price">${content.price}</p>
                    <p class="space-periodicity">${content.periodicity}</p>
                </div>
            `;
        }
        
        // Update workspace images based on tab
        updateWorkspaceImages(tabName);
    }
    
    // Function to update the main workspace images
    function updateWorkspaceImages(tabName) {
        const imagen1 = document.getElementById('imagen1');
        const imagen2 = document.getElementById('imagen2');
        
        if (tabName === 'Office space') {
            imagen1.src = 'imagenes/image1.png';
            imagen2.src = 'imagenes/image2.png';
        } else if (tabName === 'Coworking') {
            imagen1.src = 'imagenes/image1.png';
            imagen2.src = 'imagenes/image2.png';
        } else if (tabName === 'Meeting rooms') {
            imagen1.src = 'imagenes/image1.png';
            imagen2.src = 'imagenes/image2.png';
        }
    }

    // Add click event listeners to all tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Update content based on tab text
            updateContent(this.textContent.trim());
        });
    });
    
    // Initialize with the first tab (or currently active tab)
    const activeTab = document.querySelector('.tab.active');
    if (activeTab) {
        updateContent(activeTab.textContent.trim());
    }
});
// Add this to your script.js file

document.addEventListener('DOMContentLoaded', function() {
    // Get the menu toggle button and sidebar
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    
    // Add click event to toggle the sidebar
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
    
    // Close the sidebar when clicking outside of it (optional)
    document.addEventListener('click', function(event) {
        if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
            sidebar.classList.remove('active');
        }
    });
    
    // Close sidebar when window is resized to larger size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            sidebar.classList.remove('active');
        }
    });
});