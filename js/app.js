//(function) {
// Initialize Firebase
      var config = {
        apiKey: "AIzaSyCld-s06eXUKJxzNIPJIH25Bo5kwNfl7wM",
        authDomain: "todo-ac585.firebaseapp.com",
        databaseURL: "https://todo-ac585.firebaseio.com",
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

    var docRef = firestore.collection("notes").doc("new-city-id" );
    const inputTextField = document.querySelector('#textField');
    const submitText = document.querySelector('#submitText');
//Fetch card ID
    var i = "";
    var cardID = document.body.childNodes[1].childNodes[1].childNodes[1].id;
    console.log(cardID);


  //Add input to DB
    submitText.addEventListener("click", function() {
      const siteToSave = inputTextField.value;
      if (inputTextField.value != "") {
        console.log("I am going to save " + siteToSave + " to Firestore");
        docRef.set({
          url: siteToSave
        }).then(function(){
          console.log("Site saved!");

          //Create funciton to injcet HTML for card
          function htmlToElement(html) {
              var template = document.createElement('template');
              html = html.trim(); // Never return a text node of whitespace as the result
              template.innerHTML = html;
              return template.content.firstChild;
          }

          //Add 1 to the existing ID number
          var newCardID = cardID + i++;

// TODO: Read data from databse and add to output card
          var card = htmlToElement('<div class="card"> <input id="' + newCardID + '" class="textField" type="text" name="" value=""> <label class="container"> <input type="checkbox"> <span class="checkmark"></span> </label> </div>');
          console.log(newCardID);


          // Append <button> to <body>
          document.body.childNodes[1].prepend(card);

        }).catch(function (error){
          console.log("Got an error: ", error);
        });
      }
      else {
        console.log("CUNT");
      };
    });

  //Retrieve DB data
    getRealTimeUpdates = function() {
      docRef.onSnapshot(function (doc){
        if (doc && doc.exists) {
          const myData = doc.data();
          const outputHeader = document.querySelector("#textField");
          outputHeader.innerText = myData.url;
        }
      });
    };

    getRealTimeUpdates();
//})();
