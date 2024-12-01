const web3 = new Web3(window.ethereum);

// Dirección del contrato
const contractAddress = "0x4624951e0d2f8401647d50a52ffb339d467908d6ef85f6acc8ecb40bffe585a7";

// ABI del contrato
const contractABI = [
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
    // Agrega aquí el resto del ABI completo que has proporcionado
];

const contract = new web3.eth.Contract(contractABI, contractAddress);

// Función para conectar la wallet
async function connectWallet() {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            alert("Wallet connected successfully!");
        } catch (error) {
            console.error("Wallet connection failed:", error);
        }
    } else {
        alert("Please install MetaMask!");
    }
}

// Función para comprar un píxel
async function purchasePixel(pixelId) {
    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0];

    try {
        const price = await contract.methods.pricePerPixel().call();
        await contract.methods.purchasePixel(pixelId).send({
            from: sender,
            value: price,
            gas: 300000
        });
        alert(`Pixel ${pixelId} purchased successfully!`);
    } catch (error) {
        console.error("Purchase failed:", error);
        alert("Purchase failed. Check the console for details.");
    }
}

// Otras funciones relevantes (customizePixel, stakePixel, etc.)
