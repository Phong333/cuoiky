// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
// import { getDatabase } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { getDatabase, ref, set, push , onValue,onChildAdded, onChildChanged, onChildRemoved  } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAeDpauyCg3wcUAZQ3xQ8KKUrC_e9l9pdU",
    authDomain: "lbtcuoiky.firebaseapp.com",
    databaseURL: "https://lbtcuoiky-default-rtdb.firebaseio.com",
    projectId: "lbtcuoiky",
    storageBucket: "lbtcuoiky.appspot.com",
    messagingSenderId: "199904249141",
    appId: "1:199904249141:web:8793b47b33fb269e51b87c",
    measurementId: "G-LQF5LM997S"
  };

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const database = getDatabase(app); // Thêm dòng này

let nameUser; 
let Message;

function initNameUser() {
  let data = JSON.parse(localStorage.getItem('data'));
  if (data === null || data === undefined) {
      // Khởi tạo một đối tượng dữ liệu mới nếu không có trong LocalStorage
      data = {};
      data.name = prompt("Nhập tên của bạn");
      localStorage.setItem('data', JSON.stringify(data));
  }
  if(data.name == null) {
    data.name = prompt("Nhập tên của bạn");
    localStorage.setItem('data', JSON.stringify(data));
  }
};


// Send message len firebase
function sendMessage(e) {
  e.preventDefault();
    nameUser = JSON.parse(localStorage.getItem('data')).name;
    Message = document.querySelector("#message").value;
    console.log(Message);
    if(!nameUser || Message == "") {
      return;
    }
    const postListRef = ref(database, 'messages');
    const newPostRef = push(postListRef);
    set(newPostRef, {
        name:nameUser,
        message:Message
    });
    document.getElementById("sendMessage").reset();
    return false;
}

let countCmt = 0;
let discussdetail = document.querySelector(".discuss-detail")
let messages = ``; // Initialize an empty string to store messages
const messageRef = ref(database, 'messages');
  onChildAdded(messageRef, (data) => {
//   addCommentElement(postElement, data.key, data.val().text, data.val().author);
    let sender = data.val().name;
    let message = data.val().message;
    // Add new message to the accumulated messages string
    messages = `
      <div class="row">
        <div class="col d-flex">
          <span class="d-inline-block">${sender} :</span> <p class="flex-grow-1">${message}</p>
        </div>
      </div>
      <hr>
    `;
    discussdetail.insertAdjacentHTML("afterbegin",messages);
    countCmt++;
    let quantityCmt = document.querySelector(".quantitycmt");
    quantityCmt.textContent = countCmt;
});
// let countCmt = 0;
// onValue(messageRef, (snapshot) => {
//     snapshot.forEach((childSnapshot) => {
//       const childData = childSnapshot.val();
//       messages = `
//             <div class="row">
//               <div class="col">
//                 <span>${childData.name} :</span> <span>${childData.message}</span>
//               </div>
//             </div>
//             <hr>
//           `;
//           discussdetail.insertAdjacentHTML("afterbegin",messages);
//           countCmt++;
//     });
//     let quantityCmt = document.querySelector(".quantitycmt");
//     quantityCmt.textContent = countCmt;
//   }, {
//     onlyOnce: true
//   });

let btn = document.querySelector(".submitform");
btn.addEventListener("click", (e) => {
  initNameUser();
  sendMessage(e);
}
);


// 
async function postMessage(MessageContact) {
  const API_Post = "https://docs.google.com/forms/d/e/1FAIpQLSedaj5oLyu9YXRiaFIO1lRiXlHEwkSQzU-LPtAZZc-bm4Z6OA/formResponse";
  const formdata = new FormData();
  formdata.append("entry.136578000",MessageContact.name);
  formdata.append("entry.204168168",MessageContact.email);
  formdata.append("entry.1712607988",MessageContact.message);
  fetch(API_Post, {
    method: "POST",
    body: formdata,
    mode: "no-cors",
  });
}

// Contact Us

// document.addEventListener("DOMContentLoaded", (e) => {
//   //contact
//   let checkFormValid = true;
// let nameContact = document.querySelector(".nameContact");
// let emailContact = document.querySelector(".emailContact");
// let messageContact = document.querySelector(".messageContact");
// let submitContact = document.querySelector("#btn-Custom");

//   submitContact.addEventListener("click", () => {
//     if (nameContact.value == "") {
//       // Kiểm tra xem có phần tử .error_name không
//       let errorName = document.querySelector(".error_name");
//       if (!errorName) {
//         checkFormValid = false;
//         // Nếu không, chèn một phần tử mới
//         let parent = nameContact.parentNode;
//         parent.insertAdjacentHTML(
//           'beforeend',
//           `<p style="color: red;" class="my-2 error_name"> <i class="bi bi-exclamation-circle-fill"></i> Trường này là bắt buộc</p>`
//         );
//       }
//     } else {
//       // Xóa phần tử .error_name nếu nó tồn tại
//       let errorName = document.querySelector(".error_name");
//       if (errorName) {
//         errorName.remove();
//       }
//     }
  
//     // kiểm tra email rỗng
//     if (emailContact.value == "") {
//       // Kiểm tra xem có phần tử .error_name không
//       let errorMail = document.querySelector(".error_mail");
//       if (!errorMail) {
//         checkFormValid = false;
//         // Nếu không, chèn một phần tử mới
//         let parent = emailContact.parentNode;
//         parent.insertAdjacentHTML(
//           'beforeend',
//           `<p style="color: red;" class="my-2 error_mail"> <i class="bi bi-exclamation-circle-fill"></i> Trường này là bắt buộc</p>`
//         );
//       }
//     } else {
//       // Xóa phần tử .error_name nếu nó tồn tại
//       let errorMail = document.querySelector(".error_mail");
//       if (errorMail) {
//         errorMail.remove();
//       }
//     }
    
//     if(nameContact.value != "" && emailContact.value != "") {
//       checkFormValid = true;
//     }

//     // form đã có dữ liệu và post đc
//     if (checkFormValid === true) {
//       const objectMessage =
//       {
//         name : nameContact.value,
//         email: emailContact.value,
//         message: messageContact.value,
//       }

//       //post lên google sheet
//       postMessage(objectMessage);
//       document.querySelector(".messageContact").value = "";
//       nameContact.value ="";
//       emailContact.value = "";
//       document.querySelector("#contactForm").insertAdjacentHTML("beforeend",
//       `<div>
//         <p style="color:green;text-align:center;" class="sendSuscess">Gửi thành công</p>
//       </div>`
//     )

//     setTimeout(()=> {
//       let sucess = document.querySelector(".sendSuscess");
//       if(sucess) {
//         sucess.parentNode.remove();
//       }
//     },1000)
//     }
//   });
// })

