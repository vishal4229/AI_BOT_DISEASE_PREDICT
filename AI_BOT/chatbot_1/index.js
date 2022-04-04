let server_check = false;
let server_check_enable = true;
let question_check = false;
let case_value = 0;
let next_question = true
let allow_input = true
var question_no = 0
var result2 = []
let username = ""
let live_chat1 = false
let r = ""
let is_doc = false
let avail_doctor=[]
const chatSocket = new WebSocket(
  'ws://'
  + "127.0.0.1:8000"
  + '/ws/chat/'
  + 'roomName'
  + '/'
);

function get_available_doctor() {
  $.ajax({
    type: "GET",
    contentType: "application/json;charset=utf-8",
    url: 'http://127.0.0.1:8000/app/available_doctor',
    traditional: "true",
    // data: email1,
    success: function (result) {
      avail_doctor = result['doctor']
      display_avail_doctor(avail_doctor)
      //   const chatSocket = new WebSocket(
      //     'ws://'
      //     + "127.0.0.1:8000"
      //     + '/ws/chat/'
      //     + String(result['doctor'])
      //     + '/'
      //   );
      // },
    },
    error: function () {
      alert("Error in Connecting Server")
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      let input = inputField.value;
      inputField.value = "";
      if (server_check == true && allow_input == true && live_chat1 == false) {
        if (next_question == false) {
          input = input.trim()
          if (isNumeric(input) != true) {
            botChat(input, "Please enter valid numbers")
            return
          }
          else {
            result2.push(input)
          }
        }
        next_question = true
        addChat(input, input)
        output(input);
        if (typeof case_value == "string") {
          ;
        }
        else {
          case_value += 1;
        }
      }
      if (server_check == true && allow_input == true && live_chat1 == true) {
        case_value = 'live_chat'
        console.log(input)
        output(input);
      }
    }
  });
});
var a = []
async function output(input) {
  let product;
  let pr;
  if (document.getElementById("input").placeholder == 'Enter Your Name..') {
    username = input
  }
  $('#input').attr('placeholder', 'Say Something...');
  let text = input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
  switch (case_value) {
    case 0:
      if (is_doc != true) {
        product = "Hello".concat(" ", input)
        await wait(1000);
        botChat(input, 'Hey ' + input + ',Would You like to take a quick Test')
        await wait(1000)
        botChat_object(input, "<div><button id='yes_bt' class='btn btn-outline-success' onclick='yes_click()'>Yes</button><button id='no_bt' class='btn btn-outline-danger' onclick='no_click()'>No</button></div>")
        allow_input = false
      }
      else if (is_doc == true) {
        product = "Hello".concat(" ", input)
        await wait(1000);
        botChat(input, 'Hello Doctor ' + input + ', Please be active soon will connect to the patient.')
        await wait(1000)
        save_room(String(username) + '_Room')
        const chatSocket = new WebSocket(
          'ws://'
          + "127.0.0.1:8000"
          + '/ws/chat/'
          + String(username) + '_Room'
          + '/'
        );
        live_chat1=true
      }
      break;
    case "no":
      botChat(input, input)
      break;
    case "yes":
      if (question_no == a.length) {
        server_check_enable = false;
        console.log(result2)
        predict_result(result2).then(function (result) {
          // Run this when your request was successful
          pr = "<h5 style='color:blue'>" + result['result'][0] + "</h5>"
          botChat_object(input, pr)
        }).catch(function (err) {
          // console.log(JSON.stringify(err.responseText))
          // Run this when promise was rejected via reject()
          pr = "<h5 style='color:red'>" + JSON.parse(err.responseText) + "</h5"
          botChat_object(input, pr)
        })
        await wait(1000);
        botChat(input, "Thank You,Have A Nice Day!")

      }
      else if (next_question == true) {
        await wait(3000);
        botChat(input, a[question_no])
        question_no += 1;
        next_question = false
      }
      break;
    case "live_chat":
      addChat(input, input)
      r = (Math.random() + 1).toString(36).substring(7);
      chatSocket.send(JSON.stringify({
        'message': input + '--' + String(username) + String(r)
      }));
    default:
      break;
  }
}

function addChat(input, product) {
  const messagesContainer = document.getElementById("messages");

  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<img src="user.png" class="avatar"><span style='color:#FF6F61'>${input}</span>`;
  messagesContainer.appendChild(userDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;

  // setTimeout(() => {
  //   // botText.innerText = `${product}`;
  //   // textToSpeech(product)
  // }, 2000
  // )

}

function botChat(input, product) {
  const messagesContainer = document.getElementById("messages");
  let botDiv = document.createElement("div");
  let botImg = document.createElement("img");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botImg.src = "bot1.png";
  botImg.className = "avatar";
  botDiv.className = "bot response";
  botText.innerHTML = "<h4 style='color:red'>Typing...</h4>";
  botDiv.appendChild(botText);
  botDiv.appendChild(botImg);
  messagesContainer.appendChild(botDiv);
  // Keep messages at most recent
  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;

  setTimeout(() => {
    botText.innerHTML = `<h5 style='color:green'>${product}</h5>`;
    textToSpeech(product)
  }, 2000
  )
}
function botChat_object(input, product) {
  const messagesContainer = document.getElementById("messages");
  let botDiv = document.createElement("div");
  let botImg = document.createElement("img");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  // botImg.src = "bot1.png";
  botImg.className = "avatar";
  botDiv.className = "bot response";
  if (product.includes("Refreshing")) {
    botText.innerHTML = product;
  }
  // else{
  // botText.innerHTML = "<h4>Typing...</h4>";
  // }
  botDiv.appendChild(botText);
  botDiv.appendChild(botImg);
  messagesContainer.appendChild(botDiv);
  // Keep messages at most recent
  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;

  setTimeout(() => {
    botText.innerHTML = `${product}`;
    textToSpeech(botText.innerText)
  }, 2000
  )

}
async function server() {
  get_question()
  if (server_check == true) {
    server_check_enable = false;
    return
  }
  if (server_check == false) {
    botChat_object(input, "<h4>Refreshing chat......</h4>")
    await wait(2000)
    document.getElementById("messages").innerHTML = ""
  }
  server_check_enable = true
  setInterval(async function () {
    if (server_check_enable == true) {
      $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: 'http://127.0.0.1:8000/app/disease_predict',
        traditional: "true",
        // data: email1,
        success: function (result) {
          server_check = true
          $("#bt1").removeClass('btn btn-info').addClass('btn btn-success');
          document.getElementById("bt1").innerHTML = "Connected"
          $("#bt1").removeClass('btn btn-danger').addClass('btn btn-success');
        },
        error: function () {
          server_check = false
          $("#bt1").removeClass('btn btn-info').addClass('btn btn-danger');
          document.getElementById("bt1").innerHTML = "Not Connected"
        }
      });
    }
    else {
      await wait(2000);
      $("#bt1").removeClass('btn btn-info').addClass('btn btn-danger');
      document.getElementById("bt1").innerHTML = "Not Connected"
      $('#input').attr('placeholder', 'Enter Your Name..');
      server_check = false;
      question_check = false;
      case_value = 0;
      next_question = true
      question_no = 0
      result2 = []
    }
  }, 1 * 5000); // 60 * 1000 milsec
}

function wait(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

async function yes_click() {
  if (server_check == true) {
    case_value = "yes";
    await wait(1000)
    botChat(input, "Please Answer Few Questions..")
    output("yes")
    allow_input = true
    document.getElementById("yes_bt").onclick = null;
  }
}

function no_click() {
  if (server_check == true) {
    case_value = "no";
    output("Thank You,Have A Nice Day!")
    // server_check_enable = false
    allow_input = true
    document.getElementById("no_bt").onclick = null;
    live_chat("<h5>Connecting To Available Doctor......</h5>")
    get_available_doctor()
  }
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function get_question() {
  $.ajax({
    type: "GET",
    contentType: "application/json;charset=utf-8",
    url: 'http://127.0.0.1:8000/app/predict_questions',
    traditional: "true",
    // data: email1,
    success: function (result) {
      a = result['questions']
    },
    error: function () {
      alert("Error in Connecting Server")
    }
  });
}

function predict_result(result1) {
  var data_dict = {};
  data_dict['input'] = result1
  console.log(data_dict)
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: "POST",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      url: 'http://127.0.0.1:8000/app/disease_predict',
      traditional: "true",
      data: JSON.stringify(data_dict),
      success: function (result) {
        resolve(result)
      },
      error: function (err) {
        reject(err)
      }
    });
  });
}

chatSocket.onmessage = function (e) {
  // JSON.parse() converts the JSON object back into the original object,
  // then examine and act upon its contents.
  var repl = ''
  const data = JSON.parse(e.data);
  re_txt = '--' + String(username) + String(r)
  if (live_chat1 == true) {
    if (data.message.includes(re_txt)) {
      ;
    }
    else {
      // console.log(data.message,data.message.replace(re_txt,''))
      repl = data.message.split("--")
      console.log(re_txt, repl[0])
      botChat(input, repl[0])
    }
  }
}
async function live_chat(html_input) {
  live_chat1 = true
  botChat_object(input, html_input)
  await wait(4000)
  document.getElementById("messages").innerHTML = ""
  // while(server_check==true){
  //   chatSocket.onmessage = function(e) {
  //     // JSON.parse() converts the JSON object back into the original object,
  //     // then examine and act upon its contents.
  //     const data = JSON.parse(e.data);
  //     botChat(input,data.message)
  //   };
}

function check1() {
  console.log(is_doc)
  if (is_doc != true) {
    is_doc = true
  }
  else {
    document.getElementById("chk1").checked = false;
    document.getElementById("chk1").onclick = "return false";
  }
}

function save_room(room1) {
  var data_dict = {}
  data_dict['room'] = room1
  $.ajax({
    type: "POST",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    url: 'http://127.0.0.1:8000/app/available_doctor',
    traditional: "true",
    data: JSON.stringify(data_dict),
    success: function (result) {
      console.log(result)
    },
    error: function (err) {
      alert("error in saving object")
    }
  });
}

async function display_avail_doctor(avail_doctor) {
  var st = "<div>"
  await wait(2000)
  botChat(input, "Recommended Doctors Online at the Moment")
  await wait(3000)
  console.log(avail_doctor.length)
  // <button type="button" class="btn btn-outline-info">Info</button>
  for(var i=0;i<avail_doctor.length;i++){
    st+="<button id='"+i+"_bt' class='btn btn-outline-success' onclick='d"+i+"_click()'>"+avail_doctor[i].split("_")[0]+"</button>"
    console.log(st)
  }
  st+="</div>"
  console.log(st)
  botChat_object(input, st)
}

async function d0_click(){
  live_chat1=true
  live_chat("<h5>Connecting..</h5>")
  await wait(4000)
  botChat(input,"Connected to Doctor "+avail_doctor[0].split('_')[0]+"")

}
