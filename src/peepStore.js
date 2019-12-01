

document.getElementById('fetchPeepsBtn').addEventListener('click', fetchPeeps);


var postButton = document.getElementById("postbutt");
postButton.style.width = '150px'
var text = document.createTextNode("Post a peep");
postButton.appendChild(text);

var form = document.getElementById("entry");
form.setAttribute("placeholder", "Enter peep here");
form.style.fontSize = '15px';

document.getElementById('postbutt').addEventListener('click', function(){
var peepText = form.value
getSession();
});


function getSession(){
  fetch("https://chitter-backend-api.herokuapp.com/sessions", {
  body: "{\"session\": {\"handle\":\"RogerMellie\",\"password\":\"\"}}",
  headers: {
    "Content-Type": "application/json"
  },
  method: "POST"
})
 .then(response => response.json())
 .then(json => setSession(json))
}

function setSession(json) {
    user_id = json.user_id;
    session_key = json.session_key;
    fetch("https://chitter-backend-api.herokuapp.com/peeps", {
  body: "{\"peep\": {\"user_id\":1545, \"body\":\"Roger says...\"}}",
  headers: {
    Authorization: "Token token="+session_key,
    "Content-Type": "application/json"
  },
  method: "POST"
})

}


function fetchPeeps(){
  fetch('https://chitter-backend-api.herokuapp.com/peeps')
  .then(response => response.json())
  .then(json => renderText(json))
}

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

function renderText(outputObject) {
  let output = document.getElementById("response")
  return outputObject.map(function(peep){
    let div = createNode('div');
    let li = createNode('li');
    let para = createNode('p');
    para.innerHTML = `${peep.user.handle}\n<br>${peep.body}\n<br>Date: ${peep.created_at}`;
    append(div, para);
    append(li, div);
    append(output, li);
  })
};



// fetch('https://chitter-backend-api.herokuapp.com/peeps')
//   .then(function(response){
//     console.log("Success!", response);
//   }, function(error) {
//     console.error("Failed!", error);
//   });