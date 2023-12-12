document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById('redLineCanvas');
    const ctx = canvas.getContext('2d');
    const character1 = document.getElementById('character1');
    const character2 = document.getElementById('character2');

    function updateCanvasSize() {
        const char1Rect = character1.getBoundingClientRect();
        const char2Rect = character2.getBoundingClientRect();

        // Check which character is lower on the screen
        const lowerCharBottom = Math.max(char1Rect.bottom, char2Rect.bottom);

        // Set canvas dimensions
        canvas.width = document.documentElement.clientWidth; // Width of the viewport excluding vertical scrollbar
        canvas.height = Math.max(window.innerHeight, lowerCharBottom); // Height based on the lower character
    }

    function drawWavyLine() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let startRect = character1.getBoundingClientRect();
        let endRect = character2.getBoundingClientRect();

        let startX = startRect.left + 90;
        let startY = startRect.top + 50;
        let endX = endRect.left + 80;
        let endY = endRect.top + 50;
        let middleX = window.innerWidth / 2 + 350;
        let middleY = window.innerHeight / 3 + 450;

        let amplitude = 20;
        let frequency = 1.5;

        ctx.beginPath();
        ctx.moveTo(startX, startY);

        // Draw wavy line to the middle
        let lastX = startX, lastY = startY;
        for (let i = 0; i <= 1; i += 0.01) {
            let x = lerp(startX, middleX, i);
            let y = lerp(startY, middleY, i) + amplitude * Math.sin(frequency * i * 2 * Math.PI);
            ctx.lineTo(x, y);
            lastX = x;
            lastY = y;
        }

        // Create curves that mimic random scribble loops
        for (let i = 0; i < 15; i++) {
            let nextX = middleX + Math.random() * 100 - 50;
            let nextY = middleY + Math.random() * 100 - 50;

            let cp1X = (lastX + nextX) / 2 + Math.random() * 50 - 25;
            let cp1Y = (lastY + nextY) / 2 + Math.random() * 50 - 25;

            ctx.quadraticCurveTo(cp1X, cp1Y, nextX, nextY);

            lastX = nextX;
            lastY = nextY;
        }

        // Continue wavy line from scribble to end
        for (let i = 0; i <= 1; i += 0.01) {
            let x = lerp(lastX, endX, i);
            let y = lerp(lastY, endY, i) + amplitude * Math.sin(frequency * i * 2 * Math.PI);
            ctx.lineTo(x, y);
        }

        ctx.lineWidth = 2;
        ctx.strokeStyle = '#f05b5b';
        ctx.stroke();
    }

    function lerp(start, end, t) {
        return start * (1 - t) + end * t;
    }

    window.addEventListener('resize', function () {
        updateCanvasSize();
        drawWavyLine();
    });

    updateCanvasSize();
    drawWavyLine();
});