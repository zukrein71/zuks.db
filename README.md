# **ZUKS.DB**
### Zuks.db nedirmi?
Kullanımı Kolay Türkçe Json database 
### Nasılmı Kullanılır ?
```js
const {Database} = require("zuks.db")
const db = new Database("Database") 
```
#### Fonksiyonlar 
```js
const {Database} = require("zuks.db")
const db = new Database("Database")
db.set("key","value") 
db.fetch("key") //key isimli veriyi çeker
db.add("key",10) //key isimli veriye 10 ekler
db.push("key","value") 
db.subtract("key",10) //key isimli veriden 10 çıkartır
```
#### Gelişmekte olan database modulu
Gün geçtikçe gelişmekte !
