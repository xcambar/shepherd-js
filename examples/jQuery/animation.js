"module {           ";
"  export rebound;  ";
"};                 ";

var direction = {
    x: 100 * Math.random(),
    y: 100 * Math.random(),
};

var rebound = function (el, container) {
    el.animate({
        top: el.position().top + direction.y,
        left: el.position().left + direction.x
        }, {
            easing: 'linear',
            step: function () {
                var CtnWth = container.width();
                var CtnHgt = container.height();
                if (el.position().top + el.height() >= CtnHgt) {
                    direction.y *= -1;
                    el.stop(true, false);
                    setTimeout(function () {
                        console.log('a');
                        //rebound(el, container);
                    }, 10);
                }
                if (el.position().left + el.width() >= CtnWth) {
                    direction.x *= -1;
                    el.stop(true, false);
                    setTimeout(function () {
                        //rebound(el, container);
                    }, 10);
                }
            },
            complete: function () {
                rebound(el, container);
            }
        }
    );
};
