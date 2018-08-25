var particles = Particles.init({
    selector: '.background',
    maxParticles: 500,
    color: ['#003d14', '#f5a82a', '#7a0036'],
    sizeVariations: 5,
    responsive: [{
        breakpoint: 768,
        options: {
            maxParticles: 400,
        }
    }, {
        breakpoint: 425,
        options: {
            maxParticles: 200,
        }
    }, {
        breakpoint: 320,
        options: {
            maxParticles: 100
        }
    }]
});
