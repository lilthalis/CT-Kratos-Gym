document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       STICKY NAVBAR & SCROLL HANDLING
       ========================================================================== */
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       MOBILE MENU TOGGLE
       ========================================================================== */
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Alterna o ícone de bars para xmark quando ativo
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
    });

    // Fecha o menu ao clicar em qualquer link (Mobile UX)
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-xmark');
        });
    });

    /* ==========================================================================
       SCROLL REVEAL ANIMATION (Intersection Observer)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Roda a animação apenas uma vez
            }
        });
    }, {
        threshold: 0.15, // Gatilho dispara quando 15% do elemento estiver visível
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /* ==========================================================================
       ANIMATED STATISTICS COUNTER
       ========================================================================== */
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const countUp = (element) => {
        const target = +element.getAttribute('data-target');
        const speed = target / 60; // Ajusta a velocidade da contagem baseado no valor final
        
        const updateCount = () => {
            const current = +element.innerText;
            if (current < target) {
                element.innerText = Math.ceil(current + speed);
                setTimeout(updateCount, 25);
            } else {
                element.innerText = target;
            }
        };
        updateCount();
    };

    const statsSection = document.querySelector('.stats-section');
    
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(stat => countUp(stat));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    if(statsSection) {
        statsObserver.observe(statsSection);
    }

    /* ==========================================================================
       FORM INTERACTION HANDLING
       ========================================================================== */
    const form = document.getElementById('kratosForm');
    
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Captura de dados básica
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const goalSelect = document.getElementById('goal');
            const goalText = goalSelect.options[goalSelect.selectedIndex].text;
            
            // Feedback Visual de Carregamento Premium
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = "ENVIANDO CREDENCIAIS...";
            submitBtn.disabled = true;

            setTimeout(() => {
                // Simulação de redirecionamento para o WhatsApp com os dados estruturados
                const textMessage = `Olá CT KRATOS GYM, gostaria de agendar minha aula experimental.\n\n*Nome:* ${name}\n*WhatsApp:* ${phone}\n*Objetivo:* ${goalText}`;
                const encodedMessage = encodeURIComponent(textMessage);
                
                // Redireciona
                window.open(`https://wa.me/5511999998888?text=${encodedMessage}`, '_blank');
                
                // Reseta botão
                submitBtn.innerText = "APLICAÇÃO ENVIADA!";
                form.reset();
                
                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }, 1200);
        });
    }
});