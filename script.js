const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function circleshapechange(){
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function(dets) {
        
        clearTimeout(timeout);

        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circlemousefollower(xscale, yscale)

        var timeout = setTimeout(function() {
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`
        }, 100);
    })
}

function circlemousefollower(xscale, yscale){
    window.addEventListener("mousemove", function(dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`
    })
}

function firstpageanim(){
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: "-10",
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })

    .to(".boundingelem", {
        y: 0,
        duration: 2,
        ease: Expo.easeInOut,
        stagger: .2,
        delay: -1
    })

    .from("#herofooter", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut,
        delay: -1
    })
}

document.querySelectorAll(".elem").forEach(function (elem){

    var rotate = 0;
    var diffrot =0;
    elem.addEventListener("mousemove", function (dets){

        var diff = dets.clientY - elem.getBoundingClientRect().top;
        var diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
       console.log(elem.getBoundingClientRect());
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot)
        });
    })

    elem.addEventListener("mouseleave", function (dets){
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5,
        });
    })
})

circlemousefollower();
firstpageanim();
circleshapechange();
