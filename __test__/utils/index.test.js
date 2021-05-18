import { internet, lorem } from "faker";

import { validateEmail, validateForm } from "utils";

describe("util methods", () => {
  describe("Validate Email Method", () => {
    describe("when not given a value", () => {
      [null, undefined, "", false].forEach((input) => {
        it(`returns false when given value ${input}`, () => {
          const isEmailValid = validateEmail(input);
          expect(isEmailValid).toBe(false);
        });
      });
    });

    describe("when given a string", () => {
      describe("when given a proper email", () => {
        it("returns true", () => {
          const email = internet.email();
          const isEmailValid = validateEmail(email);
          expect(isEmailValid).toBe(true);
        });
      });

      describe("when given a random string", () => {
        it("returns false", () => {
          const email = lorem.word();
          const isEmailValid = validateEmail(email);
          expect(isEmailValid).toBe(false);
        });
      });
    });
  });

  describe("Validate Form Method", () => {
    describe("when not given a value", () => {
      [null, undefined, "", false].forEach((input) => {
        it(`returns error message when given value ${input}`, () => {
          const error = validateForm(input);
          expect(error).toBe(
            "Form is currently not recieving data. Try again later.",
          );
        });
      });
    });

    describe("when given data", () => {
      describe("when data includes invalid email", () => {
        it("returns error message", () => {
          const invalidEmail = lorem.word();
          const error = validateForm({ email: invalidEmail });
          expect(error).toBe("Email is not valid.");
        });
      });

      describe("when data a single data field is falsy", () => {
        [null, undefined, "", false].forEach((falsy) => {
          it(`returns error message when field's value is ${falsy}`, () => {
            const field = "label";
            const error = validateForm({ [field]: falsy });
            expect(error).toBe(`Label cannot be empty.`);
          });
        });
      });

      describe("when data multiple data fields are falsy", () => {
        it("returns error message", () => {
          const data = {
            [lorem.word()]: undefined,
            [lorem.word()]: null,
            [lorem.word()]: false,
            password: "",
          };
          const error = validateForm(data);
          expect(error).toBe(`Password cannot be empty.`);
        });
      });

      describe("when data no data fields are falsy", () => {
        it("returns undefined", () => {
          const data = {
            [lorem.word()]: lorem.text(),
            [lorem.word()]: lorem.word(),
            [lorem.word()]: internet.url(),
            eamil: internet.email(),
          };
          const error = validateForm(data);
          expect(error).toBe(undefined);
        });
      });
    });
  });
});
