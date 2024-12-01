
// Configuración del contrato
const contractAddress = "0x032b1bD20d00bA56B16a42B0B31A9b4D1e57F134";
const contractABI = 
[
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "pixelId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "newDesign",
                "type": "string"
            }
        ],
        "name": "PixelCustomized",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "pixelId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "reason",
                "type": "string"
            }
        ],
        "name": "PixelModerated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "buyer",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "pixelId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            }
        ],
        "name": "PixelPurchased",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "pixelId",
                "type": "uint256"
            }
        ],
        "name": "PixelStaked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "pixelId",
                "type": "uint256"
            }
        ],
        "name": "PixelUnstaked",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "pricePerPixel",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "pixelId",
                "type": "uint256"
            }
        ],
        "name": "purchasePixel",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
;
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
            alert("Failed to connect wallet. Please try again.");
        }
    } else {
        alert("MetaMask is not installed. Please install it to use this feature.");
    }
}

// Configuración del canvas y la cuadrícula
const canvas = document.getElementById("pixelCanvas");
const ctx = canvas.getContext("2d");
const GRID_SIZE = 50; // Número de celdas en cada dirección
const CELL_SIZE = canvas.width / GRID_SIZE; // Tamaño de cada celda
let selectedPixel = null;

// Dibujar la cuadrícula del canvas
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas
    for (let x = 0; x < GRID_SIZE; x++) {
        for (let y = 0; y < GRID_SIZE; y++) {
            ctx.strokeStyle = "#ddd";
            ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
    }
}

// Manejar clics en el canvas
canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const pixelX = Math.floor(x / CELL_SIZE);
    const pixelY = Math.floor(y / CELL_SIZE);
    selectedPixel = pixelY * GRID_SIZE + pixelX;

    alert(`Selected Pixel ID: ${selectedPixel}`);
});

// Función para comprar un píxel
async function purchasePixel() {
    if (!contract) {
        alert("Please connect your wallet first.");
        return;
    }
    if (selectedPixel === null) {
        alert("Please select a pixel first.");
        return;
    }
    try {
        const accounts = await web3.eth.getAccounts();
        const price = await contract.methods.pricePerPixel().call();
        await contract.methods.purchasePixel(selectedPixel).send({
            from: accounts[0],
            value: price,
        });
        alert(`Pixel ${selectedPixel} purchased successfully!`);
    } catch (error) {
        console.error("Error purchasing pixel:", error);
        alert("Failed to purchase pixel. Please try again.");
    }
}

// Inicializar el canvas al cargar la página
drawGrid();
