import "phoenix_html";
import socket from "./socket";

const channel = socket.channel('room:lobby', {});

channel.on('shout', payload => {
  console.log(payload);
  const li = document.createElement('li');
  const name = payload.name || 'guest';
  li.innerHTML = `<b>${name}</b>: ${payload.message}`;
  ul.appendChild(li);
})

channel.join();

const ul = document.getElementById('msg-list');
const name = document.getElementById('name');
const msg = document.getElementById('msg');

msg.addEventListener('keypress', event => {
  if (event.keyCode == 13 && msg.value.length > 0) {
    channel.push('shout', {
      name: name.value,
      message: msg.value
    })
    msg.value = '';
  }
});