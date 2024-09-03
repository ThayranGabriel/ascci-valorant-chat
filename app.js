const grid = document.getElementById("grid");
const cols = 26; // Acho que isso é o máximo que o vava consegue fazer
let rows = 7; // Altura padrão

// Criar as células da grid
function criarGrid(preservar = false) {
    const estadoAnterior = [];

    if (preservar) {
        for (let i = 0; i < grid.children.length; i++) {
            estadoAnterior.push(grid.children[i].classList.contains("active"));
        }
    }

    grid.innerHTML = "";

    for (let i = 0; i < rows * cols; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        if (preservar && estadoAnterior[i]) {
            cell.classList.add("active");
        }
        cell.addEventListener("click", () => {
            cell.classList.toggle("active");
            atualizarArteAscii();
        });
        grid.appendChild(cell);
    }

    atualizarArteAscii();
}

// Atualizar a altura da grid com base no valor do slider
function atualizarAlturaGrid(valor) {
    rows = valor;
    document.getElementById("height-value").textContent = valor;
    criarGrid(true); // Preservar o desenho ao redimensionar
}

// Atualizar a saída da arte ASCII
function atualizarArteAscii() {
    let asciiArt = "";
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = grid.children[i * cols + j];
            asciiArt += cell.classList.contains("active") ? "█" : "░";
        }
        asciiArt += "\n";
    }
    document.getElementById("ascii-output").textContent = asciiArt;
}

// Copiar a arte ASCII para o clipboard
function copiarParaClipboard() {
    const asciiArt = document.getElementById("ascii-output").textContent;
    navigator.clipboard.writeText(asciiArt).then(() => {
        alert("ASCII copiada para o clipboard!");
    });
}

// Limpar toda a grid
function limparTudo() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => cell.classList.remove("active"));
    atualizarArteAscii();
}

// Inicializar a grid
criarGrid();
