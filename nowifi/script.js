document.addEventListener('mousemove', function(e) {
    const glow = document.querySelector('.glow');
    const x = e.clientX;
    const y = e.clientY;

    glow.style.transform `translate(${x - 50}px, ${y - 50}px)`;
    glow.style.opacity = 1

    setTimeout(()=> {
        glow.style.opacity = 0;
    }, 200);
})