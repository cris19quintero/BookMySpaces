// Script para los botones de alquiler
document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los botones de "Alquilar"
    const rentButtons = document.querySelectorAll('.cta-button');
    
    // Agregar event listener a cada botón
    rentButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Obtener información de la oficina desde el elemento padre
            const officeCard = this.closest('.office-card');
            const officeName = officeCard.querySelector('.office-name').textContent;
            const priceMonthly = officeCard.querySelector('.price-item:nth-child(1) .price-value').textContent;
            const priceDaily = officeCard.querySelector('.price-item:nth-child(2) .price-value').textContent;
            
            // Crear el modal de alquiler
            createRentalModal(officeName, priceMonthly, priceDaily);
        });
    });
});

// Función para crear el modal de alquiler
function createRentalModal(officeName, priceMonthly, priceDaily) {
    // Crear el elemento del modal
    const modal = document.createElement('div');
    modal.className = 'rental-modal';
    
    // HTML del formulario
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Alquiler de Oficina</h2>
            
            <div class="rental-info">
                <h3>${officeName}</h3>
                <p class="selected-price"></p>
            </div>
            
            <form id="rentalForm">
                <div class="form-group">
                    <label for="rentalType">Tipo de Alquiler:</label>
                    <select id="rentalType" required>
                        <option value="">-- Seleccionar --</option>
                        <option value="monthly">Mensual (${priceMonthly})</option>
                        <option value="daily">Diario (${priceDaily})</option>
                    </select>
                </div>
                
                <div class="form-group" id="dailyTimeGroup" style="display: none;">
                    <label for="dailyTime">Horario:</label>
                    <select id="dailyTime">
                        <option value="full">Día completo (8 horas)</option>
                        <option value="half">Medio día (4 horas)</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="startDate">Fecha de inicio:</label>
                    <input type="date" id="startDate" required>
                </div>
                
                <div class="form-group" id="endDateGroup">
                    <label for="endDate">Fecha de finalización:</label>
                    <input type="date" id="endDate">
                </div>
                
                <div class="form-group">
                    <label for="paymentMethod">Método de Pago:</label>
                    <select id="paymentMethod" required>
                        <option value="">-- Seleccionar --</option>
                        <option value="creditCard">Tarjeta de Crédito</option>
                        <option value="bankTransfer">Transferencia Bancaria</option>
                    </select>
                </div>
                
                <div id="creditCardFields" style="display: none;">
                    <div class="form-group">
                        <label for="cardNumber">Número de Tarjeta:</label>
                        <input type="text" id="cardNumber" placeholder="XXXX XXXX XXXX XXXX">
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group half">
                            <label for="expiryDate">Fecha de Expiración:</label>
                            <input type="text" id="expiryDate" placeholder="MM/AA">
                        </div>
                        
                        <div class="form-group half">
                            <label for="cvv">CVV:</label>
                            <input type="text" id="cvv" placeholder="123">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="cardName">Nombre en la Tarjeta:</label>
                        <input type="text" id="cardName">
                    </div>
                </div>
                
                <div id="bankTransferFields" style="display: none;">
                    <div class="form-group">
                        <p class="bank-info">Por favor realice una transferencia a la siguiente cuenta bancaria:</p>
                        <p class="bank-details">Banco: Banco Nacional de Panamá<br>
                        Cuenta: 123-456-789<br>
                        Beneficiario: Espacios de Oficina en Panamá<br>
                        Concepto: Alquiler ${officeName}</p>
                    </div>
                    
                    <div class="form-group">
                        <label for="paymentProof">Comprobante de Pago:</label>
                        <input type="file" id="paymentProof" accept=".pdf,.jpg,.jpeg,.png">
                        <small>Suba una imagen o PDF de su comprobante de pago</small>
                    </div>
                </div>
                
                <div class="total-section">
                    <h3>Total a pagar: <span id="totalAmount">$0.00 USD</span></h3>
                </div>
                
                <button type="submit" class="submit-button">Confirmar Alquiler</button>
            </form>
        </div>
    `;
    
    // Agregar el modal al body
    document.body.appendChild(modal);
    
    // Mostrar el modal con animación
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Cerrar el modal
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    });
    
    // Event listeners para el formulario
    const rentalForm = modal.querySelector('#rentalForm');
    const rentalType = modal.querySelector('#rentalType');
    const paymentMethod = modal.querySelector('#paymentMethod');
    const dailyTimeGroup = modal.querySelector('#dailyTimeGroup');
    const creditCardFields = modal.querySelector('#creditCardFields');
    const bankTransferFields = modal.querySelector('#bankTransferFields');
    const selectedPrice = modal.querySelector('.selected-price');
    const totalAmount = modal.querySelector('#totalAmount');
    
    // Cambiar el tipo de alquiler
    rentalType.addEventListener('change', function() {
        if (this.value === 'daily') {
            dailyTimeGroup.style.display = 'block';
            document.getElementById('endDateGroup').style.display = 'none';
            selectedPrice.textContent = `Precio: ${priceDaily}`;
            
            // Extraer el precio numérico
            const price = parseFloat(priceDaily.replace(/[^\d.]/g, ''));
            totalAmount.textContent = `$${price.toFixed(2)} USD`;
        } else if (this.value === 'monthly') {
            dailyTimeGroup.style.display = 'none';
            document.getElementById('endDateGroup').style.display = 'block';
            selectedPrice.textContent = `Precio: ${priceMonthly}`;
            
            // Extraer el precio numérico
            const price = parseFloat(priceMonthly.replace(/[^\d.]/g, ''));
            totalAmount.textContent = `$${price.toFixed(2)} USD`;
        } else {
            dailyTimeGroup.style.display = 'none';
            document.getElementById('endDateGroup').style.display = 'block';
            selectedPrice.textContent = '';
            totalAmount.textContent = '$0.00 USD';
        }
    });
    
    // Cambiar el método de pago
    paymentMethod.addEventListener('change', function() {
        if (this.value === 'creditCard') {
            creditCardFields.style.display = 'block';
            bankTransferFields.style.display = 'none';
        } else if (this.value === 'bankTransfer') {
            creditCardFields.style.display = 'none';
            bankTransferFields.style.display = 'block';
        } else {
            creditCardFields.style.display = 'none';
            bankTransferFields.style.display = 'none';
        }
    });
    
    // Manejar envío del formulario
    rentalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aquí se procesaría el formulario, enviar datos al servidor, etc.
        // Por ahora, mostraremos un mensaje de confirmación
        
        const confirmationMessage = document.createElement('div');
        confirmationMessage.className = 'confirmation-message';
        confirmationMessage.innerHTML = `
            <div class="confirmation-content">
                <h2>¡Reserva Confirmada!</h2>
                <p>Has reservado exitosamente el espacio de oficina <strong>${officeName}</strong>.</p>
                <p>Tipo de alquiler: ${rentalType.value === 'monthly' ? 'Mensual' : 'Diario'}</p>
                <p>Total: ${totalAmount.textContent}</p>
                <p>Recibirás un correo electrónico con los detalles de tu reserva.</p>
                <button class="close-confirmation">Cerrar</button>
            </div>
        `;
        
        document.body.appendChild(confirmationMessage);
        
        // Cerrar el modal original
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
        
        // Cerrar la confirmación
        const closeConfirmation = confirmationMessage.querySelector('.close-confirmation');
        closeConfirmation.addEventListener('click', () => {
            confirmationMessage.remove();
        });
    });
}
