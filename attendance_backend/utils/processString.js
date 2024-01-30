
const upperCase = (name) => {
    return name.charAt(0).toUpperCase() + str.slice(1);
}

const lowerCase = (name) => {
    return name.charAt(0).toLowerCase() + str.slice(2);
}

module.exports = {upperCase, lowerCase};