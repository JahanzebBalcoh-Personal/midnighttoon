// App Initialization and Global Logic

document.addEventListener('DOMContentLoaded', () => {
    // 1. Check Age Verification Cookie
    const ageVerified = localStorage.getItem('midnightToon_age_verified');
    const ageGate = document.getElementById('age-gate');
    
    if (!ageVerified) {
        // Show age gate
        ageGate.classList.remove('hidden');
        
        document.getElementById('btn-age-yes').addEventListener('click', () => {
            localStorage.setItem('midnightToon_age_verified', 'true');
            ageGate.classList.add('opacity-0');
            setTimeout(() => {
                ageGate.classList.add('hidden');
            }, 500);
        });
        
        document.getElementById('btn-age-no').addEventListener('click', () => {
            window.location.href = 'https://www.google.com'; // Redirect away
        });
    } else {
        ageGate.classList.add('hidden');
    }

    // 2. Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // 3. Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg');
            navbar.querySelector('.bg-primary\\/90').classList.replace('bg-primary/90', 'bg-black/95');
        } else {
            navbar.classList.remove('shadow-lg');
            navbar.querySelector('.bg-black\\/95')?.classList.replace('bg-black/95', 'bg-primary/90');
        }
    });

    // 4. Initialize Router
    router.init();
});
