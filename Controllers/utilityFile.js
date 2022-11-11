module.exports.readTime = (body) => {
    const Words = post.split(" ").length;

    let wordsPerMinute = Words/200;
    if(Math.round(wordsPerMinute) === 0){
        return wordsPerMinute = +1;
    } else {
        Math.round(wordsPerMinute);
    }
}