const toggleTheme = document.getElementById('toggle-theme');
        const body = document.body;
        
        toggleTheme.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
        });


        if (localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark-mode');
        }

  
        const increaseFont = document.getElementById('increase-font');
        const decreaseFont = document.getElementById('decrease-font');
        const resetFont = document.getElementById('reset-font');
        
        increaseFont.addEventListener('click', () => {
            changeFontSize(1);
        });
        
        decreaseFont.addEventListener('click', () => {
            changeFontSize(-1);
        });
        
        resetFont.addEventListener('click', () => {
            document.documentElement.style.fontSize = '16px';
            localStorage.removeItem('fontSize');
        });

        function changeFontSize(step) {
            const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            const newSize = currentSize + (step * 2);
            document.documentElement.style.fontSize = `${newSize}px`;
            localStorage.setItem('fontSize', newSize);
        }

       
        const savedSize = localStorage.getItem('fontSize');
        if (savedSize) {
            document.documentElement.style.fontSize = `${savedSize}px`; }