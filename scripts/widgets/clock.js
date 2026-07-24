
export function Time(element) {

    const secs = element.dataset.seconds === 'true';

    function update() {
        const now = new Date();

        element.innerText = secs
        ? now.toLocaleTimeString()
        : now.toLocaleTimeString([], {hours: '2-digit', minute: '2-digit'});
    }

    update();
    setInterval(update, 1000);
}