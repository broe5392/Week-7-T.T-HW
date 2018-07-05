var config = {
    apiKey: "AIzaSyAwdtTMKrNMxNnlJlYWuDj0mGx_z8280hY",
    authDomain: "train-time-wk7-hw.firebaseapp.com",
    databaseURL: "https://train-time-wk7-hw.firebaseio.com",
    projectId: "train-time-wk7-hw",
    storageBucket: "train-time-wk7-hw.appspot.com",
    messagingSenderId: "704645893476"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var firstTT = "";
  var frequency = "";

  $("#submit").on("click", function(event){
      event.preventDefault();

      trainName = $("#train-input").val().trim();
      destination = $("#destination-input").val().trim();
      firstTT = $("#train-time").val().trim();
      frequency = $("#frequency-input").val().trim();

      database.ref().push({
          trainName: trainName,
          destination: destination,
          firstTT: firstTT,
          frequency: frequency
      });
  });

  database.ref().on("child_added", function(snapshot){
      trainName = snapshot.val().trainName;
      destination = snapshot.val().destination;
      firstTT = snapshot.val().firstTT;
      frequency = snapshot.val().frequency;

      var nextArrival = moment(firstTT).diff(moment(), "minutes");
    
      var trainTable = $("#Schedule");
      var newRow = $("<tr>");

      newRow.append("<td>" + trainName + "</td>" + "<td>" + destination + "</td>" + "<td>" + frequency + "</td>" +"<td>" + moment(nextArrival).format("HH:mm a") + "</td>");
      trainTable.append(newRow);

  }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
  });

  
