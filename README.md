
![Image](https://nodei.co/npm/zuks.db.png?downloads=true&downloadRank=true&stars=true)

# **ZUKS.DB**
### What is Zuks.db?
Easy to Use Json and Yaml database
### News
```
- Yaml support

```
## How to install ? 
```npm
npm install zuks.db
``` 
### How to Use ?
```js
const {JsonDatabase , YamlDatabase} = require("zuks.db")
const db = new JsonDatabase("Database");
const ydb = new YamlDatabase("Yamldatabase"); 
```

# Methots
```js
const { JsonDatabase,YamlDatabase } = require("zuks.db");
const  db  = new JsonDatabase("Database");
db.set("zuks","1")
//setting database
db.fetch("zuks")
//Retrieves data
db.math("zuks","+","1")
//Mathematical operation
db.add("zuks","1")
//adds to data
db.subtract("zuks","1")
//extracts from data
db.remove("zuks")
//remove data
db.type("zuks")
//indicates the type of data
//exemple : "number","string","array"
db.all()
//pulls the database
db.size()
//database data count
db.startsWith("zuks")
//Retrieves data starting with zuks
db.includes("zuks")
//Retrieves the data named zuks in the data
db.endsWith("zuks")
//Retrieves data ending with data named Zuks
db.push("zuks","hi")
//Adds an array to the data
db.delete("zuks")
//deletes data
db.has("zuks")
//True if data exists, false otherwise
db.arrayHas("zuks")
//zuks = array = true
//zuks x array = false
db.fetchAll()
//all database
db.destroy()
//delete database files
db.get("zuks")
//Retrieves data
db.clear()
//clear database
db.exemple()
//exemple database files
```

# Multi Database
```js
const { JsonDatabase,YamlDatabase } = require("zuks.db");
const  db  = new JsonDatabase("Db");
const  data  = new YamlDatabase("data");
const  config  = new JsonDatabase("config");

db.set(`Zuks`,"db")
data.set(`Zuks`,"data")
config.set(`Zuks`,"config")
```

#### LİNKS
[Discord](https://discord.gg/Qac4vGc8sA)

