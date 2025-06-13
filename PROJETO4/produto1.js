document.addEventListener("DOMContentLoaded", function () {
    const toggleTheme = document.getElementById("toggle-theme");
    const body = document.body;

    // Verifica e aplica o tema salvo no localStorage
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
    }

    if (toggleTheme) {
        toggleTheme.addEventListener("click", () => {
            body.classList.toggle("dark-mode");

            // Salva a preferência no localStorage
            localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
        });
    }
});

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
    document.documentElement.style.fontSize = `${savedSize}px`;
    
}

document.addEventListener('DOMContentLoaded', function() {
const carrossel = document.querySelector('.carrossel-container');
const slides = document.querySelectorAll('.carrossel-slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentIndex = 0;
const totalSlides = slides.length;

function updateCarrossel() {
    carrossel.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Atualiza indicadores (se estiver usando)
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

// Event listeners
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Opcional: Autoplay
let autoplay = setInterval(nextSlide, 5000);

// Pausa autoplay quando o mouse está sobre o carrossel
document.querySelector('.carrossel').addEventListener('mouseenter', () => {
    clearInterval(autoplay);
});

document.querySelector('.carrossel').addEventListener('mouseleave', () => {
    autoplay = setInterval(nextSlide, 5000);
});

// Opcional: Toque para mobile
let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.carrossel').addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.querySelector('.carrossel').addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        nextSlide();
    }
    if (touchEndX > touchStartX + 50) {
        prevSlide();
    }
}
});

// Menu hamburguer
const hamburger = document.querySelector('.hamburger-menu');
const navList = document.querySelector('.nav-list');

hamburger.addEventListener('click', () => {
hamburger.classList.toggle('active');
navList.classList.toggle('active');

// Impede a rolagem da página quando o menu está aberto
if (navList.classList.contains('active')) {
document.body.style.overflow = 'hidden';
} else {
document.body.style.overflow = 'auto';
}
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-list a').forEach(link => {
link.addEventListener('click', () => {
hamburger.classList.remove('active');
navList.classList.remove('active');
document.body.style.overflow = 'auto';
});
});
// =============================================
// ACESSIBILIDADE - VERSÃO MELHORADA (MOBILE FRIENDLY)
// =============================================

const accessibilityContainer = document.getElementById('accessibility-container');
const accessibilityBtn = document.getElementById('accessibility-main-btn');
const accessibilityOptions = document.getElementById('accessibility-options');

// Variáveis para controle do arraste
let isDragging = false;
let offsetX, offsetY;

// Função para iniciar o arrasto
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

// Função para mover
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

// Função para finalizar o arrasto
function endDrag() {
if (!isDragging) return;
isDragging = false;
accessibilityBtn.style.cursor = 'grab';
accessibilityContainer.style.transition = 'left 0.2s, top 0.2s';
keepInWindow();
}

// Eventos para mouse
accessibilityBtn.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', moveDrag);
document.addEventListener('mouseup', endDrag);

// Eventos para touch
accessibilityBtn.addEventListener('touchstart', startDrag, {passive: false});
document.addEventListener('touchmove', moveDrag, {passive: false});
document.addEventListener('touchend', endDrag);

// Função para manter dentro da janela
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

// Toggle das opções
accessibilityBtn.addEventListener('click', (e) => {
e.stopPropagation();
accessibilityContainer.classList.toggle('active');
});

// Fechar ao clicar fora
document.addEventListener('click', (e) => {
if (!accessibilityContainer.contains(e.target)) {
accessibilityContainer.classList.remove('active');
}
});

// Ajustar na redimensionamento
window.addEventListener('resize', keepInWindow);
document.addEventListener("DOMContentLoaded", function () {
    // 🌑 Alternar tema (Dark Mode)
    const toggleTheme = document.getElementById("toggle-theme");
    const body = document.body;

    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
    }

    if (toggleTheme) {
        toggleTheme.addEventListener("click", () => {
            body.classList.toggle("dark-mode");
            localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
        });
    }

    // 🔠 Ajuste de acessibilidade (tamanho da fonte)
    const btnAumentarFonte = document.getElementById("increase-font");
    const btnDiminuirFonte = document.getElementById("decrease-font");
    const btnResetFonte = document.getElementById("reset-font");

    let tamanhoFonteAtual = parseInt(localStorage.getItem("tamanho-fonte")) || 16;
    document.documentElement.style.fontSize = tamanhoFonteAtual + "px";

    function changeFontSize(step) {
        tamanhoFonteAtual += step;
        document.documentElement.style.fontSize = tamanhoFonteAtual + "px";
        localStorage.setItem("tamanho-fonte", tamanhoFonteAtual);
    }

    if (btnAumentarFonte) btnAumentarFonte.addEventListener("click", () => changeFontSize(2));
    if (btnDiminuirFonte) btnDiminuirFonte.addEventListener("click", () => changeFontSize(-2));
    if (btnResetFonte) btnResetFonte.addEventListener("click", () => {
        tamanhoFonteAtual = 16;
        document.documentElement.style.fontSize = "16px";
        localStorage.removeItem("tamanho-fonte");
    });

    // 🚚 Cálculo de Frete (Correios)
    async function calcularFreteCorreios() {
        const cepDestino = document.getElementById("cep").value.replace(/\D/g, '');

        if (cepDestino.length !== 8) {
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
});
