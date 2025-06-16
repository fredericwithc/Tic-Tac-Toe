document.addEventListener('DOMContentLoaded', () => {
    // ===== ELEMENTOS DAS TELAS =====
    
    // Elementos da tela inicial
    let selectHumanBtn = document.getElementById('select-human');
    let selectComputerBtn = document.getElementById('select-computer');
    
    // Elementos da tela de jogo
    let squares = document.querySelectorAll(".square");
    let newGameBtn = document.getElementById('new-game-btn');
    let resetStatsBtn = document.getElementById('reset-stats-btn');
    let backToMenuBtn = document.getElementById('back-to-menu');

    // ===== EVENT LISTENERS DA TELA INICIAL =====
    
    selectHumanBtn.addEventListener('click', () => {
        startGame('human');
    });

    selectComputerBtn.addEventListener('click', () => {
        startGame('computer');
    });

    // ===== EVENT LISTENERS DA TELA DE JOGO =====
    
    // Event listeners dos squares
    squares.forEach((square) => {
        square.addEventListener('click', handleClick);
    });

    newGameBtn.addEventListener('click', resetGame);
    resetStatsBtn.addEventListener('click', resetStats);
    backToMenuBtn.addEventListener('click', backToMenu);

    // ===== EVENT LISTENERS GLOBAIS =====
    
    // Event listeners dos botões de idioma
    document.getElementById('lang-pt').addEventListener('click', () => changeLanguage('pt'));
    document.getElementById('lang-en').addEventListener('click', () => changeLanguage('en'));
    
    // ===== INICIALIZAÇÃO =====
    
    // Carregar idioma salvo
    loadSavedLanguage();

    // Inicializar na tela inicial
    showInitialScreen();

    // Inicializar display do jogador atual (com delay)
    setTimeout(() => {
        if (currentScreen === 'game') {
            updateCurrentPlayer();
        }
    }, 100);
});

// ===== FUNÇÕES DE INTERAÇÃO DO JOGO =====

function handleClick(event) {
    // Não permitir clique se é vez do computador
    if (gameMode === 'computer' && isComputerTurn) {
        return;
    }
    
    let square = event.target;
    let position = square.id;

    if (handleMove(position)) {
        disableAllSquares();
        
        setTimeout(() => {
            const t = translations[currentLanguage];
            let message;
            
            if (gameOver === 'draw') {
                if (gameMode === 'computer') {
                    message = t.gameOver.drawVsComputer;
                } else {
                    message = t.gameOver.draw;
                }
            } else {
                if (gameMode === 'computer') {
                    if (playerTime === 0) {
                        message = t.gameOver.playerWin;
                    } else {
                        message = t.gameOver.computerWin;
                    }
                } else {
                    const winnerName = t[`player${playerNames[playerTime]}`] || playerNames[playerTime];
                    message = `${t.gameOver.winner} ${winnerName}!`;
                }
            }
            
            alert(message);
            document.getElementById('new-game-btn').style.display = 'inline-block';
        }, 100);
    }
    
    updateSquare(position);
}

function updateSquare(position) {
    let square = document.getElementById(position.toString());
    let symbol = board[position];

    if (symbol === 'o') {
        square.innerHTML = `
            <div class="icon-wrapper">
                <i class="fa-regular fa-circle game-icon game-icon-o"></i>
            </div>
        `;
    } else if (symbol === 'x') {
        square.innerHTML = `
            <div class="icon-wrapper">
                <i class="fa-regular fa-x game-icon game-icon-x"></i>
            </div>
        `;
    } else {
        square.innerHTML = '';
    }
}

function disableAllSquares() {
    let squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
        square.classList.add('disabled');
    });
}

function updateSquares() {
    let squares = document.querySelectorAll(".square");

    squares.forEach((square) => {
        let position = square.id;
        let symbol = board[position];

        if (symbol != '') {
            updateSquare(position);
        }
    });
}