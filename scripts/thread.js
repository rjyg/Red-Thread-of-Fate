window.onload = function() {
    const canvas = document.getElementById('redLineCanvas');
    const ctx = canvas.getContext('2d');
    const character1 = document.getElementById('character1');
    const character2 = document.getElementById('character2');
    let highlight = document.getElementById('highlight'); // Initial highlight element

    function updateCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = document.body.scrollHeight; // Height of the entire scrollable document
    }

    function drawWavyLine() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let startRect = character1.getBoundingClientRect();
        let endRect = character2.getBoundingClientRect();
        let highlightRect = highlight.getBoundingClientRect(); // Updated to the current highlight element

        let emSize = parseFloat(getComputedStyle(document.body).fontSize);

        let startX = startRect.left + startRect.width / 2;
        let startY = startRect.top + startRect.height / 2 + window.scrollY;
        let endX = endRect.left + endRect.width / 2;
        let endY = endRect.top + endRect.height / 2 + window.scrollY;

        let scribbleStartX = highlightRect.left + (emSize*4); // Adjusted position for scribble start
        let scribbleStartY = highlightRect.top + window.scrollY + highlightRect.height + (emSize*6);

        let amplitude = 20;
        let frequency = 1.5;

        ctx.beginPath();
        ctx.moveTo(startX, startY);

        // Draw wavy line to the scribble start point
        for (let i = 0; i <= 1; i += 0.01) {
            let x = lerp(startX, scribbleStartX, i);
            let y = lerp(startY, scribbleStartY, i) + amplitude * Math.sin(frequency * i * 2 * Math.PI);
            ctx.lineTo(x, y);
        }

        // Create curves that mimic random scribble loops
        let lastX = scribbleStartX, lastY = scribbleStartY;
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

    function updateHighlightElement() {
        // Find the panel that occupies the most space in the viewport
        const panels = [
            document.querySelector('header'),
            ...document.querySelectorAll('#narrative > div'),
            document.querySelector('footer')
        ];
    
        let mostVisiblePanel = null;
        let maxVisibleArea = 0;
    
        panels.forEach(panel => {
            const rect = panel.getBoundingClientRect();
            const visibleArea = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
    
            if (visibleArea > maxVisibleArea) {
                maxVisibleArea = visibleArea;
                mostVisiblePanel = panel;
            }
        });
    
        if (mostVisiblePanel) {
            const newHighlight = mostVisiblePanel.querySelector('span#highlight');
            if (newHighlight) {
                highlight = newHighlight;
            }
        }
    }
    

    window.addEventListener('resize', function () {
        updateCanvasSize();
        drawWavyLine();
    });

    window.addEventListener('scroll', function() {
        // Update the highlight element first
        updateHighlightElement();
    
        // Use requestAnimationFrame to ensure drawing is synced with the browser's rendering
        requestAnimationFrame(function() {
            updateCanvasSize();
            drawWavyLine();
        });
    });
    
    // Initial canvas setup and draw
    updateCanvasSize();
    drawWavyLine();
};
