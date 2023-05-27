module.exports = {
    calculateNameDate: function (request) {
        let birthDate = new Date(request.date);
        this.calculateName(request.name.toUpperCase());
        return birthDate;
    },

    calculateName: function (name) {
        let nameArray = [...name];
        nameArray.forEach(function(char, index) {
            if (this.vowelCharacter(char)) {
                console.log(char + ": vogal")
            }
            else if (this.consonantCharacter(char)) {
                console.log(char + ": consoante")
            }
            else {
                this.yValue(nameArray, index);
            }
        }.bind(this));
    },

    vowelCharacter(char) {
        let str = "AEIOU";
        return (str.indexOf(char) != -1) ? true : false;
    },

    consonantCharacter(char) {
        let str = "BCDFGHJKLMNPQRSTVWXZ";
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

