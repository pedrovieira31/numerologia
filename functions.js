module.exports = {
    calculateNameDate: function (request) {
        let birthDate = new Date(request.date);
        this.calculateName(request.name.toUpperCase());
        return birthDate;
    },

    calculateName: function (name) {
        let nameArray = [...name];
        nameArray.forEach(function(char, index) {
            if (this.vogalCharacter(char)) {
                console.log(char + ": vogal")
            }
            else if (this.consoantCharacter(char)) {
                console.log(char + ": consoante")
            }
            else {
                this.yValue(nameArray, index);
            }
        }.bind(this));
    },

    vogalCharacter(char) {
        let isVogal = false;
        if (char == 'A' || char == 'E' || char == 'I' || char == 'O' || char == 'U') {
            isVogal = true;
        }
        else {
            isVogal = false;
        }
        return isVogal;
    },

    consoantCharacter(char) {
        let isConsoant = false;
        if (char == 'B' || char == 'C' || char == 'D' || char == 'F' || char == 'G' || char == 'H' || char == 'J' ||
            char == 'K' || char == 'L' || char == 'M' || char == 'N' || char == 'P' || char == 'Q' || char == 'R' ||
            char == 'S' || char == 'T' || char == 'V' || char == 'S' || char == 'X' || char == 'W' || char == 'Z') {
            isConsoant = true;
        }
        else {
            isConsoant = false;
        }
        return isConsoant;
    },

    vogalValue(char) {
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

    consoantValue(char) {
        if (char == 'B' || char == 'K' || char == 'T') {
            //EU = 2
        }
        else if (char == 'C' || char == 'L') {
            //EU = 3
        }
        else if (char == 'D' || char == 'M' || char == 'V') {
            //EU = 4
        }
        else if (char == 'N' || char == 'W') {
            //EU = 5
        }
        else if (char == 'F' || char == 'X') {
            //EU = 6
        }
        else if (char == 'G' || char == 'P') {
            //EU = 7
        }
        else if (char == 'H' || char == 'Q' || char == 'Z') {
            //EU = 8
        }
        else if (char == 'J' || char == 'S') {
            //EU = 1
        }
        else {
            //EU = 9
        }
    },

    yValue(nameArray,index) {
    }
}

