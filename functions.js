module.exports = {
    calculateNameDate : function (request){
        let name = request.name;
        let birthDate = new Date(request.date);
        return birthDate;
    }

}