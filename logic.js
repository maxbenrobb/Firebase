var config = {
    apiKey: "AIzaSyC3wD833-dd6Px-fAntHy8mG6vaaRdCeuA",
    authDomain: "clickbutton-b9ac8.firebaseapp.com",
    databaseURL: "https://clickbutton-b9ac8.firebaseio.com",
    projectId: "clickbutton-b9ac8",
    storageBucket: "clickbutton-b9ac8.appspot.com",
    messagingSenderId: "258735992461"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainStart = moment($("#start-input").val().trim(), "DD/MM/YY").format("X");
  var trainFrequency = $("#frequency-input").val().trim();

  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: trainStart,
    frequency: trainFrequency
  };


  database.ref().push(newTrain);


  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().frequency;

  console.log(trainName);
  console.log(trainDestination);
  console.log(trainStart);
  console.log(trainFrequency);

  var trainStartPretty = moment.unix(trainStart).format("HH:mm");

  var trainStartConverted = moment(trainStart, "HH:mm").subtract(1, "years");
  console.log(trainStartConverted);

  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  var diffTime = moment().diff(moment(trainStartConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  var trainRemainder = diffTime % trainFrequency;
  console.log(tRemainder);

  var tMinutesTillTrain = trainFrequency - trainRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFrequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});
