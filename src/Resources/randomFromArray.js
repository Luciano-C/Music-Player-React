
const pickRandomFromArray = (array) => {
    let randomIndex = Math.floor(Math.random() * (array.length));
    return array[randomIndex];
}

export default pickRandomFromArray;