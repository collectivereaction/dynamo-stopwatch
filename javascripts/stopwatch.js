var dynamo = new AWS.DynamoDB({
    region: 'us-east-1',
    accessKeyId: 'AKIAJDAG46VPWRORTVUA',
    secretAccessKey: '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'
});

function updateStopwatch($time) {
    $time.html(Date.now());
}

function sendToDynamo(opts, callback) {
    var goodRequests = opts.goodTimes.map(function(goodtime) {
        return {
            PutRequest: {
                Item: {
                    id: {
                        S: opts.id
                    },
                    time: {
                        N: '' + goodtime
                    },
                    'event': {
                        S: 'goodness'
                    }
                }
            }
        };
    });


    var badRequests = opts.badTimes.map(function(badtime) {
        return {
            PutRequest: {
                Item: {
                    id: {
                        S: opts.id
                    },
                    time: {
                        N: '' + badtime
                    },
                    'event': {
                        S: 'badness'
                    }
                }
            }
        };
    });

    dynamo.batchWriteItem({
        RequestItems: {
            'game-test': goodRequests.concat(badRequests)
        }
    }, function(err, res) {
        if (err) console.error('ERROR!!', err);
        console.log('wrote', res);
        return callback();
    });
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
        $clear = $('.btn-clear-js'),
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

            $sessionID.val('');
            $badList.html('');
            $goodList.html('');
            goodTimes = [];
            badTimes = [];

            return;
        });
    });

    $clear.click(function() {
        $sessionID.val('');
        $badList.html('');
        $goodList.html('');
        goodTimes = [];
        badTimes = [];
    });
});
