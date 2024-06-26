const Numerologia = require("./Numerologia");

test("class is defined", () => {
  const numerology = new Numerologia({birthDate: '1997-08-31T00:00:00', name: 'pedro victor vieira gontijo'});
  const expectedReturn = new Numerologia().mapResponse = {
    MO: 8,
    EU: 3,
    CD: 2,
    D1: 4,
    D2: 0,
    C1: 8,
    C2: 4,
    C3: 8,
    DM: 4,
    R1: 3,
    R2: 3,
    R3: 6,
    R4: 7,
    IR1: 7,
    IR2: 8,
    IRR2: 8,
    IR3: 9,
    IRR3: 9,
    IR4: 1,
    personalYear: 2
  };
  const value = numerology.calculateNameDate();
  expect(value).toStrictEqual(expectedReturn);
});
