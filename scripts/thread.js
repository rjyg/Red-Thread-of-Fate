document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById('redLineCanvas');
    const ctx = canvas.getContext('2d');
    const character1 = document.getElementById('character1');
    const character2 = document.getElementById('character2');
    const highlight = document.getElementById('highlight'); // Get the highlight element

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
        let highlightRect = document.getElementById('highlight').getBoundingClientRect();

        let emSize = parseFloat(getComputedStyle(document.body).fontSize);

        let startX = startRect.left + 90;
        let startY = startRect.top + 50;
        let endX = endRect.left + 80;
        let endY = endRect.top + 50;

        // Start scribble near the highlight element
        let scribbleStartX = highlightRect.right - (emSize*4); // X position at the right of the highlight element
        let scribbleStartY = highlightRect.top + highlightRect.height + (emSize*6);

        let amplitude = 20;
        let frequency = 1.5;

        ctx.beginPath();
        ctx.moveTo(startX, startY);

        // Draw wavy line to the scribble start point
        let lastX = startX, lastY = startY;
        for (let i = 0; i <= 1; i += 0.01) {
            let x = lerp(startX, scribbleStartX, i);
            let y = lerp(startY, scribbleStartY, i) + amplitude * Math.sin(frequency * i * 2 * Math.PI);
            ctx.lineTo(x, y);
            lastX = scribbleStartX;
            lastY = scribbleStartY;
        }

        // Create curves that mimic random scribble loops
        for (let i = 0; i < 15; i++) {
            let nextX = scribbleStartX + Math.random() * 100 - 50;
            let nextY = scribbleStartY + Math.random() * 100 - 50;

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

    window.onload = function() {
        updateCanvasSize();
        drawWavyLine();
        // setInterval(function() {
        //     updateCanvasSize();
        //     drawWavyLine();
        // }, 100);
    };    
    
});