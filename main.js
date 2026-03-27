document.addEventListener('DOMContentLoaded', () => {
    const ageGate = document.getElementById('age-gate');
    const enterBtn = document.getElementById('enter-btn');
    const exitBtn = document.getElementById('exit-btn');
    
    // Age Gate Lock
    if (localStorage.getItem('age-verified') === 'true') {
        if(ageGate) ageGate.style.display = 'none';
        document.body.style.overflow = 'auto';
    } else {
        document.body.style.overflow = 'hidden';
    }

    if(enterBtn && ageGate) {
        enterBtn.addEventListener('click', () => {
             ageGate.style.opacity = '0';
             ageGate.style.transition = 'opacity 0.4s ease-out';
             setTimeout(() => {
                 ageGate.style.display = 'none';
                 document.body.style.overflow = 'auto';
                 localStorage.setItem('age-verified', 'true');
             }, 400);
        });
    }

    if(exitBtn) {
        exitBtn.addEventListener('click', () => {
            window.location.href = "https://www.google.com";
        });
    }

    // Scroll reveal animation with Intersection Observer
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => {
        el.classList.add('transition-all', 'duration-700', 'ease-out', 'opacity-0', 'translate-y-10');
        observer.observe(el);
    });

    // 🌟 SCIENTIFIC PIPELINE MOTION GRAPHIC CONTROLLER 🌟
    let currentStep = 1;
    const totalSteps = 4;
    
    // Query DOM Elements
    const stepItems = document.querySelectorAll('.pipeline-step-item');
    const displayItems = document.querySelectorAll('.pipeline-view-item');
    const counterDisplay = document.getElementById('purity-counter');

    function updatePipeline() {
        stepItems.forEach(item => {
            const stepId = parseInt(item.getAttribute('data-step'));
            if(stepId === currentStep) {
                item.classList.add('border-clinical-blue', 'bg-blue-50/50');
                item.querySelector('.step-num').classList.add('bg-clinical-blue', 'text-white');
            } else {
                item.classList.remove('border-clinical-blue', 'bg-blue-50/50');
                item.querySelector('.step-num').classList.remove('bg-clinical-blue', 'text-white');
            }
        });

        displayItems.forEach(view => {
             const viewId = parseInt(view.getAttribute('data-step'));
             if(viewId === currentStep) {
                 view.classList.remove('hidden', 'opacity-0');
                 view.classList.add('flex', 'opacity-100');
             } else {
                 view.classList.add('hidden', 'opacity-0');
                 view.classList.remove('flex', 'opacity-100');
             }
        });

        // Trigger Numeric Ticker if Step 4 is active
        if (currentStep === 4 && counterDisplay) {
             animateNumber(counterDisplay, 0, 99.82, 1200);
        }

        // Loop Increment
        currentStep = (currentStep >= totalSteps) ? 1 : currentStep + 1;
    }

    // Smooth Number Counter function
    function animateNumber(element, start, end, duration) {
        let startTime = null;
        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const value = (progress * (end - start) + start).toFixed(2);
            element.textContent = value + '%';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        }
        window.requestAnimationFrame(step);
    }

    // Run the pipeline animation automatically every 3.5 seconds
    if(stepItems.length > 0) {
        setInterval(updatePipeline, 3500);
    }

    // Manual Click Override support for steps clicks
    stepItems.forEach(item => {
        item.addEventListener('click', () => {
             currentStep = parseInt(item.getAttribute('data-step'));
             updatePipeline();
        });
    });

});
