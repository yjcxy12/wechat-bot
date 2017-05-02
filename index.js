require('isomorphic-fetch');
const { Wechaty } = require('wechaty');
const spawn = require('child_process').spawn;

const chatterbotServer = 'http://localhost:5000';
const sayIntro = () => {
    contact.say('生日快乐！');

    contact.say('我是猪小二嫰儿，由猪小大嫩儿开发给池小蔫当礼物！赶紧试试调戏我吧。');
};

Wechaty.instance({ profile:'ernenr' })
  .on('scan', (url, code) =>
    console.log(`Scan QR Code to login: ${code}\n${url}`)
  )
  .on('login', user => console.log(`User ${user} logined`))
  .on('message', async function(message) {
    const sender = message.from().name();
    const receiver = message.to().name();
    const content = message.content();
    console.log(sender, receiver, message.content());

    if (sender === '猪小嫩儿' || sender === '池小蔫儿') {
      const url = `${chatterbotServer}/get/${encodeURIComponent(message.content())}`;
      console.log(url);
      const blob = await fetch(url);
      const retText = await blob.text();
      await message.say(retText);
    }
  })
  .on('friend', (contact, request) => {
    if (request) return;
    sayIntro();
  })
  .on('error', () => {
    process.exit(1);
    spawn('node index.js');
  })
  .init();
