/**
 * Created by Jieyi on 3/13/16.
 */

$(document).ready(function ()
{
    $('.owl-carousel').owlCarousel({
        stagePadding: 50,
        margin: 10,
        nav: true,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 4
            },
            1000: {
                items: 4
            }
        }
    })
});