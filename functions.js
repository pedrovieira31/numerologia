module.exports = {
    calculateNameDate: function (request) {
        let birthDate = new Date(request.date);
        this.calculateName(request.name.toUpperCase());
        return birthDate;
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

    vowelCharacter(char) {
        let str = "AEIOU";
        return (str.indexOf(char) != -1) ? true : false;
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

        // Y INICIO DO NOME
        if(char = nameArray[0] && this.vowelCharacter(nameArray(charIndex + 1))){
            //EU += 7
        }
        else if(char = nameArray[0] && !this.vowelCharacter(nameArray(charIndex + 1))){
            //MO += 7
        }
        // Y FINAL DO NOME
        else if(char = nameArray[name.length] && this.vowelCharacter(nameArray(charIndex - 1))){
            //EU += 7
        }
        else if(char = nameArray[name.length] && !this.vowelCharacter(nameArray(charIndex - 1))){
            //MO += 7
        }
        // Y ENTRE VOGAIS
        else if(this.vowelCharacter(nameArray(charIndex - 1)) && this.vowelCharacter(nameArray(charIndex + 1))){
            //EU += 7
        }
        // Y ENTRE CONSOANTES
        else if(!this.vowelCharacter(nameArray(charIndex - 1)) && !this.vowelCharacter(nameArray(charIndex + 1))){
            //MO += 7
        }
        // Y ENTRE VOGAL E CONSOANTE
        else if(this.vowelCharacter(nameArray(charIndex - 1)) && !this.vowelCharacter(nameArray(charIndex + 1))){
            //EU += 7
        }
        // Y ENTRE CONSOANTE E VOGAL
        else if(!this.vowelCharacter(nameArray(charIndex - 1)) && this.vowelCharacter(nameArray(charIndex + 1))){
            //MO += 7
        }
    }
}

