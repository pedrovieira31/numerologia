module.exports = {
  numerologyMap: {
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
  },

  calculateNameDate: function (request) {
    let birthDate = new Date(request.date);
    let name = this.removeAccents(request.name.toUpperCase());
    this.calculateName(name);
    this.calculateDate(birthDate);
    return this.numerologyMap;
  },

  removeAccents: function (str) {
    return str.normalize("NFD").replace(/[^a-zA-Z\s]/g, "");
  },

  calculateName: function (fullName) {
    let fullNameArray = fullName.split(" ");
    fullNameArray.forEach(
      function (name) {
        let nameArray = [...name];
        nameArray.forEach(
          function (char, charIndex) {
            if (char == "Y") {
              this.yValue(char, nameArray, charIndex, name);
            } else if (this.vowelCharacter(char)) {
              console.log(char + ": vogal");
              this.vowelValue(char);
              this.numerologyMap.MO = this.valueReducer(this.numerologyMap.MO);
            } else {
              console.log(char + ": consoante");
              this.consonantValue(char);
              this.numerologyMap.EU = this.valueReducer(this.numerologyMap.EU);
            }
          }.bind(this)
        );
      }.bind(this)
    );
  },

  calculateDate: function (birthDate) {
    const numerologyMap = this.numerologyMap;
    const valueReducer = this.valueReducer;
    let day, month, year;
    const currentDate = new Date();

    day = valueReducer(birthDate.getDate());
    month = valueReducer(birthDate.getMonth() + 1);
    year = valueReducer(birthDate.getFullYear());

    numerologyMap.CD = valueReducer(day + month + year);
    numerologyMap.D1 = valueReducer(day - month);
    numerologyMap.D2 = valueReducer(month - year);
    numerologyMap.DM = valueReducer(numerologyMap.D1 - numerologyMap.D2);
    numerologyMap.C1 = day;
    numerologyMap.C2 = month;
    numerologyMap.C3 = year;
    numerologyMap.R1 = valueReducer(day + month);
    numerologyMap.R2 = valueReducer(day + year);
    numerologyMap.R3 = valueReducer(numerologyMap.R1 + numerologyMap.R2);
    numerologyMap.R4 = valueReducer(month + year);
    numerologyMap.IR1 = valueReducer(Math.abs(numerologyMap.CD - 36));
    numerologyMap.IR2 = valueReducer(numerologyMap.IR1 + 1);
    numerologyMap.IRR2 = valueReducer(numerologyMap.IR2 + 9);
    numerologyMap.IR3 = valueReducer(numerologyMap.IRR2 + 1);
    numerologyMap.IRR3 = valueReducer(numerologyMap.IR3 + 9);
    numerologyMap.IR4 = valueReducer(numerologyMap.IRR3 + 1);
    numerologyMap.personalYear = valueReducer(day + month + year);
  },

  vowelCharacter(char) {
    let str = "AEIOU";
    return str.indexOf(char) != -1;
  },

  vowelValue(char) {
    switch (char) {
      case "A":
        this.numerologyMap.MO += 1;
        break;
      case "E":
        this.numerologyMap.MO += 5;
        break;
      case "I":
        this.numerologyMap.MO += 9;
        break;
      case "O":
        this.numerologyMap.MO += 6;
        break;
      case "U":
        this.numerologyMap.MO += 3;
        break;
      default:
        this.numerologyMap.MO += 0;
        break;
    }
  },

  consonantValue(char) {
    if (char == "J" || char == "S") {
      this.numerologyMap.EU += 1;
    } else if (char == "B" || char == "K" || char == "T") {
      this.numerologyMap.EU += 2;
    } else if (char == "C" || char == "L") {
      this.numerologyMap.EU += 3;
    } else if (char == "D" || char == "M" || char == "V") {
      this.numerologyMap.EU += 4;
    } else if (char == "N" || char == "W") {
      this.numerologyMap.EU += 5;
    } else if (char == "F" || char == "X") {
      this.numerologyMap.EU += 6;
    } else if (char == "G" || char == "P") {
      this.numerologyMap.EU += 7;
    } else if (char == "H" || char == "Q" || char == "Z") {
      this.numerologyMap.EU += 8;
    } else {
      this.numerologyMap.EU += 9;
    }
  },

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
      console.log(char + ": consoante");
      this.numerologyMap.EU += 7;
    } else if (
      (fistLetter && nextIsConsonant) ||
      (lastLetter && previousIsConsonant) ||
      (previousIsConsonant && nextIsConsonant) ||
      (previousIsConsonant && nextIsVowel)
    ) {
      console.log(char + ": vogal");
      this.numerologyMap.MO += 7;
    }
  },

  valueReducer(value) {
    value = Math.abs(value);
    const arrValue = Array.from(value.toString()).map(Number);
    let reducedValue = arrValue.reduce(function (acc, current) {
      acc += current;
      if (acc > 9 && acc != 11 && acc != 22) {
        let arrAcc = Array.from(acc.toString()).map(Number);
        acc = arrAcc[0] + arrAcc[1];
      }
      return acc;
    });
    return reducedValue;
  },

  calculateTrimester(birthDate) {},
};
