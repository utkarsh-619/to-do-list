module.exports.getDate = function (){
    const today = new Date();
    var options = {
      weekday: "long",
      day: "numeric",
      month: "long",
    };

    const day = today.toLocaleDateString("en-US", options);
    return day;
}


module.exports.day = function() {
    const today = new Date();
    var options = {
      weekday: "long",
    };

    const day = today.toLocaleDateString("en-US", options);
    return day;
}