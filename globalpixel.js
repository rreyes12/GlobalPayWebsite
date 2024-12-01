const canvas = document.getElementById('pixelCanvas');
const context = canvas.getContext('2d');

canvas.addEventListener('click', function(event) {
    // Obtener las coordenadas del clic en el canvas
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    console.log(`Canvas clicked at X: ${x}, Y: ${y}`);

    // Realiza cualquier acción requerida al hacer clic en el canvas
    const pixelX = Math.floor(x / 10); // Ejemplo: divide en bloques de 10px
    const pixelY = Math.floor(y / 10);

    console.log(`Pixel selected at Grid X: ${pixelX}, Y: ${pixelY}`);
    alert(`Pixel seleccionado en X: ${pixelX}, Y: ${pixelY}`);
});

// Asegurar que el canvas tenga el tamaño correcto y se dibuje
canvas.width = 500;
canvas.height = 500;

// Dibujar la cuadrícula del canvas para los píxeles
const GRID_SIZE = 50;
const CELL_SIZE = canvas.width / GRID_SIZE;

context.strokeStyle = '#ddd';
for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
        context.strokeRect(i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
}