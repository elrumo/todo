//(function) {
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

//Set IDs to constants
// const docRef = firestore.doc("samples/websites");
// TODO: Read name of .doc on firebase DB

// TODO: Read and fetch all doc IDs

// var docRef = firestore.collection("notes").doc();
var docRef = firestore.collection("notes");
var inputTextField = document.querySelector('#textField');
var submitText = document.querySelector('#submitText');
var insertCardAfter = document.getElementById('ogCard');


//Add data
function getRealTimeUpdates(){
  firestore.collection("notes").onSnapshot(function(onSnapshot) {
        onSnapshot.forEach(function(doc){
          var cardData = doc.data().note;
          var card = '<div class="card new"> <input id="" class="textField" type="text" name="" value="' + cardData + '"> <label class="container"> <input type="checkbox"> <span class="checkmark"></span> </label> </div>';
          insertCardAfter.insertAdjacentHTML('beforebegin', card);})
    });
  };

//add time stap to doc ID for chronolofial order
  getRealTimeUpdates();

//Add input to DB
submitText.addEventListener("click", function() {
  var noteToSave = inputTextField.value;
  if (inputTextField.value != "") {
    console.log("I am going to save " + noteToSave + " to Firestore");
    docRef.add({
      note: noteToSave
    }).then(function(docRef) {
      console.log("Site saved!");
      document.getElementById('textField').value = "";

      //Delete Old elements
      var list = document.getElementsByClassName("new");
      for(var i = list.length - 1; 0 <= i; i--)
      if(list[i] && list[i].parentElement)
      list[i].parentElement.removeChild(list[i]);

      getRealTimeUpdates();
      // // Retrieve ID of saved note
      // var docRefId = docRef.id;
      // // Retreive content of specific note ID
      // docRef.get().then(function(docRefId) {
      //   var docData = docRefId.data().note;
      //   var card = '<div class="card"> <input id="" class="textField" type="text" name="" value="' + docData + '"> <label class="container"> <input type="checkbox"> <span class="checkmark"></span> </label> </div>'
      //   insertCardAfter.insertAdjacentHTML('beforebegin', card);
      // })
    }).catch(function(error) {
      console.log("Got an error: ", error);
    });

  } else {
    console.log("CUNT");
  };
});

//// Retrieve DB data
// function getRealTimeUpdates() {
//   docRef.onSnapshot(function(doc) {
//     if (doc && doc.exists) {
//       var cardData = doc.data().note;
//       var card = '<div class="card"> <input id="" class="textField" type="text" name="" value="' + cardData + '"> <label class="container"> <input type="checkbox"> <span class="checkmark"></span> </label> </div>';
//       insertCardAfter.insertAdjacentHTML('beforebegin', card);
//     }
//   });
// };
//
// getRealTimeUpdates();

// TODO: Update cards instead of re-weritting all of them again
