//@ts-ignore
class Numerologia {
  birthDate = null;
  name = null;
  mapResponse = {
    MO: 0,
    EU: 0,
    CD: 0,
    D1: 0,
    D2: 0,
    C1: 0,
    C2: 0,
    C3: 0,
    D1: 0,
    D2: 0,
    DM: 0,
    R1: 0,
    R2: 0,
    R3: 0,
    R4: 0,
    IR1: 0,
    IR2: 0,
    IRR2: 0,
    IR3: 0,
    IRR3: 0,
    IR4: 0,
    personalYear: 0,
  };

  constructor(props) {
    const { birthDate, name } = props || { birthDate: "", name: "" };
    this.birthDate = new Date(birthDate);
    this.name = name.toUpperCase();
  }

  calculateNameDate() {
    this.calculateName();
    this.calculateDate();
    return this.mapResponse;
  }

  removeAccents(str) {
    return str.normalize("NFD").replace(/[^a-zA-Z\s]/g, "");
  }

  calculateName() {
    let fullNameArray = this.name.split(" ");
    fullNameArray.forEach((name) => {
      let nameArray = [...name];
      nameArray.forEach((char, charIndex) => {
        if (char == "Y") {
          this.yValue(char, nameArray, charIndex, name);
        } else if (this.vowelCharacter(char)) {
          this.vowelValue(char);
          this.mapResponse.MO = this.valueReducer(this.mapResponse.MO);
        } else {
          this.consonantValue(char);
          this.mapResponse.EU = this.valueReducer(this.mapResponse.EU);
        }
      });
    });
  }

  calculateDate() {
    const mapResponse = this.mapResponse;
    const valueReducer = this.valueReducer;
    let day, month, year;
    const currentDate = new Date();

    day = valueReducer(this.birthDate.getDate());
    month = valueReducer(this.birthDate.getMonth() + 1);
    year = valueReducer(this.birthDate.getFullYear());

    mapResponse.CD = valueReducer(day + month + year);
    mapResponse.D1 = valueReducer(day - month);
    mapResponse.D2 = valueReducer(month - year);
    mapResponse.DM = valueReducer(mapResponse.D1 - mapResponse.D2);
    mapResponse.C1 = month;
    mapResponse.C2 = day;
    mapResponse.C3 = year;
    mapResponse.R1 = valueReducer(day + month);
    mapResponse.R2 = valueReducer(day + year);
    mapResponse.R3 = valueReducer(mapResponse.R1 + mapResponse.R2);
    mapResponse.R4 = valueReducer(month + year);
    // mapResponse.IR1 = valueReducer(Math.abs(mapResponse.CD - 36));
    // mapResponse.IR2 = valueReducer(mapResponse.IR1 + 1);
    // mapResponse.IRR2 = valueReducer(mapResponse.IR2 + 9);
    // mapResponse.IR3 = valueReducer(mapResponse.IRR2 + 1);
    // mapResponse.IRR3 = valueReducer(mapResponse.IR3 + 9);
    // mapResponse.IR4 = valueReducer(mapResponse.IRR3 + 1);
    // mapResponse.personalYear = valueReducer(day + month + year);
  }

  vowelCharacter(char) {
    let str = "AEIOU";
    return str.indexOf(char) != -1;
  }

  vowelValue(char) {
    switch (char) {
      case "A":
        this.mapResponse.MO += 1;
        break;
      case "E":
        this.mapResponse.MO += 5;
        break;
      case "I":
        this.mapResponse.MO += 9;
        break;
      case "O":
        this.mapResponse.MO += 6;
        break;
      case "U":
        this.mapResponse.MO += 3;
        break;
      default:
        this.mapResponse.MO += 0;
        break;
    }
  }

  consonantValue(char) {
    if (char == "J" || char == "S") {
      this.mapResponse.EU += 1;
    } else if (char == "B" || char == "K" || char == "T") {
      this.mapResponse.EU += 2;
    } else if (char == "C" || char == "L") {
      this.mapResponse.EU += 3;
    } else if (char == "D" || char == "M" || char == "V") {
      this.mapResponse.EU += 4;
    } else if (char == "N" || char == "W") {
      this.mapResponse.EU += 5;
    } else if (char == "F" || char == "X") {
      this.mapResponse.EU += 6;
    } else if (char == "G" || char == "P") {
      this.mapResponse.EU += 7;
    } else if (char == "H" || char == "Q" || char == "Z") {
      this.mapResponse.EU += 8;
    } else {
      this.mapResponse.EU += 9;
    }
  }

  yValue(char, nameArray, charIndex, name) {
    const fistLetter = char == nameArray[0];
    const lastLetter = char == nameArray[name.length];
    const nextIsVowel = this.vowelCharacter(nameArray[charIndex + 1]);
    const previousIsVowel = this.vowelCharacter(nameArray[charIndex - 1]);
    const nextIsConsonant = !this.vowelCharacter(nameArray[charIndex + 1]);
    const previousIsConsonant = !this.vowelCharacter(nameArray[charIndex - 1]);

    if (
      (fistLetter && nextIsVowel) ||
      (lastLetter && previousIsVowel) ||
      (previousIsVowel && nextIsVowel) ||
      (previousIsVowel && nextIsConsonant)
    ) {
      // console.log(char + ": consoante");
      this.mapResponse.EU += 7;
    } else if (
      (fistLetter && nextIsConsonant) ||
      (lastLetter && previousIsConsonant) ||
      (previousIsConsonant && nextIsConsonant) ||
      (previousIsConsonant && nextIsVowel)
    ) {
      // console.log(char + ": vogal");
      this.mapResponse.MO += 7;
    }
  }

  valueReducer(value) {
    value = Math.abs(value);
    const arrValue = Array.from(value.toString()).map(Number);
    let reducedValue = arrValue.reduce((acc, current) => {
      acc += current;
      if (acc > 9 && acc != 11 && acc != 22) {
        let arrAcc = Array.from(acc.toString()).map(Number);
        acc = arrAcc[0] + arrAcc[1];
      }
      return acc;
    });
    return reducedValue;
  }

  tanga() {
    return "Hello work=ld";
  }

  // calculateTrimester(birthDate) {}
}
module.exports = Numerologia;
