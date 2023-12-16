window.onload = function() {
    const canvas = document.getElementById('redLineCanvas');
    const ctx = canvas.getContext('2d');
    let character1 = document.getElementById('character1');
    let character2 = document.getElementById('character2');
    let highlight = document.querySelector('.highlight');
    let currentPanelIndex = 0;

    const panels = [document.querySelector('header'), ...document.querySelectorAll('#narrative > div'), document.querySelector('footer')];

    function getPanelIndexInView() {
        let closestIndex = -1;
        let smallestDistance = Infinity;
    
        panels.forEach((panel, index) => {
            const rect = panel.getBoundingClientRect();
            const distanceToTop = Math.abs(rect.top);
    
            if (distanceToTop < smallestDistance) {
                smallestDistance = distanceToTop;
                closestIndex = index;
            }
        });
    
        return closestIndex;
    }

    function updateCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = document.body.scrollHeight;
    }

    function drawWavyLine() {
        if (!character1 || !character2 || !highlight) {
            console.error("One or more required elements are missing.");
            return;
        }
    
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        let opacity = 1; 
        if (currentPanelIndex === 1) {
            opacity = 0; 
        } else {
            const panelRect = panels[currentPanelIndex].getBoundingClientRect();
            const distanceFromTop = Math.abs(panelRect.top);
            const panelHeight = panelRect.height;
            opacity = Math.max(0, 1 - (distanceFromTop / (panelHeight * 0.5)));
        }
    
        if (opacity <= 0) {
            return;
        }
    
        ctx.strokeStyle = 'rgba(240, 91, 91,' + opacity + ')';
        
        let startRect = character1.getBoundingClientRect();
        let endRect = character2.getBoundingClientRect();
        let highlightRect = highlight.getBoundingClientRect();
    
        let emSize = parseFloat(getComputedStyle(document.body).fontSize);
    
        let startX = startRect.left + startRect.width / 2;
        let startY = startRect.top + startRect.height / 2 + window.scrollY;
        let endX = endRect.left + endRect.width / 2;
        let endY = endRect.top + endRect.height / 2 + window.scrollY;
    
        let scribbleStartX = highlightRect.left + (emSize*4); 
        let scribbleStartY = highlightRect.top + window.scrollY + highlightRect.height + (emSize*7);
    
        let amplitude = 20;
        let frequency = 1.5;
    
        ctx.beginPath();
        ctx.moveTo(startX, startY);
    
        // Vary the width in the wavy line section
        for (let i = 0; i <= 1; i += 0.01) {
            let x = lerp(startX, scribbleStartX, i);
            let y = lerp(startY, scribbleStartY, i) + amplitude * Math.sin(frequency * i * 2 * Math.PI);
            ctx.lineWidth = 2 + Math.sin(i * Math.PI) * 3; // Varies between 2 and 5
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
        }
    
        let lastX = scribbleStartX, lastY = scribbleStartY;
        // Vary the width in the scribble loops section
        for (let i = 0; i < 15; i++) {
            let nextX = scribbleStartX + Math.random() * 100 - 50;
            let nextY = scribbleStartY + Math.random() * 100 - 50;
    
            let cp1X = (lastX + nextX) / 2 + Math.random() * 50 - 25;
            let cp1Y = (lastY + nextY) / 2 + Math.random() * 50 - 25;
    
            ctx.quadraticCurveTo(cp1X, cp1Y, nextX, nextY);
            ctx.lineWidth = 2 + Math.random() * 3; // Randomly varies between 2 and 5
            lastX = nextX;
            lastY = nextY;
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(nextX, nextY);
        }
    
        // Vary the width in the final wavy line section
        for (let i = 0; i <= 1; i += 0.01) {
            let x = lerp(lastX, endX, i);
            let y = lerp(lastY, endY, i) + amplitude * Math.sin(frequency * i * 2 * Math.PI);
            ctx.lineWidth = 2 + Math.sin(i * Math.PI) * 3; // Varies between 2 and 5
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
        }
    }
    
    function lerp(start, end, t) {
        return start * (1 - t) + end * t;
    }
    

    function updateHighlightElement() {
        let mostVisiblePanel = null;
        let maxVisibleArea = 0;
    
        panels.forEach((panel, index) => {
            const rect = panel.getBoundingClientRect();
            const visibleArea = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
    
            if (visibleArea > maxVisibleArea) {
                maxVisibleArea = visibleArea;
                mostVisiblePanel = panel;
                currentPanelIndex = index; 
            }
        });
    
        if (mostVisiblePanel) {
            const newHighlightElements = mostVisiblePanel.getElementsByClassName('highlight');
    
            if (newHighlightElements.length > 0) {
                highlight = newHighlightElements[0]; 
            }
        }
    }

    window.addEventListener('resize', function() {
        updateCanvasSize();
        drawWavyLine();
    });

    window.addEventListener('scroll', function() {
        currentPanelIndex = getPanelIndexInView(); 
        updateHighlightElement();
        requestAnimationFrame(function() {
            updateCanvasSize();
            drawWavyLine();
        });
    });

    currentPanelIndex = getPanelIndexInView(); 
    updateHighlightElement();
    updateCanvasSize();
    drawWavyLine();
};
