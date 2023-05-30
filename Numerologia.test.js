const Numerologia = require("./Numerologia");

test("class is defined", () => {
  const expectedString = "Hello work=ld";
  const numerology = new Numerologia();
  const value = numerology.tanga();
  expect(value).toBe(expectedString);
});
