// Global variables
let web3;
let contract;
const contractAddress = "0x032b1bD20d00bA56B16a42B0B31A9b4D1e57F134";

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
];

// Connect wallet
async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            document.getElementById("walletAddress").innerText = `Connected: ${accounts[0]}`;
            contract = new web3.eth.Contract(contractABI, contractAddress);
        } catch (error) {
            console.error("Wallet connection failed:", error);
        }
    } else {
        alert("Please install MetaMask to use this feature.");
    }
}

// Purchase Pixel
async function purchasePixel(pixelId) {
    if (!contract) {
        alert("Please connect your wallet first.");
        return;
    }

    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0];

    try {
        const price = await contract.methods.pricePerPixel().call();
        await contract.methods.purchasePixel(pixelId).send({
            from: sender,
            value: price
        });
        alert(`Pixel ${pixelId} purchased successfully!`);
    } catch (error) {
        console.error("Purchase failed:", error);
        alert("Purchase failed. Check the console for details.");
    }
}

// Canvas and additional functions
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("pixelCanvas");
    const ctx = canvas.getContext("2d");
    const gridSize = 50; // 50x50 grid
    const pixelSize = canvas.width / gridSize;

    // Draw initial grid
    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            ctx.strokeStyle = "#ddd";
            ctx.strokeRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
    }

    // Handle canvas clicks
    canvas.addEventListener("click", (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((event.clientX - rect.left) / pixelSize);
        const y = Math.floor((event.clientY - rect.top) / pixelSize);
        const pixelId = y * gridSize + x;
        document.getElementById("pixelId").value = pixelId;
        alert(`Pixel ${pixelId} selected!`);
    });
});
