// client.js  
const { createSocket } = require('dgram');  
  
const client = createSocket('udp4');  


const items = [
"http://192.168.21.117:8089/output/202404162355/20-202404162355-0.jpg",
"http://192.168.21.117:8089/output/202404162355/20-202404162355-1.jpg",
"http://192.168.21.117:8089/output/202404162355/20-202404162355-2.jpg",
"http://192.168.21.117:8089/output/202404162355/20-202404162355-3.jpg",
"http://192.168.21.117:8089/output/202404162355/20-202404162355-4.jpg",
"http://192.168.21.117:8089/output/202404162355/20-202404162355-5.jpg",
"http://192.168.21.117:8089/output/202404162355/20-202404162355-6.jpg",
"http://192.168.21.117:8089/output/202404162355/20-202404162355-7.jpg"
];

  
function Random(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

function getJson() {  
  let speed = Random(260,330);
  let km = Random(1,10000);
  let pole = Random(1,10000);
  let daogao = Random(3000,6000);
  let lachu = Random(300,600);

  // 创建data对象  
  var data = {  
    speed: speed,  
    lng: 0,  
    lat: 0, 
    poleName: pole, 
    kmName: km, 
    daogaoValue: daogao, 
    lachuValue: lachu,
    daogaos: [],
    lachus: [],
    poles: [],
    photos: [],
  };  
  
  // 通过for循环追加数据  
  for (var i = 0; i < 1; i++) { 
    let pole = Random(1,10000);
    let daogao = Random(3000,6000);
    var obj = {  
      name: '杆号' + pole,  
      value: daogao 
    };  
    data.daogaos.push(obj);  
  }  

  // 通过for循环追加数据  
  for (var i = 0; i < 1; i++) {  
    let pole = Random(1,10000);
    let lachu = Random(300,600); 
    var obj = {  
      name: '杆号' + pole,  
      value: lachu 
    };  
    data.lachus.push(obj);  
  }  

  // 通过for循环追加数据  
  for (var i = 0; i < 2; i++) {  
    let pole = Random(1,10000);

    const item = items[Math.floor(Math.random()*items.length)];
    var obj = {  
      name: '杆号' + pole,  
      value: item+'?'+new Date().getTime() 
    };  
    data.poles.push(obj);  
  }  
  

  // 通过for循环追加数据  
  for (var i = 0; i < 10; i++) { 
    const item = items[Math.floor(Math.random()*items.length)];
    var obj = {  
      name: '通道' + i,  
      value: item +'?'+new Date().getTime()
    };  
    data.photos.push(obj);  
  }  
  
  // 把data对象转换为json格式字符串  
  var content = JSON.stringify(data);  
  return content;  
}  
  
// 发送UDP消息的函数  
function sendUdpMessage() {  
  const content =getJson();  
  console.log('Sending:', content);  
  const buffer = Buffer.from(content, 'utf8');  
  client.send(buffer, 8888, 'localhost', (error) => {  
    if (error) {  
      console.error('Error sending UDP message:', error);  
    } else {  
      console.log('UDP message sent successfully.');  
    }  
  });  
}  
  
// 绑定'error'事件  
client.on('error', (err) => {  
  console.log(`client error:\n${err.stack}`);  
  client.close();  
});  
  
// 当UDP消息发送时触发  
client.on('message', (msg, rinfo) => {  
  console.log(`client received: ${msg} from ${rinfo.address}:${rinfo.port}`);  
});  
  
// 开始定时发送UDP消息，每秒钟一次  
setInterval(sendUdpMessage, 1000);  
  
// 如果需要的话，可以设置一个监听端口来绑定socket  
// client.bind(somePort, () => {  
//   console.log('UDP client listening on port:', somePort);  
// });  
  
// 注意：如果没有bind调用，socket将在第一次send或sendv调用时自动绑定到一个随机未使用的端口