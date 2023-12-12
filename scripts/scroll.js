document.addEventListener("DOMContentLoaded", function () {
    const elements = [
        document.querySelector('header'),
        ...document.querySelectorAll('#narrative > div'),
        document.querySelector('footer')
    ];
    let currentElementIndex = 0;

    function scrollToElement(index) {
        if (index < 0 || index >= elements.length) return;
        elements[index].scrollIntoView({ behavior: 'smooth' });
        currentElementIndex = index;
    }

    window.addEventListener('wheel', function(event) {
        if (event.deltaY < 0) {
            // Scrolling up
            scrollToElement(currentElementIndex - 1);
        } else {
            // Scrolling down
            scrollToElement(currentElementIndex + 1);
        }
        event.preventDefault();
    }, { passive: false });
});