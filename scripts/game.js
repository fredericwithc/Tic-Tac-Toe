// iniciar minhas variáveis
let board = ['', '', '', '', '', '', '', '', '']
let playerTime = 0;
let gameOver = false;

let symbols = ['o', 'x'];
let playerNames = ['O', 'X'];

let winStates = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

// Variáveis de estatísticas
let stats = {
    winsO: 0,
    winsX: 0,
    draws: 0
};

// Variáveis do modo computador
let gameMode = 'human'; // 'human' ou 'computer'
let isComputerTurn = false;

// Variáveis de tela
let currentScreen = 'initial'; // 'initial' ou 'game'

// ===== FUNÇÕES DE NAVEGAÇÃO =====

function showInitialScreen() {
    document.getElementById('initial-screen').style.display = 'block';
    document.getElementById('game-screen').style.display = 'none';
    currentScreen = 'initial';
}

function showGameScreen() {
    document.getElementById('initial-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    currentScreen = 'game';
}

function startGame(mode) {
    gameMode = mode;
    showGameScreen();
    updateGameModeInterface();
    resetGame();
}

function backToMenu() {
    showInitialScreen();
    // Resetar o jogo quando voltar ao menu
    resetGame();
}

// ===== FUNÇÕES DO JOGO =====

function updateGameModeInterface() {
    const t = translations[currentLanguage];
    
    // Atualizar indicador de modo
    const modeText = gameMode === 'human' ? t.modeIndicator.human : t.modeIndicator.computer;
    document.getElementById('current-mode-text').textContent = modeText;
    
    // Atualizar labels do placar
    updateStatsLabels();
}

function updateStatsLabels() {
    const t = translations[currentLanguage];
    
    if (gameMode === 'computer') {
        document.getElementById('player-o-label').textContent = t.stats.player;
        document.getElementById('player-x-label').textContent = t.stats.computer;
    } else {
        document.getElementById('player-o-label').textContent = t.stats.playerO;
        document.getElementById('player-x-label').textContent = t.stats.playerX;
    }
}

function handleMove(position) {
    if (gameOver) {
        return;
    }

    if (board[position] == '') {
        board[position] = symbols[playerTime];

        gameOver = isWin();

        if (gameOver == false) {
            playerTime = (playerTime == 0) ? 1 : 0;
            updateCurrentPlayer();
            
            // Se é modo computador e agora é a vez do computador
            if (gameMode === 'computer' && playerTime === 1) {
                isComputerTurn = true;
                // Delay para parecer que o computador está "pensando"
                setTimeout(() => {
                    computerMove();
                }, 800);
            } else {
                isComputerTurn = false;
            }
        }
    }

    return gameOver;
}

function isWin() {
    for (let i = 0; i < winStates.length; i++) {
        let seq = winStates[i];
        let pos1 = seq[0];
        let pos2 = seq[1];
        let pos3 = seq[2];

        if (board[pos1] == board[pos2] &&
            board[pos1] == board[pos3] &&
            board[pos1] != '') {

            // Destacar squares vencedores
            highlightWinnerSquares([pos1, pos2, pos3]);

            // Atualizar estatísticas
            updateStats('win');

            return true;
        }
    }

    // Verificar empate
    if (!board.includes('')) {
        updateStats('draw')
        return 'draw';
    }

    return false;
}

function highlightWinnerSquares(positions) {
    positions.forEach(pos => {
        document.getElementById(pos).classList.add('winner-highlight');
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    playerTime = 0;
    gameOver = false;
    isComputerTurn = false;

    // Limpar squares
    let squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
        square.innerHTML = '';
        square.classList.remove('winner-highlight', 'disabled');
    });

    // Esconder botão new game
    document.getElementById('new-game-btn').style.display = 'none';

    // Atualizar display do jogador atual
    updateCurrentPlayer();
}

function updateCurrentPlayer() {
    const t = translations[currentLanguage];
    let currentPlayerName;
    
    if (gameMode === 'computer') {
        if (playerTime === 0) {
            currentPlayerName = t.stats.player;
        } else {
            currentPlayerName = t.stats.computer;
        }
    } else {
        currentPlayerName = t[`player${playerNames[playerTime]}`] || playerNames[playerTime];
    }

    document.getElementById('current-player').textContent =
        `${t.currentPlayer} ${currentPlayerName}`;
}

// ===== IA DO COMPUTADOR =====

function computerMove() {
    if (gameOver || !isComputerTurn) return;
    
    const move = getMediumMove();
    
    if (move !== -1) {
        // Simular clique do computador
        handleMove(move);
        updateSquare(move);
        isComputerTurn = false;
    }
}

function getMediumMove() {
    // 1. Verificar se pode ganhar
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = symbols[1]; // X (computador)
            if (checkWinForPlayer(symbols[1])) {
                board[i] = ''; // Desfazer
                return i;
            }
            board[i] = ''; // Desfazer
        }
    }
    
    // 2. Verificar se precisa bloquear jogador
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = symbols[0]; // O (jogador)
            if (checkWinForPlayer(symbols[0])) {
                board[i] = ''; // Desfazer
                return i;
            }
            board[i] = ''; // Desfazer
        }
    }
    
    // 3. Tentar centro
    if (board[4] === '') {
        return 4;
    }
    
    // 4. Tentar cantos
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(corner => board[corner] === '');
    if (availableCorners.length > 0) {
        return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }
    
    // 5. Movimento aleatório nas bordas
    return getRandomMove();
}

function getRandomMove() {
    const availableMoves = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            availableMoves.push(i);
        }
    }
    
    if (availableMoves.length > 0) {
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }
    return -1;
}

function checkWinForPlayer(symbol) {
    for (let i = 0; i < winStates.length; i++) {
        let seq = winStates[i];
        let pos1 = seq[0];
        let pos2 = seq[1];
        let pos3 = seq[2];

        if (board[pos1] === symbol &&
            board[pos1] === board[pos2] &&
            board[pos1] === board[pos3]) {
            return true;
        }
    }
    return false;
}

// ===== FUNÇÕES DE IDIOMA =====

function changeLanguage(lang) {
    currentLanguage = lang;

    // Atualizar interface
    updateLanguageInterface();

    // Salvar preferência
    localStorage.setItem('gameLanguage', lang);

    // Atualizar botões de idioma
    updateLanguageButtons();
}

function updateLanguageInterface() {
    const t = translations[currentLanguage];

    // Atualizar tela inicial
    document.getElementById('initial-title').textContent = t.initial.title;
    document.getElementById('initial-subtitle').textContent = t.initial.subtitle;
    document.getElementById('mode-human-title').textContent = t.initial.humanTitle;
    document.getElementById('mode-human-desc').textContent = t.initial.humanDesc;
    document.getElementById('mode-computer-title').textContent = t.initial.computerTitle;
    document.getElementById('mode-computer-desc').textContent = t.initial.computerDesc;

    // Atualizar tela de jogo
    document.getElementById('game-title').textContent = t.gameTitle;
    document.getElementById('new-game-text').textContent = t.newGame;

    // Atualizar textos das estatísticas
    document.getElementById('stats-title').textContent = t.stats.title;
    document.getElementById('draws-label').textContent = t.stats.draws;
    document.getElementById('reset-stats-text').textContent = t.stats.resetStats;

    // Atualizar labels do placar
    updateStatsLabels();
    
    // Atualizar indicador de modo
    if (currentScreen === 'game') {
        updateGameModeInterface();
    }
    
    // Atualizar jogador atual
    if (currentScreen === 'game') {
        updateCurrentPlayer();
    }
}

function updateLanguageButtons() {
    // Remover classe active de todos
    document.querySelectorAll('.lang-btn-external').forEach(btn => {
        btn.classList.remove('active');
    });

    // Adicionar classe active ao botão correto
    document.getElementById(`lang-${currentLanguage}`).classList.add('active');
}

function loadSavedLanguage() {
    // Carregar idioma salvo ou usar padrão
    const savedLang = localStorage.getItem('gameLanguage') || 'pt';
    changeLanguage(savedLang);

    // Carregar estatísticas também
    loadStats();
}

// ===== FUNÇÕES DE ESTATÍSTICAS =====

function loadStats() {
    // Carregar estatísticas do localStorage
    const savedStats = localStorage.getItem('gameStats');
    if (savedStats) {
        stats = JSON.parse(savedStats);
    }
    updateStatsDisplay();
}

function saveStats() {
    // Salvar estatísticas no localStorage
    localStorage.setItem('gameStats', JSON.stringify(stats));
}

function updateStatsDisplay() {
    // Atualizar display das estatísticas
    document.getElementById('wins-o').textContent = stats.winsO;
    document.getElementById('wins-x').textContent = stats.winsX;
    document.getElementById('draws').textContent = stats.draws;
}

function updateStats(result) {
    // Atualizar estatísticas baseado no resultado
    if (result === 'draw') {
        stats.draws++;
    } else if (result === 'win') {
        if (playerTime === 0) {
            stats.winsO++;
        } else {
            stats.winsX++;
        }
    }

    saveStats();
    updateStatsDisplay();

    // Animação visual da estatística atualizada
    animateStatUpdate(result);
}

function animateStatUpdate(result) {
    let targetElement;

    if (result === 'draw') {
        targetElement = document.getElementById('draws');
    } else if (playerTime === 0) {
        targetElement = document.getElementById('wins-o');
    } else {
        targetElement = document.getElementById('wins-x');
    }

    // Animação de "pulse"
    targetElement.style.transform = 'scale(1.3)';
    targetElement.style.color = '#28a745';

    setTimeout(() => {
        targetElement.style.transform = 'scale(1)';
        targetElement.style.color = '#954C2E';
    }, 300);
}

function resetStats() {
    const t = translations[currentLanguage];

    if (confirm(t.stats.resetConfirm)) {
        stats = {
            winsO: 0,
            winsX: 0,
            draws: 0
        };

        saveStats();
        updateStatsDisplay();

        // Feedback visual
        const statsContainer = document.querySelector('.stats-container');
        statsContainer.style.opacity = '0.5';

        setTimeout(() => {
            statsContainer.style.opacity = '1';
        }, 200);
    }
}