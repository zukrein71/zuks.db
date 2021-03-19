const fs = require('fs'); 
const load = (file) => JSON.parse(fs.readFileSync(file, 'utf-8')); 
const write = (file, data) =>  fs.writeFileSync(file, JSON.stringify(data, null, 4));
const extension = (filePath) => { let parts = filePath.split('.'); return parts[parts.length - 1]; }
let backup;//yedek sisteminin dosyaları 
const Backupadd = (data) => { if(backup !== undefined) { fs.writeFileSync(backup, JSON.stringify(data, null, 4)); } }
class Database {
  constructor(file) {
    this.file = file || 'Zuksbase.json'
    if(this.file === 'Zuksbase.json') {
      try { load(this.file); } catch { write(this.file, {}); }
    } else {
	  if (!this.file.includes('./')) this.file = './' + this.file
      if(extension(this.file) !== 'json') throw Error("Database dosyası .json uzantısı ile bitmelidir")
      try { load(this.file); } catch { write(this.file, {}); }
    }
  }
/**
 * 
 * @param {*} filePath 
 * @exemple db.setBackup(`backup.json`)
 */
  setBackup(filePath) {
    if (!filePath) throw Error(" Bir backup dosyası girmelisin"); 
    if (!filePath.includes('./')) filePath = './' + filePath
    if (extension(filePath) !== "json") throw Error("Backup dosyası json olmalıdır");
    backup = filePath;
    try { load(backup); } catch { write(backup, {}); }
    return; 
  }
  /**
   * @exemple db.loadBackup() 
   */
  loadBackup() {
    if (backup === undefined) throw Error("Backup Dosyasını bulamıyorum");
    write(this.file, load(backup));
    return;
  }
  /**
   * 
   * @param {*} data 
   * @param {*} value 
   * @exemple db.set("Zuks","zuks")
   */
  set(data, value) {
    if (!data) throw Error("Set için data bulunamadı");
	if (!value) throw Error("Set için value bulunamadı");
	let fileData = load(this.file)
	fileData[data] = value;
	write(this.file, fileData);
    Backupadd(fileData);
    return;
  }
  /**
   * 
   * @param {*} data 
   * @exemple db.remove(`test`) 
   */
  remove(data) {
    if(!data) throw Error("Remove yapılacak datayı bulamadım")
    let fileData = load(this.file)
    if(!fileData[data]) throw Error("belirtilen veriler dizinde yok veya ulaşılamıyor")
    fileData[data] = undefined;
    write(this.file, fileData);
    Backupadd(fileData);
    return;
  }
  /**
   * @param {*} data 
   * @param {*} value 
   * @exemple db.add(`sa`,1)
   */
  add(data, value) {
    if (!data) throw Error("eklenecek veri yok");
	if (!value) throw Error("eklenecek value yok");
	if(typeof value == "number") {
	let fileData = load(this.file)
	if (fileData[data] === undefined) return this.set(data, value);
	if(isNaN(fileData[data])) return this.set(data, value);
	fileData[data] = fileData[data] + value;
	write(this.file, fileData);
    Backupadd(fileData);
    return;
	} else {
	let fileData = load(this.file)
	if (fileData[data] === undefined) return this.set(data, value);
	if(isNaN(fileData[data])) return this.set(data, value);
	fileData[data] = fileData[data] + value;
	write(this.file, fileData);
    Backupadd(fileData);
    return;
	}
  }
/** 
 * 
 * @param {*} data 
 * @param {*} value 
 * @exemple db.substract(`sa`,3) 
 */

  subtract(data, value) {
    if (!data) throw Error("çıkarılacak veri yok");
    if (!value) throw Error("Çıkarılacak value yok");
    if (typeof value !== "number") throw Error(`Çıkarılacak değer bir sayı olmalırdır, alınan tür : ${typeof value}`);
    let fileData = load(this.file)
    if (file[data] === undefined) return this.set(data, value);
    if(isNaN(file[data])) return this.set(data, value);
    fileData[data] = fileData[data] - value;
    write(this.file, fileData);
    Backupadd(fileData);
    return;
  }
/*
Belirtilen parametredeki tüm verileri siler 
Örn/ db.deleteEach(`zuks`)
*/
   deleteEach(data) {
    if (!data) throw Error("deleteEach yapılacak veri yok")
    let fileData = load(this.file)
    let item = Object.keys(fileData)
    if (item === '') throw Error(nothingToDeleteeach)
    item = item.filter((Data) => Data.includes(data));
    item.forEach((Data) => {
      this.remove(Data)
    });
    return;
  }

  push(array, value) {
    if (!array) throw Error("İtilecek dizi yok")
    if (!value) throw Error("Diziye aktarılacak değer yok")
    let fileData = load(this.file)
    if (fileData[array] && Array.isArray(fileData[array])) {
      fileData[array].push(value)
      write(this.file, fileData)
    } else if (!fileData[array]) {
      this.set(array, [value])
    }
    return
  }


/*
belirtilen array daki veriyi siler 
Örnek / db.delete(`zuks`)
*/  
delete(array, index) {
    if (!array) throw Error("Silinecek veriyi gir")
    if (index === undefined) throw Error("Diziden silinecek dizin / değer yok")
    let fileData = load(this.file)
    if (!fileData[array] && !Array.isArray(fileData[array])) throw Error("Dizine alınacak / değer silinecek dizi mevcut değil veya dizi değil")
    if (typeof index === "number") {
      fileData[array].splice(index, 1)
      write(this.file, fileData)
      } else if(isNaN(index)) {
        if(fileData[array].includes(index)) {
          fileData[array].splice(fileData[array].indexOf(index), 1)
          write(this.file, fileData)
       } else { throw Error("Silmek için sağlanan dizin / değere sahip bir değer bulunamıyor"); }
      }
      return;
  }



  deleteKey(object, key) {
    if (!object) throw Error("Anahtarla silinecek nesne yok");
    if (!key) throw Error("Nesneden silinecek anahtar yok");
    let fileData = load(this.file);
    if (!fileData[object]) throw Error(" Veritabanında anahtar silinecek nesne mevcut değil");
    if (typeof fileData[object] !== 'object') throw Error("Anahtar silme için sağlanan nesne, veritabanındaki bir nesne değil");
    delete fileData[object][key];
    write(this.file, fileData);
    return;
  }



  has(data) {
    if (!data) throw Error("Data bulunamadı");
    let fileData = load(this.file)
    if (!fileData[data]) return false;
    if (fileData[data]) return true;
  }


//Kanka çaktırma silmiyor değiştiriyor qweqweqwe
  clear() {
    write(this.file, {});
    return;
  }
//Veri tabanındaki tüm verileri çeker
  fetchAll() {
    return load(this.file);
  }
  //veri tabanından tüm verileri çeker
  all() {
    return load(this.file);
  }


  destroy() {
    fs.unlinkSync(this.file);
    return;
  }



  fetch(data) {
    if (!data) throw Error("Fetch lenecek data yok")
    let fileData = load(this.file)
    if(!fileData[data]) fileData[data] = null
    return fileData[data]
  }



  get(data) {
    if (!data) throw Error("Getlenecek data yok")
    let fileData = load(this.file)
    if(!fileData[data]) fileData[data] = null
    return fileData[data]
  }






  math(data, operator, value) {
    if (!data) throw Error("Math için data girmelisin")
    if (!operator) throw Error("Math için operator girmelisin")
    if (!value) throw Error("Math için bir value girmelisin")
    if (typeof value !== "number") throw Error(`Matematiğin değeri bir sayı olmalıdır, alınan tür: ${typeof value}`);
    let fileData = load(this.file)
    if (operator === "-") {
      let çıkarma = fileData[data] - value;
      return çıkarma
    } else if (operator === "+") {
      let toplama = fileData[data] + value;
      return toplama
    } else if (operator === "*") {
      let çarpma = fileData[data] * value;
      return çarpma
    } else if (operator === "/") {
      let bölme = fileData[data] / value;
      return bölme
    } else {
      throw Error("Bilinmeyen bir operator")
    }
  }
}



module.exports = { Database };