(function () {
  // Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRwqank5Ej-jdj7CH1yWQ2qVUDDgWztLI",
  authDomain: "fireauth-c106b.firebaseapp.com",
  projectId: "fireauth-c106b",
  storageBucket: "fireauth-c106b.appspot.com",
  messagingSenderId: "654448267051",
  appId: "1:654448267051:web:ce80dde0426f3bbf35ff6e"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // handle on firebase db
  const db = firebase.database();

  // get elements
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const login = document.getElementById('login');
  const signup = document.getElementById('signup');
  const logout = document.getElementById('logout');
  const message = document.getElementById('message');
  const write = document.getElementById('write');
  const read = document.getElementById('read');
  const status = document.getElementById('status');
  const userNameDisplay = document.getElementById('name-display'); // element that can show the current user's email
  const chat = document.getElementById('chat-box');
  let currentUserEmail = ''; // variable to store the current user's email

  // write
  write.addEventListener('click', (e) => {
    const messages = db.ref('messages');

    // simple id - ok for example, do not use in production
    const id = new Date().getTime();

    // TODO: Add the value of currentUserEmail when writing to the database under the field name of "sender"
    messages
      .child(id)
      .set({ message: message.value, sender: currentUserEmail })
      .then(function () {
        console.log('Wrote to DB!');
      });
  });

  // read
  read.addEventListener('click', (e) => {
    handleRead();
  });

  // TODO: use this provided messagesRef to listen for updates and update the chat div on any update, not just when the 'Update Chat' button is clicked
  const messagesRef = db.ref('messages');
  function listenForNewMessages() {
    messagesRef.on("child_added", (snap) => {
    const data = snap.val();
    console.log(data)
      if (data) {
          console.log(data);
          chat.innerHTML +=
            (data.sender || '') +
            '   :   ' +
            data.message +
            '<br/>';
      }
  })
  }


  function handleRead() {
    status.innerHTML = '';
    chat.innerHTML = '';
    const messages = db.ref('messages');

    messages.once('value').then(function (dataSnapshot) {
      var data = dataSnapshot.val();
      if (data) {
        var keys = Object.keys(data);

        keys.forEach(function (key) {
          console.log(data[key]);
          chat.innerHTML +=
            (data[key]['sender'] || '') +
            '   :   ' +
            data[key].message +
            '<br><br>';
        });
      }
    });
  }

  // TODO: in this function you should set the userNameDisplay.innerHTML to the passed in userEmail as well as updating the currentUserEmail variable to that same value
  function updateCurrentUser(userEmail) {
    userNameDisplay.innerHTML = userEmail
    currentUserEmail = userEmail
    if (userEmail) {
      listenForNewMessages()
    }
  }

  // login
  login.addEventListener('click', (e) => {
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(
      email.value,
      password.value
    );
    promise.then((resp) => {
      console.log('User Login Response: ', resp);
      logout.style.display = 'inline';
      login.style.display = 'none';
      signup.style.display = 'none';
      write.style.display = 'inline';
      updateCurrentUser(resp.user.email);
    });
    promise.catch((e) => console.log(e.message));
  });

  // signup
  signup.addEventListener('click', (e) => {
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(
      email.value,
      password.value
    );
    promise.then((resp) => {
      console.log('User Signup + Login Response: ', resp);
      logout.style.display = 'inline';
      login.style.display = 'none';
      signup.style.display = 'none';
      write.style.display = 'inline';
      updateCurrentUser(resp.user.email);
    });
    promise.catch((e) => console.log(e.message));
  });

  // logout
  logout.addEventListener('click', (e) => {
    firebase
      .auth()
      .signOut()
      .then((resp) => {
        console.log('Logout Response: ', resp);
        logout.style.display = 'none';
        login.style.display = 'inline';
        signup.style.display = 'inline';
        write.style.display = 'none';
        updateCurrentUser('');
      })
      .catch((e) => console.warn(e.message));
  });
})();
