class SlotMachine {
    constructor() {
        this.symbols = ['🍒', '🍊', '🍇', '💎', '💰'];
        this.multipliers = {
            '🍒': 3,
            '🍊': 4,
            '🍇': 5,
            '💎': 10,
            '💰': 20
        };
        this.balance = 1000;
        this.totalBets = 0;
        this.totalWins = 0;
        
        // Initialize UI elements
        this.betInput = document.getElementById('betAmount');
        this.spinButton = document.getElementById('spinButton');
        this.slotResult = document.getElementById('slotResult');
        this.resultMessage = document.getElementById('resultMessage');
        this.playerInfo = document.getElementById('playerInfo');
        this.totalBetsDisplay = document.getElementById('totalBets');
        this.totalWinsDisplay = document.getElementById('totalWins');
        
        // Add event listeners
        this.spinButton.addEventListener('click', () => this.spin());
        this.updateStats();
    }

    spin() {
        const bet = parseInt(this.betInput.value);
        
        // Validate bet
        if (isNaN(bet) || bet <= 0) {
            this.showMessage('Please enter a valid bet amount', 'danger');
            return;
        }
        
        if (bet > this.balance) {
            this.showMessage('Insufficient funds', 'danger');
            return;
        }

        // Deduct bet
        this.balance -= bet;
        this.totalBets += bet;

        // Disable spin button during animation
        this.spinButton.disabled = true;
        
        // Add spinning animation
        this.slotResult.classList.add('spinning');
        
        // Generate result after delay
        setTimeout(() => {
            // Generate random symbols
            const result = Array(3).fill(0).map(() => 
                this.symbols[Math.floor(Math.random() * this.symbols.length)]
            );
            
            // Display result
            this.slotResult.textContent = result.join(' ');
            this.slotResult.classList.remove('spinning');
            
            // Calculate winnings
            let winnings = 0;
            if (result[0] === result[1] && result[1] === result[2]) {
                const multiplier = this.multipliers[result[0]];
                winnings = bet * multiplier;
                this.totalWins += winnings;
                this.balance += winnings;
                this.showMessage(`Congratulations! You won $${winnings}!`, 'success');
            } else {
                this.showMessage('Try again!', 'danger');
            }
            
            // Update UI
            this.updateStats();
            this.spinButton.disabled = false;
        }, 1000);
    }

    showMessage(message, type) {
        this.resultMessage.textContent = message;
        this.resultMessage.className = `alert alert-${type} mt-3`;
        this.resultMessage.style.display = 'block';
    }

    updateStats() {
        this.playerInfo.textContent = `Welcome, Srijandev145 | Balance: $${this.balance}`;
        this.totalBetsDisplay.textContent = `$${this.totalBets}`;
        this.totalWinsDisplay.textContent = `$${this.totalWins}`;
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.slotMachine = new SlotMachine();
});