
const contractAddress = "0x032b1bD20d00bA56B16a42B0B31A9b4D1e57F134"; // Dirección del contrato
const contractABI = []; // ABI del contrato aquí
let web3;
let contract;

// Función para conectar la wallet
async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            web3 = new Web3(window.ethereum);
            await ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            document.getElementById("walletAddress").innerText = `Wallet connected: ${accounts[0]}`;
            contract = new web3.eth.Contract(contractABI, contractAddress);
        } catch (error) {
            console.error("Error connecting wallet:", error);
        }
    } else {
        alert("MetaMask is not installed. Please install it to use this feature.");
    }
}

// Manejo del canvas y selección de píxeles
const canvas = document.getElementById("pixelCanvas");
const ctx = canvas.getContext("2d");
const GRID_SIZE = 50;
const CELL_SIZE = canvas.width / GRID_SIZE;
let selectedPixel = null;

// Dibujar la cuadrícula del canvas
function drawGrid() {
    for (let x = 0; x < GRID_SIZE; x++) {
        for (let y = 0; y < GRID_SIZE; y++) {
            ctx.strokeStyle = "#ddd";
            ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
    }
}

// Manejar el clic en el canvas
canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const pixelX = Math.floor(x / CELL_SIZE);
    const pixelY = Math.floor(y / CELL_SIZE);
    selectedPixel = pixelY * GRID_SIZE + pixelX;
    alert(`Selected Pixel ID: ${selectedPixel}`);
});

// Comprar píxel
async function purchasePixel(pixelId) {
    if (!contract) {
        alert("Please connect your wallet first.");
        return;
    }
    try {
        const accounts = await web3.eth.getAccounts();
        const price = await contract.methods.pricePerPixel().call();
        await contract.methods.purchasePixel(pixelId).send({
            from: accounts[0],
            value: price,
        });
        alert(`Pixel ${pixelId} purchased successfully!`);
    } catch (error) {
        console.error("Error purchasing pixel:", error);
    }
}

// Inicializar el canvas
drawGrid();
