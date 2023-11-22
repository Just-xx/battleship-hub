export function stringIntoNumber(str) {
  return str
    .split("")
    .map(char => {
      let upperChar = char.toUpperCase();

      if (upperChar >= "A" && upperChar <= "Z")
        return upperChar.charCodeAt(0) - "A".charCodeAt(0) + 1;
      else return char;
    })
    .join("");
}
