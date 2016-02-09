var dynamo = new AWS.DynamoDB({
    region: 'us-east-1',
    credentials: ''
});

function updateStopwatch($time) {
    $time.html(Date.now());
}

function sendToDynamo(opts, callback) {

    setTimeout(function() {
        return callback();
    }, 1000);
}

$(document).ready(function() {
    var goodTimes = [],
        badTimes = [];

    var $time = $('.time-js'),
        $good = $('.btn-good-js'),
        $goodList = $('.list-good-js'),
        $bad = $('.btn-bad-js'),
        $badList = $('.list-bad-js'),
        $sessionID = $('.session-id-js'),
        $send = $('.btn-send-js'),
        $loader = $('.loading-mask');


    var interval_id = setInterval(updateStopwatch, 10, $time);
    $good.click(function(smth) {
        $goodList.append('<li><strong>' + Date.now() + '</strong></li>');
        goodTimes.push(Date.now());
    });

    $bad.click(function(smth) {
        $badList.append('<li><strong>' + Date.now() + '</strong></li>');
        badTimes.push(Date.now());
    });

    $send.click(function(smth) {
        $loader.addClass('show');

        return sendToDynamo({
            id: $sessionID.val(),
            goodTimes: goodTimes,
            badTimes: badTimes
        }, function(err) {
            $loader.removeClass('show');
            if (err) alert(err);

            $badList.html('');
            $goodList.html('');
            goodTimes = [];
            badTimes = [];

            return;
        });
    });
});
