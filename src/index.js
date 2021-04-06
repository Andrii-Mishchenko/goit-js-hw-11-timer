import './css/styles.css'

class CountdownTimer {

    constructor({selector, finalDate}) {
        this.intervalId = null;
        this.selector = selector;
        this.finalDate = finalDate;
    }

    start() {
        const targetDate = this.finalDate;
 

        this.intervalId = setInterval(() => {
            const currentDate = Date.now();
            const deltaTime = targetDate - currentDate;

            if (deltaTime <= 0) {
                const time = this.getTimeComponents(0);        
                this.updateTimerFace(time, this.selector);
                
                return clearInterval(this.intervalId);                
            }

            const time = this.getTimeComponents(deltaTime)
        
            this.updateTimerFace(time, this.selector);
        }, 1000);
    }

    pad(value) {
        return String(value).padStart(2, '0');
    }
    
    // считаем кол-во дней, часов... в разнице запланированой даты и текущей
    getTimeComponents(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

        return { days, hours, mins, secs };
    }

    updateTimerFace({ days, hours, mins, secs }, selector) {
        const timerSelector = document.querySelector(`${selector}`)
        timerSelector.querySelector('[data-value="days"]').textContent = `${days}`;
        timerSelector.querySelector('[data-value="hours"]').textContent = `${hours}`;
        timerSelector.querySelector('[data-value="mins"]').textContent = `${mins}`;
        timerSelector.querySelector('[data-value="secs"]').textContent = `${secs}`;
    }
    
}

const timer = new CountdownTimer({  
    selector: '#timer-1',
    finalDate: new Date('May 20, 2021'),
});
timer.start()

// const refs = {
//     days: document.querySelector('[data-value="days"]'),
//     hours: document.querySelector('[data-value="hours"]'),
//     mins: document.querySelector('[data-value="mins"]'),
//     secs: document.querySelector('[data-value="secs"]'),
// }

// function updateTimerFace({ days, hours, mins, secs }) {
//     refs.days.textContent = `${days}`;
//     refs.hours.textContent = `${hours}`;
//     refs.mins.textContent = `${mins}`;
//     refs.secs.textContent = `${secs}`;
// }

// /*
//  * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
//  * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
//  */
// const days = Math.floor(time / (1000 * 60 * 60 * 24));

// /*
//  * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
//  * остатка % и делим его на количество миллисекунд в одном часе
//  * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
//  */
// const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

// /*
//  * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
//  * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
//  */
// const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

// /*
//  * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
//  * миллисекунд в одной секунде (1000)
//  */
// const secs = Math.floor((time % (1000 * 60)) / 1000);