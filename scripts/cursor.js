document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    body.addEventListener('mousedown', () => {
        body.classList.add('cursor-mousedown');
    });

    body.addEventListener('mouseup', () => {
        body.classList.remove('cursor-mousedown');
    });

    body.addEventListener('mouseleave', () => {
        body.classList.remove('cursor-mousedown');
    });
});
