const translations = {
    pt: {
        gameTitle: "Jogo da Velha",
        currentPlayer: "Vez do Jogador:",
        newGame: "🎮 Novo Jogo",
        playerO: "O",
        playerX: "X",
        gameOver: {
            winner: "🎉 Parabéns! O vencedor foi",
            draw: "🤝 Empate! Ninguém ganhou desta vez.",
            playerWin: "🎉 Você ganhou!",
            computerWin: "🤖 O computador ganhou!",
            drawVsComputer: "🤝 Empate contra o computador!"
        },
        stats: {
            title: "Placar",
            playerO: "Jogador O",
            playerX: "Jogador X",
            draws: "Empates",
            resetStats: "🗑️ Limpar Placar",
            resetConfirm: "Tem certeza que deseja limpar todas as estatísticas?",
            player: "Jogador",
            computer: "Computador"
        },
        // NOVAS TRADUÇÕES PARA TELA INICIAL
        initial: {
            title: "Jogo da Velha",
            subtitle: "Escolha o modo de jogo",
            humanTitle: "2 Jogadores",
            humanDesc: "Jogue contra um amigo",
            computerTitle: "vs Computador",
            computerDesc: "Desafie a inteligência artificial"
        },
        // INDICADORES DE MODO
        modeIndicator: {
            human: "2 Jogadores",
            computer: "vs Computador"
        }
    },
    
    en: {
        gameTitle: "Tic Tac Toe",
        currentPlayer: "Current Player:",
        newGame: "🎮 New Game",
        playerO: "O",
        playerX: "X",
        gameOver: {
            winner: "🎉 Congratulations! The winner is",
            draw: "🤝 It's a tie! Nobody won this time.",
            playerWin: "🎉 You won!",
            computerWin: "🤖 Computer won!",
            drawVsComputer: "🤝 It's a tie against computer!"
        },
        stats: {
            title: "Score",
            playerO: "Player O",
            playerX: "Player X",
            draws: "Draws",
            resetStats: "🗑️ Reset Score",
            resetConfirm: "Are you sure you want to clear all statistics?",
            player: "Player",
            computer: "Computer"
        },
        // NOVAS TRADUÇÕES PARA TELA INICIAL
        initial: {
            title: "Tic Tac Toe",
            subtitle: "Choose game mode",
            humanTitle: "2 Players",
            humanDesc: "Play against a friend",
            computerTitle: "vs Computer",
            computerDesc: "Challenge the artificial intelligence"
        },
        // INDICADORES DE MODO
        modeIndicator: {
            human: "2 Players",
            computer: "vs Computer"
        }
    }
};

// Idioma padrão
let currentLanguage = 'pt';