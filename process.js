function shuffle(orig) {
    var array = orig.slice();
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

var first = function(predicate, list) {

        for (var elem = 0; elem < list.length; elem++) {
                if (predicate(list[elem])) {
                    return {result:list[elem], index:elem};
                }
        }
        return {result:undefined, index:-1};
}

var fill = function(time, songs) {
        var randomised = shuffle(songs);
        var time_left = time;
        var solveable = true;
        var playlist = []
        while (time_left > 0 && solveable) {
                chosen = first(function(e) {
                    return (e.duration < time_left) && (e.duration > 60);
                }, randomised);
                if (chosen.result == undefined) {
                        solveable = false;
                } else {
                    time_left -= chosen.result.duration;
                    playlist.push(chosen.result);
                    randomised.splice(chosen.index, 1);
                }
        }
        return {time: time_left, playlist:playlist};
}

var optimise = function(time, songs, loops) {
    var best = {time:time, result:[]};
    var current;
    loops = loops || 100;
    for (var i = 0; i < loops; i++) {
       current = fill(time, songs);
       if (current.time < best.time) {
           best =  current;
       }
    }
    return best;
}
