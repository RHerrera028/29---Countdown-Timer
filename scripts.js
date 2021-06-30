let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    clearInterval(countdown);                                           //en caso de que se opriman multiples timers, cada nuevo borra al anterior
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);                                           //para que empieza a mostrar el tiempo antes del primer segundo
    displayEndTime(then);                                               //el tiempo que termina

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);     //entre 1000 para convertir milisegundos en segundos
        if(secondsLeft < 0) {
            clearInterval(countdown);                                   //era necesario darle un nombre al intervalo para que se pueda detener con esto, el return no es suficiente
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);                                                           //corre cada segundo
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be back at ${hour > 12 ? hour -12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`;       //las horas estan en 24, asi que hay que restarle 12 con un if si se pasa
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;                                //minutes es el nombre del input en el html, no es el const de arriba
    timer(mins * 60);
    this.reset();
});