
![Image](https://nodei.co/npm/zuks.db.png?downloads=true&downloadRank=true&stars=true)

# **ZUKS.DB**
### Zuks.db nedirmi?
Kullanımı Kolay Türkçe Json database
### Yenilikler
```
- Back sistemi
- Yeni Fonksiyonlar

```
## Nasılmı Yüklenir
```npm
npm install  zuks.db
``` 
### Nasılmı Kullanılır ?
```js
const {Database} = require("zuks.db")
const db = new Database("Database") 
```

# Fonksiyonlar
```js
const { Database } = require("zuks.db");
const  db  = new Database("Database");

//Veri yi kayt etmek | veriyi çektirmek
db.set(`zuks`"1")//zuks 1 verisini kayt eder

db.fetch(`zuks1`)//zuks 1 verisini çektirir

db.get(`zuks2`)//zuks2 verisinin değerini belirtir

db.has(`zuks`)//zuks verisi varsa true yoksa false olarak verir

//Veriyi silme 

db.delete(`zuks`)//zuks adlı veriyi siler

db.deleteEach(`zuks`)//zuks olan tüm verileri siler

db.deleteKey(`zuks`)//zuks anahtarı ile başlayan verileri siler

db.clear()//Database dosyasındaki tüm verileri siler

//Veride Matematik işlemleri
db.add(`zuks`,1)//zuks verisene 1 ekler

db.subtract(`zuks`1)//zuks verisinden 1 çıkartır

db.math(`zuks`,`*`,1)//zuks verisine çarpma işlemi yapar

//Ve diğer işlemler
db.remove()  

db.push()//veriye array ekler

db.fetchAll()//datadaki tüm verileri çeker

db.all()//datadaki tüm verilerin sayısını çeker 

db.destroy()//Database i siler
```
# Yedek sistemi
- Kullanımı bu şekilde
```js
const { Database } = require("zuks.db");
const  db  = new Database("Database");

db.setBackup('backup.json')//Backup yani yedek edilecek dosya
```
- Aldığınız yedeği burdan  aktifleştirebilirsiniz
```js
const { Database } = require("zuks.db");
const  db  = new Database("Database");

db.loadBackup();//setlemiş olduğunuz backup dosyasını bulur ve geri yükler
```
# Çoklu database kullanabilirsiniz
```js
const { Database } = require("zuks.db");
const  db  = new Database("Db");
const  data  = new Database("data");
const  config  = new Database("config");

db.set(`Zuks`,"db")
data.set(`Zuks`,"data")
config.set(`Zuks`,"config")
```

#### Gelişmekte olan database modulu
Gün geçtikçe gelişmekte !

[Discord](https://discord.gg/gfEQXM8Zw5)

