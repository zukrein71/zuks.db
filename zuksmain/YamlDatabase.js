const {unlinkSync,readFileSync,writeFileSync,existsSync} = require('fs'); 
const yaml = require(`yaml`)
const load = (file) => yaml.parse(readFileSync(file, 'utf-8')); 
const write = (file, data) =>  writeFileSync(file, yaml.stringify(data, null, 4));

class YamlDatabase{
  constructor(datafile) {

    this.file = datafile || 'Zuksbase.yaml'
    if (!this.file.endsWith(".yaml")){   
      this.file = this.file + ".yaml"
    }

    if (!this.file.startsWith('./')){ 
      this.file = "./" + this.file
    }
    if (!existsSync(this.file)) {
        write(this.file, {})
    }

}


/**
 * @exemple db.set("zuks","test")
 * @param {*} data 
 * @param {*} value 
 * @returns 
 */
 set(data, value) {
  if (!data) throw ReferenceError("Enter a data");
  if (!value) throw ReferenceError("Enter a value");
  let files = load(this.file)
  files[data] = value;
  write(this.file, fileData);
  return files[data]
}


/**
 * @example db.fetch("zuks")
 * @param {*} data 
 * @returns 
 */
fetch(data) {
  if (!data) throw Error("Cannot find data")
  let fileData = load(this.file)
  if(!fileData[data]) fileData[data] = null
  return fileData[data]
}


/**
 * @example db.math("zuks","+","1")
 * @param {*} data 
 * @param {*} operator 
 * @param {*} value 
 * @returns 
 */
math(data,operator,value){
if(!data)throw Error("Enter a data")
if(!operator)throw Error("Enter a operator")
if(!value)throw Error("Enter a value")
value = Number(value);
if(operator.length > 1)throw Error (`Operator max 1`)
let fileData = load(this.file)
if(operator === "+"){
  fileData[data] = fileData[data] + value;
  write(this.file, fileData);
return true;
}else if(operator === "-"){
  fileData[data] = fileData[data] - value;
  write(this.file, fileData);
return true;
}else if(operator === "*"){
  fileData[data] = fileData[data] * value;
  write(this.file, fileData);
return true;
}else if(operator === "/"){
  fileData[data] = fileData[data] / value;
  write(this.file, fileData); 
return true;
}else {
  throw Error("Unknown Operator.Only (+, -, /, *) operators are valid")
}

}


/**
 * @example db.add(`zuks`,1)
 * @param {*} data 
 * @param {*} value 
 * @returns 
 */
add(data, value) {
  return this.math(data, "+", value)
}


/**
 * @example db.substract("zuks",1) 
 * @param {*} data 
 * @param {*} value 
 * @returns 
 */
subtract(data, value) {
  return this.math(data, "+", value)
}


/**
 * 
 * @param {*} data 
 * @returns 
 */
  remove(data) {
    if(!data) throw Error("Enter a data")
    let fileData = load(this.file)
    if(!fileData[data]) throw Error("Cannot find data")
    fileData[data] = undefined;
    write(this.file, fileData);
    return true;
  }

/**
 * 
 * @param {*} data 
 * @returns 
 */
  type(data) {
    if (!data) throw Error(`Enter a data.`)
    let fileData = load(this.file)
    if (!fileData[data]) return null

    if (Array.isArray(this.get(data))) return "array"
    if (typeof this.get(data) === "string") return "string"
    if (typeof this.get(data) === "number") return "number"
}

  /**
   * @example db.all()
   * @param  data 
   * @returns 
   */
   all(data = 'all') {
    switch (data) {
        case 'all':
            return Object.entries(load(this.file))
        case 'object':
            return load(this.file)
        case 'keys':
            return Object.keys(load(this.file))
        case 'values':
            return Object.values(load(this.file))
    }
}

/**
 * @example db.size()
 * @returns 
 */
size(){
return this.all().length
}


/**
 * @example db.startsWith(`zuks`);
 * @param {*} data 
 * @returns 
 */
startsWith(data){
if(!data) throw Error(`Enter a data`)
let fileData = load(this.file)
let array = [];
for(const data in fileData){
  const key = { ID: data, data: fileData[data] };
  array.push(key);
}
 return array.filter(ana => ana.ID.startsWith(data))
}


/**
 * @example db.includes(`zuks`);
 * @param {*} data 
 * @returns 
 */
 includes(data){
  if(!data) throw Error(`Enter a data`)
  let fileData = load(this.file)
  let array = [];
  for(const data in fileData){
    const key = { ID: data, data: fileData[data] };
    array.push(key);
  }
   return array.filter(ana => ana.ID.includes(data))
  }
    

/**
 * @example db.endsWith(`zuks`);
 * @param {*} data 
 * @returns 
 */
 endsWith(data){
  if(!data) throw Error(`Enter a data`)
  let fileData = load(this.file)
  let array = [];
  for(const data in fileData){
    const key = { ID: data, data: fileData[data] };
    array.push(key);
  }
   return array.filter(ana => ana.ID.endsWith(data))
  }


  /**
 * @example db.push(`zuks`,"zuk1")
 * @example db.push(`zuks`,"zuk2")
 * @example database json :  "zuks" : {`zuks`,`zuks`}
 * @param {*} array 
 * @param {*} value 
 * @returns 
 */
   push(data,value) {
    if (!this.get(data)) {
        return this.set(data, [value]);
    }

    if (Array.isArray(this.get(data))) {
        var yenivalue = this.get(data)
        yenivalue.push(data);
        return this.set(data, yenivalue);
    }

    return this.set(data, [value]);
}




  /**
   * @example db.delete(`zuks`)
   * @param  data 
   * @returns 
   */
delete(data) {
  let fileData = load(this.file);
  if (!fileData[data]) return null;
  delete fileData[data];
  write(this.file, fileData);
  return true;
  }


  /**
   * @example db.has(`zuks`)
   * @param  data 
   * @returns 
   */
  has(data) {
    if (!data) throw Error("Enter a data");
    let fileData = load(this.file)
    if (!fileData[data]) return false;
    if (fileData[data]) return true;
  }


/**
 * @example db.arrayHas("zuks")
 * @param {*} data 
 * @returns 
 */


 arrayHas(data){
  let dataFile = load(this.file)
  if(data) throw Error("Enter a data")
  if(!dataFile[data]) return null;
  if (Array.isArray(this.get(data))) return true
  return false
  }

  /**
   * @example db.fetchAll
   * @returns 
   */
  fetchAll() {
    return load(this.file);
  }


 /**
 * @example db.destroy()
 * @returns 
 */
destroy() {
  unlinkSync(this.file);
  return;
}


/**
 * @example db.get(`zuks`)
 * @param {*} data 
 * @returns 
 */
get(data) {
  return this.fetch(data)
}


/**
 * 
 * @returns 
 * @example db.clear()
 */
 clear() {
  write(this.file, {});
  return true;
}


/**
 * @example db.exemple()
 */
exemple() {
  write(this.file, {
"zuks.db":"npm"
  });
  return true;
}

}
module.exports = {
  YamlDatabase
};