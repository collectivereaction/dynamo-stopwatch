var stopwatch = function() {
    var goodTimes = [],
        badTimes = [];

    return {
        onStart: function() {},
        addBadTime: function(time, cb) {
        },
        addGoodTime: function(time, cb) {
        },
        sendToDynamo: function(cb) {
        }
    };
}

$(document).ready(function() {
    console.log('ready');

    $('.btn-good-js').click(function(smth) {
        console.log('Good clicked at', Date.now());
    });

    $('.btn-bad-js').click(function(smth) {
        console.log('Good clicked at', Date.now());
    });

    $('.btn-send-js').click(function(smth) {
        console.log('Submit clicked at', Date.now());
    });
});
