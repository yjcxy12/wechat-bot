require('isomorphic-fetch');
const { Wechaty } = require('wechaty');

const chatterbotServer = 'http://localhost:5000';
Wechaty.instance()
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
  .init();
