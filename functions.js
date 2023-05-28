module.exports = {
    calculateNameDate: function (request) {

        let birthDate = new Date(request.date);
        let name = this.removeAccents(request.name.toUpperCase());
        //this.calculateName(name);
        //this.calculateDate(birthDate);
        return birthDate;
    },

    removeAccents: function (str) {

        return str.normalize("NFD").replace(/[^a-zA-Z\s]/g, "");
    },

    calculateName: function (fullName) {

        let fullNameArray = fullName.split(' ');
        fullNameArray.forEach(function (name) {
            let nameArray = [...name];
            nameArray.forEach(function (char, charIndex) {
                if (char == 'Y') {
                    this.yValue(char, nameArray, charIndex, name);
                }
                else if (this.vowelCharacter(char)) {
                    console.log(char + ": vogal")
                    this.vowelValue(char);
                }
                else {
                    console.log(char + ": consoante")
                    this.consonantValue(char);
                }

            }.bind(this));
        }.bind(this));
    },

    calculateDate: function (birthDate) {

        let day, month, year;
        const currentDate = new Date();
        day = this.valueReducer(birthDate.getDate());
        month = this.valueReducer(birthDate.getMonth() + 1);
        year = this.valueReducer(birthDate.getFullYear());

        //CD = this.valueReducer(day + month + year);
        //D1 = this.valueReducer(day - month);
        //D2 = this.valueReducer(month - year);
        //DM = this.valueReducer(D1 - D2);
        //C1 = day;
        //C2 = month;
        //C3 = year;
        //R1 = this.valueReducer(day + month);
        //R2 = this.valueReducer(day + year);
        //R3 = this.valueReducer(R1 + R2);
        //R4 = this.valueReducer(month + year);
        //IR1 = Math.abs(CD - 36);
        //IR2 = IR1 + 1;
        //IRR2 = IR2 + 9;

        //IR3 = IRR2 + 1;
        //IRR3 = IR3 + 9;

        //IR4 = IRR3 + 1;

        
        //personalYear = this.valueReducer(day + month + year);
    },

    vowelCharacter(char) {

        let str = "AEIOU";
        return (str.indexOf(char) != -1);
    },

    vowelValue(char) {

        switch (char) {
            case 'A':
                //MO += 1
                break;
            case 'E':
                //MO += 5
                break;
            case 'I':
                //MO += 9
                break;
            case 'O':
                //MO += 6
                break;
            case 'U':
                //MO += 3
                break;
            default:
                //MO += 0
                break;
        }
    },

    consonantValue(char) {

        if (char == 'J' || char == 'S') {
            //EU += 1
        }
        else if (char == 'B' || char == 'K' || char == 'T') {
            //EU += 2
        }
        else if (char == 'C' || char == 'L') {
            //EU += 3
        }
        else if (char == 'D' || char == 'M' || char == 'V') {
            //EU += 4
        }
        else if (char == 'N' || char == 'W') {
            //EU += 5
        }
        else if (char == 'F' || char == 'X') {
            //EU += 6
        }
        else if (char == 'G' || char == 'P') {
            //EU += 7
        }
        else if (char == 'H' || char == 'Q' || char == 'Z') {
            //EU += 8
        }
        else {
            //EU += 9
        }
    },

    yValue(char, nameArray, charIndex, name) {

        const fistLetter = char == nameArray[0];
        const lastLetter = char == nameArray[name.length];
        const nextIsVowel = this.vowelCharacter(nameArray[charIndex + 1]);
        const previousIsVowel = this.vowelCharacter(nameArray[charIndex - 1]);
        const nextIsConsonant = !this.vowelCharacter(nameArray[charIndex + 1]);
        const previousIsConsonant = !this.vowelCharacter(nameArray[charIndex - 1]);

        if ((fistLetter && nextIsVowel) ||
            (lastLetter && previousIsVowel) ||
            (previousIsVowel && nextIsVowel) ||
            (previousIsVowel && nextIsConsonant)) {
            console.log("EU += 7");
            //EU += 7
        }
        else if ((fistLetter && nextIsConsonant) ||
            (lastLetter && previousIsConsonant) ||
            (previousIsConsonant && nextIsConsonant) ||
            (previousIsConsonant && nextIsVowel)) {
            console.log("MO += 7");
            //MO += 7
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

    calculateTrimester(birthDate) {

    }
}

