export const specialParse = (str, character) => {
    const res = str.replace(/%c/g, character.information.charClass)
    .replace(/%n/g, character.information.name);
    return res
}