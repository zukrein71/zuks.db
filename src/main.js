const {EventEmitter} = require("events")
const fs = require("fs")
const path = require("path")

async function _open(datapath) {
  if (!fs.existsSync(path.dirname(datapath))) {
    fs.mkdirSync(datapath);
    fs.writeFileSync(datapath, '{}');
  } else if (!fs.existsSync(datapath)) {
    fs.writeFileSync(datapath, '{}');
  }
  
  return fs.readFileSync(datapath).toString();
}
async function _write(data,datapath) {
 fs.writeFileSync(datapath,data)

}
class Database extends EventEmitter {
constructor(datapath) {
super()
if(!datapath) this.datapath = "./zuks-base.json"
if(datapath) this.datapath = datapath

}
//SET KISIMI YAPACAK YER
 async set(key,value) {
if(!key) throw new ReferenceError("Key desteklenmiyor.")
if(!value) throw new ReferenceError("Değer Bir Sayı Olmalıdır.")
try {
let read = await _open(this.datapath)
let json = JSON.parse(read)
json[key] = value
await _write(JSON.stringify(json),this.datapath)
let datajson = {
  key: key,
  currentvalue: json[key],
  operation: "set"
}
this.emit("dataSaved", datajson)
} catch(e) {
  console.log(e)
}
}
//FETCH YAPACAK BUDA
async fetch(key) {
  let content = await _open(this.datapath)
  try {
    let json = JSON.parse(content)
    return json[key]
  } catch (e) {
    console.log(e)
  }
}
//PUSH YAPIOR İŞTE BEN KULLANMIOM AMA
async push(key,value) {
if (!key) throw new ReferenceError("Key desteklenmiyor.")
if (!value) throw new ReferenceError("Değer Bir Sayı Olmalıdır.")


 let read = await _open(this.datapath)
 let json = JSON.parse(read)
 try {
   
   let data = awaitthis.fetch(key)
   if (Array.isArray(data)) {
     data.push(value)
     this.set(key, data)
     
   } else {
     this.set(key, [value])
   }
   let datajson = {
     key: key,
     currentvalue: json[key],
     operation: "push"
   }
   this.emit("dataSaved", datajson)
  } catch (e) {
  console.log(e)
}
}
//ADD İŞLEMİNİN GERÇEKLESTİĞİ VER
async add(key, value) {
  if (!key) throw new ReferenceError("Key desteklenmiyor.")
  if (!value) throw new ReferenceError("Value Must Be Supplied.")
  if(isNaN(value)) throw new ReferenceError("Değer Bir Sayı Olmalıdır.")
  try {
    let read = await _open(this.datapath)
    let json = JSON.parse(read)
    if(json[key]) {
    json[key] = value + json[key]
    } else {
    json[key] = value
    }
  await  _write(JSON.stringify(json),this.datapath)
  let datajson = {
    key: key,
    currentvalue: json[key],
    operation: "add"
  }
  this.emit("dataSaved", datajson)
  } catch (e) {
    console.log(e)
  }
  
}
//Substrack belirlenen veriden çıkartma yapar
async subtract(key, value) {
  if (!key) throw new ReferenceError("Key girmediğinden hata alıyorum. Eğer hala çözemiyorsan https://discord.gg/gfEQXM8Zw5")
  if (!value) throw new ReferenceError("Value desteklenmiyor")
  if (isNaN(value)) throw new ReferenceError("Değer Bir Sayı Olmalıdır.")
  try {
    let read = await _open(this.datapath)
    let json = JSON.parse(read)
    
    if(!json[key]) throw new ReferenceError("Böyle Veri Yok, Bu yüzden Çıkaramıyorum. Eğer hala çözemiyorsan https://discord.gg/gfEQXM8Zw5")
    json[key] = await this.fetch(key) - value
    await _write(JSON.stringify(json),this.datapath)
    let datajson = {
    key:key,
    currentvalue:json[key],
  operation:"subtract"
    }
    this.emit("dataSaved",datajson)
  } catch (e) {
    console.log(e)
  }

}
}
//bunu silersen modul çalışmaz
module.exports = Database
//Herhangi bir hatada https://discord.gg/gfEQXM8Zw5 gel