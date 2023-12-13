document.addEventListener("DOMContentLoaded", function () {
    const elements = [
        document.querySelector('header'),
         ...document.querySelectorAll('#narrative > div'),
        document.querySelector('footer')
    ];

    function findClosestElementIndex(direction) {
        const currentScroll = window.scrollY;
        let closestIndex = -1;
        let smallestDistance = Infinity;

        elements.forEach((el, index) => {
            const rect = el.getBoundingClientRect();
            const elementTop = rect.top + currentScroll; // Calculate absolute top position

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

    function scrollToElement(index) {
        if (index < 0 || index >= elements.length) return;
        elements[index].scrollIntoView({ behavior: 'smooth' });
    }

    window.addEventListener('wheel', function(event) {
        const direction = event.deltaY < 0 ? 'up' : 'down';
        const closestIndex = findClosestElementIndex(direction);
        scrollToElement(closestIndex);
        event.preventDefault();
    }, { passive: false });

    window.addEventListener('touchend', function(event) {
        let touchY = event.changedTouches[0].clientY;
        let screenHeight = window.innerHeight;
        const direction = touchY < screenHeight / 2 ? 'up' : 'down';
        const closestIndex = findClosestElementIndex(direction);
        scrollToElement(closestIndex);
    });
});
