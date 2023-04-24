function getRandomValue(min, max) {

    return Math.floor(Math.random() * (max - min) + min)
}
let ss = 22

const app = Vue.createApp({

    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
            currentRound: 0,
            winner: null, // falsy value
            logMessages: []
        }
    },

    computed: {

        monsterHealthStyle() {

            return {
                width: this.monsterHealth < 0 ? '0%' : `${this.monsterHealth}%`
            }
        },

        playerHealthStyle() {

            return {
                width: this.playerHealth < 0 ? '0%' : `${this.playerHealth}%`
            }
        },

        shouldAttackSpecially() {

            if ( this.currentRound % 3 === 0 )
                return false

            return true
        }
    },

    watch: {
        monsterHealth(value) {
            
            if ( value < 0 ) this.winner = 'player'
        },

        playerHealth(value) {

            if ( value <=0 && this.monsterHealth <= 0 ) {
                
                this.winner = 'draw'
            } else if (value < 0) {
                
                this.winner = 'monster'
            }
        }
    },

    methods: {
        attackMonster() {

            let randomValue = getRandomValue(5, 12)
            
            this.currentRound++
            this.monsterHealth -= randomValue

            this.logIt('player', 'attack', randomValue)
            this.attackPlayer()
        },

        attackPlayer() {

            let randomValue = getRandomValue(8, 15)

            this.playerHealth -= randomValue

            this.logIt('monster', 'attack', randomValue)
        },

        specialAttack() {

            let randomValue = getRandomValue(10, 25)
            
            this.monsterHealth -= randomValue
            this.currentRound++; 
            
            this.logIt('monster', 'attack', randomValue)
            
            this.attackPlayer()
        },

        heal() {
            let healthValue = getRandomValue(8, 25)
            
            if ( this.playerHealth + healthValue <= 100 ) {
                
                this.playerHealth += getRandomValue(8 ,20)
            } else {
                
                this.playerHealth = 100
            }
            
            this.logIt('player', 'healed', healthValue)

            this.attackPlayer()
        },

        startNew() {
            this.playerHealth = 100
            this.monsterHealth = 100
            this.currentRound = 0
            this.winner = null
        },

        surrender() {
            this.winner = 'monster'
        },

        logIt(who, what, attackValue) {

            this.logMessages.unshift({
                who: who,
                what: what,
                attackValue: attackValue
            })
        }
    },
    mounted() {
        let varr = 'wer'
        console.log('mounted')
    },
}).mount('#game')