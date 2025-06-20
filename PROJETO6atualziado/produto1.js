document.addEventListener("DOMContentLoaded", function () {
    // =================== TEMA ===================
    const toggleTheme = document.getElementById('toggle-theme');
    const body = document.body;

    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
    }
    if (toggleTheme) {
        toggleTheme.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
    }

    // =================== FONTE ===================
    const increaseFont = document.getElementById('increase-font');
    const decreaseFont = document.getElementById('decrease-font');
    const resetFont = document.getElementById('reset-font');

    function changeFontSize(step) {
        const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
        const newSize = currentSize + (step * 2);
        document.documentElement.style.fontSize = `${newSize}px`;
        localStorage.setItem('fontSize', newSize);
    }

    if (increaseFont) increaseFont.addEventListener('click', () => changeFontSize(1));
    if (decreaseFont) decreaseFont.addEventListener('click', () => changeFontSize(-1));
    if (resetFont) resetFont.addEventListener('click', () => {
        document.documentElement.style.fontSize = '16px';
        localStorage.removeItem('fontSize');
    });

    const savedSize = localStorage.getItem('fontSize');
    if (savedSize) {
        document.documentElement.style.fontSize = `${savedSize}px`;
    }

    // =================== DOMContentLoaded ÚNICO ===================
    window.addEventListener('DOMContentLoaded', function () {
        // ====== CARROSSEL ======
        const carrossel = document.querySelector('.carrossel-container');
        if (carrossel) {
            const slides = document.querySelectorAll('.carrossel-slide');
            const prevBtn = document.querySelector('.prev');
            const nextBtn = document.querySelector('.next');
            let currentIndex = 0;
            const totalSlides = slides.length;

            function updateCarrossel() {
                carrossel.style.transform = `translateX(-${currentIndex * 100}%)`;
                document.querySelectorAll('.carrossel-indicador').forEach((indicador, index) => {
                    indicador.classList.toggle('active', index === currentIndex);
                });
            }

            function nextSlide() {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateCarrossel();
            }

            function prevSlide() {
                currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                updateCarrossel();
            }

            if (nextBtn && prevBtn) {
                nextBtn.addEventListener('click', nextSlide);
                prevBtn.addEventListener('click', prevSlide);
            }

            let autoplay = setInterval(nextSlide, 5000);

            const carrosselEl = document.querySelector('.carrossel');
            if (carrosselEl) {
                carrosselEl.addEventListener('mouseenter', () => clearInterval(autoplay));
                carrosselEl.addEventListener('mouseleave', () => autoplay = setInterval(nextSlide, 5000));
                let touchStartX = 0;
                let touchEndX = 0;
                carrosselEl.addEventListener('touchstart', (e) => {
                    touchStartX = e.changedTouches[0].screenX;
                }, false);
                carrosselEl.addEventListener('touchend', (e) => {
                    touchEndX = e.changedTouches[0].screenX;
                    if (touchEndX < touchStartX - 50) nextSlide();
                    if (touchEndX > touchStartX + 50) prevSlide();
                }, false);
            }
        }

        // ====== MENU HAMBURGUER ======
        const hamburger = document.querySelector('.hamburger-menu');
        const navList = document.querySelector('.nav-list');
        if (hamburger && navList) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navList.classList.toggle('active');
                document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : 'auto';
            });
            document.querySelectorAll('.nav-list a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navList.classList.remove('active');
                    document.body.style.overflow = 'auto';
                });
            });
        }

        // ====== ACESSIBILIDADE ======
        const accessibilityContainer = document.getElementById('accessibility-container');
        const accessibilityBtn = document.getElementById('accessibility-main-btn');
        const accessibilityOptions = document.getElementById('accessibility-options');
        let isDragging = false, offsetX, offsetY;

        function startDrag(e) {
            e.preventDefault();
            isDragging = true;
            const clientX = e.clientX || e.touches[0].clientX;
            const clientY = e.clientY || e.touches[0].clientY;
            const rect = accessibilityContainer.getBoundingClientRect();
            offsetX = clientX - rect.left;
            offsetY = clientY - rect.top;
            accessibilityBtn.style.cursor = 'grabbing';
            accessibilityContainer.style.transition = 'none';
        }
        function moveDrag(e) {
            if (!isDragging) return;
            e.preventDefault();
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            const clientY = e.clientY || (e.touches && e.touches[0].clientY);
            if (clientX === undefined || clientY === undefined) return;
            const x = clientX - offsetX;
            const y = clientY - offsetY;
            accessibilityContainer.style.left = `${x}px`;
            accessibilityContainer.style.top = `${y}px`;
            accessibilityContainer.style.right = 'auto';
        }
        function endDrag() {
            if (!isDragging) return;
            isDragging = false;
            accessibilityBtn.style.cursor = 'grab';
            accessibilityContainer.style.transition = 'left 0.2s, top 0.2s';
            keepInWindow();
        }
        function keepInWindow() {
            const container = accessibilityContainer.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            let left = parseFloat(accessibilityContainer.style.left) || windowWidth - container.width - 20;
            let top = parseFloat(accessibilityContainer.style.top) || 20;
            left = Math.max(0, Math.min(left, windowWidth - container.width));
            top = Math.max(0, Math.min(top, windowHeight - container.height));
            accessibilityContainer.style.left = `${left}px`;
            accessibilityContainer.style.top = `${top}px`;
        }
        if (accessibilityBtn && accessibilityContainer) {
            accessibilityBtn.addEventListener('mousedown', startDrag);
            document.addEventListener('mousemove', moveDrag);
            document.addEventListener('mouseup', endDrag);
            accessibilityBtn.addEventListener('touchstart', startDrag, {passive: false});
            document.addEventListener('touchmove', moveDrag, {passive: false});
            document.addEventListener('touchend', endDrag);
            accessibilityBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                accessibilityContainer.classList.toggle('active');
            });
            document.addEventListener('click', (e) => {
                if (!accessibilityContainer.contains(e.target)) {
                    accessibilityContainer.classList.remove('active');
                }
            });
            window.addEventListener('resize', keepInWindow);
        }

        // ====== FRETE (Correios) ======
        async function calcularFreteCorreios() {
            const cepDestino = document.getElementById("cep")?.value.replace(/\D/g, '');
            if (!cepDestino || cepDestino.length !== 8) {
                alert("Digite um CEP válido!");
                return;
            }
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cepDestino}/json/`);
                const dadosCep = await response.json();
                if (dadosCep.erro) {
                    alert("CEP inválido! Tente novamente.");
                    return;
                }
                // Simulação de frete baseado no destino
                const fretePadrao = (Math.random() * 20 + 10).toFixed(2);
                const freteExpress = (Math.random() * 40 + 20).toFixed(2);
                const fretePremium = (Math.random() * 60 + 30).toFixed(2);
                document.getElementById("resultado-frete").innerHTML = `
                    <p>🚚 Frete para ${dadosCep.localidade} - ${dadosCep.uf}</p>
                    <div class="frete-option">📦 PAC (5-10 dias úteis): <strong>R$ ${fretePadrao}</strong></div>
                    <div class="frete-option">⚡ Sedex (1-3 dias úteis): <strong>R$ ${freteExpress}</strong></div>
                    <div class="frete-option">✈️ Premium (1 dia útil): <strong>R$ ${fretePremium}</strong></div>
                `;
            } catch (error) {
                alert("Erro ao calcular frete! Tente novamente mais tarde.");
            }
        }
        const btnCalcularFrete = document.getElementById("calcular-frete");
        if (btnCalcularFrete) btnCalcularFrete.addEventListener("click", calcularFreteCorreios);

        // ====== ÍCONE DO USUÁRIO E MENU DE LOGOUT ======
        const userIcon = document.getElementById('user-icon');
        const logoutMenu = document.getElementById('logout-menu');
        const logoutBtn = document.getElementById('logout-btn');

        if (localStorage.getItem('isLoggedIn') === 'true') {
            const login = localStorage.getItem('user_login') || '';
            if (login.length >= 2 && userIcon && logoutMenu) {
                // Remove texto antigo das iniciais, se houver
                Array.from(userIcon.childNodes).forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE) userIcon.removeChild(node);
                });
                // Adiciona as iniciais ANTES do menu de logout
                userIcon.insertBefore(document.createTextNode(login.substring(0, 2).toUpperCase()), logoutMenu);
                userIcon.style.display = 'flex';
            }

            // Mostra/oculta o menu ao clicar no ícone
            userIcon.onclick = function(e) {
                e.stopPropagation();
                if (logoutMenu.style.display === 'none' || logoutMenu.style.display === '') {
                    logoutMenu.style.display = 'block';
                } else {
                    logoutMenu.style.display = 'none';
                }
            };

            // Fecha o menu se clicar fora
            document.addEventListener('click', function(e) {
                if (logoutMenu && !userIcon.contains(e.target)) {
                    logoutMenu.style.display = 'none';
                }
            });

            // Logout
            if (logoutBtn) {
                logoutBtn.onclick = function(e) {
                    e.stopPropagation();
                    localStorage.removeItem('isLoggedIn');
                    window.location.reload();
                };
            }
        } else {
            if (userIcon) userIcon.style.display = 'none';
        }
    });

    // Controle de quantidade de produto
    const diminuirBtn = document.querySelector('.diminuir');
    const aumentarBtn = document.querySelector('.aumentar');
    const quantidadeInput = document.querySelector('.controle-quantidade input[type="number"]');

    if (diminuirBtn && aumentarBtn && quantidadeInput) {
        diminuirBtn.addEventListener('click', function (e) {
            e.preventDefault();
            let valor = parseInt(quantidadeInput.value, 10) || 1;
            if (valor > parseInt(quantidadeInput.min, 10)) {
                quantidadeInput.value = valor - 1;
            }
        });

        aumentarBtn.addEventListener('click', function (e) {
            e.preventDefault();
            let valor = parseInt(quantidadeInput.value, 10) || 1;
            if (valor < parseInt(quantidadeInput.max, 10)) {
                quantidadeInput.value = valor + 1;
            }
        });
    }
});
function showToast(message, type = '') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show' + (type ? ' ' + type : '');
    setTimeout(() => {
        toast.className = 'toast';
    }, 2500);
}