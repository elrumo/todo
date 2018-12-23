// Initialise Firebase
var config = {
  apiKey: "AIzaSyCld-s06eXUKJxzNIPJIH25Bo5kwNfl7wM",
  authDomain: "todo-ac585.firebaseapp.com",
  databasenote: "https://todo-ac585.firebaseio.com",
  projectId: "todo-ac585",
  storageBucket: "todo-ac585.appspot.com",
  messagingSenderId: "554449734252"
};
firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
var firestore = firebase.firestore();

// Disable deprecated features
firestore.settings({
  timestampsInSnapshots: true
});

var docRef = firestore.collection("notes");
var inputTextField = document.querySelector('#textField');
var submitText = document.querySelector('#submitText');
var insertCardAfter = document.getElementById('ogCard');

//Delete Data
function deleteData(noteToDelte) {
    firestore.collection("notes").doc(noteToDelte).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
}

//Delete all elements
function deleteAllItems(){
  var list = document.getElementsByClassName("new");
  for(var i = list.length - 1; 0 <= i; i--)
  if(list[i] && list[i].parentElement)
  list[i].parentElement.removeChild(list[i]);
}

//Retrieve and add data to view
function getRealTimeUpdates(){
  firestore.collection("notes").onSnapshot(function(onSnapshot) {
      deleteAllItems();
      onSnapshot.forEach(function(doc){
          // var cardId = firestore.collection("notes").doc().id;
          var cardData = doc.data().note;
          var cardId = doc.id;
          console.log(cardId);
          // Quotationa and "\" added ot var or else the function won't read the whole thing
          var cardIdToDelete = "\'" + cardId + "\'";
          var card = '<div class="card new"><button class="deleteButton" onclick=deleteData('+cardIdToDelete+')><i class="fas fa-times"></i></button><input id="'+cardId+'" class="textField" type="text" name="" value="' + cardData + '"> <label class="container"> <input type="checkbox"> <span class="checkmark"></span> </label> </div>';
          insertCardAfter.insertAdjacentHTML('beforebegin', card);})
    });
  };
getRealTimeUpdates();

//Add input to DB
submitText.addEventListener("click", function() {
  var noteToSave = inputTextField.value;
  if (inputTextField.value != "") {
    var timeStamp = new Date().getTime();
    var newDocRef = firestore.collection("notes").doc("\""+timeStamp+"\"");
    console.log(newDocRef);
    console.log("I am going to save " + noteToSave + " to Firestore");
    newDocRef.set({
      note: noteToSave
    }).then(function(newDocRef) {
      console.log("Site saved!");
      //Empty text field input
      document.getElementById('textField').value = "";

      getRealTimeUpdates();

    }).catch(function(error) {
      console.log("Got an error: ", error);
    });

  } else {
    console.log("CUNT");
  };
});

// TODO: add time stap to doc ID for chronolofial order
// TODO: Update cards instead of re-weritting all of them again
