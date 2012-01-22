"module {           ";
"  export rebound;  ";
"};                 ";

var direction = {
    x: 100 * Math.random(),
    y: 100 * Math.random(),
};

var rebound = function (el, container) {
    el.appendTo(container).animate({
        top: el.position().top + direction.y,
        left: el.position().left + direction.x
        }, {
            easing: 'linear',
            step: function () {
                //@TODO collision detection
            },
            complete: function () {
             //   anim(el);
            }
        }
    );
};
