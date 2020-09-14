import firebase from "firebase";
import { SnapshotViewIOS } from "react-native";
class Fire {
  constructor() {
    this.init();
    this.checkAuth();
  }
  init = () => {
    if (!firebase.apps.length) {
      var firebaseConfig = {
        apiKey: "AIzaSyCxk49BdCBohp0ywcHdepnHe1N6lsLct38",
        authDomain: "chat-app-5e1fa.firebaseapp.com",
        databaseURL: "https://chat-app-5e1fa.firebaseio.com",
        projectId: "chat-app-5e1fa",
        storageBucket: "chat-app-5e1fa.appspot.com",
        messagingSenderId: "817900157283",
        appId: "1:817900157283:web:b50dbd2f1c6427ebe83b56",
        measurementId: "G-PVSY42V865"
      };
      firebase.initializeApp(firebaseConfig);
    }
  };
  checkAuth = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
    });
  };
  send = messages => {
    messages.forEach(item => {
      const message = {
        text: item.text,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user,
      };
      this.db.push(message);
    });
  };
  parse = message => {
    const { user, text, timestamp } = message.val();
    const { key: _id } = message;
    const createdAt = new Date(timestamp);
    return {
      _id,
      createdAt,
      text,
      user,
    };
  };
  get=callback=>{
      this.db.on('child_added',snapshot=> callback(this.parse(snapshot)))
  }
  off(){
      this.db.off()
  }
  get db() {
    return firebase.database().ref("messages");
  }
  get uid(){
      return (firebase.auth().currentUser || {}).uid
  }
}
export default new Fire()
