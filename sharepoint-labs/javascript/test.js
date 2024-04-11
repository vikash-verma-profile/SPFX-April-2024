function transformCase(strInput) {
    let result = '';

    for (let i = 0; i < strInput.length; i++) {
        const char = strInput.charAt(i);

        if (char === char.toUpperCase()) {
            result += char.toLowerCase();
        } else {
            result += char.toUpperCase();
        }
    }

    return result;
}
console.log(transformCase("Abc"));
console.log("Abc".toUpperCase());