// Event listener to wait for page to fully load before running the script
document.addEventListener("DOMContentLoaded", function () {
    // Places header element and narrative divs into an array
    const elements = [
        document.querySelector('header'),
        ...document.querySelectorAll('#narrative > div')
    ];

    // Function finds the closest element in the direction the user is attempting to scroll
    function findClosestElementIndex(direction) {
        const currentScroll = window.scrollY;
        let closestIndex = -1;
        let smallestDistance = Infinity;

        // Loops through the array to find the closest in the given direction
        elements.forEach((el, index) => {
            const rect = el.getBoundingClientRect();
            const elementTop = rect.top + currentScroll;

            if (direction === 'up' && elementTop < currentScroll) {
                const distance = currentScroll - elementTop;
                if (distance < smallestDistance) {
                    smallestDistance = distance;
                    closestIndex = index;
                }
            } else if (direction === 'down' && elementTop > currentScroll) {
                const distance = elementTop - currentScroll;
                if (distance < smallestDistance) {
                    smallestDistance = distance;
                    closestIndex = index;
                }
            }
        });

        return closestIndex;
    }

    // Scrolls to the element with smooth scroll behaviour
    function scrollToElement(index) {
        if (index < 0 || index >= elements.length) return;
        elements[index].scrollIntoView({ behavior: 'smooth' });
    }

    // Event listener to detect if the user (on desktop) scrolls up or down and scrolls in the respective direction
    window.addEventListener('wheel', function (event) {
        const direction = event.deltaY < 0 ? 'up' : 'down';
        const closestIndex = findClosestElementIndex(direction);
        scrollToElement(closestIndex);
        event.preventDefault();
    }, { passive: false });

    // Event listener to detect if the user (on mobile) touches the top or bottom half of the screen
    // Top half: Scroll up
    // Bottom half: Scroll down
    window.addEventListener('touchend', function (event) {
        let touchY = event.changedTouches[0].clientY;
        let screenHeight = window.innerHeight;
        const direction = touchY < screenHeight / 2 ? 'up' : 'down';
        const closestIndex = findClosestElementIndex(direction);
        scrollToElement(closestIndex);
    });
});
