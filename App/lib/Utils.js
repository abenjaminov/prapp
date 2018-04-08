
const RenderIf = (condition, callback) => {
    if(condition) {
        let content = callback();
        console.log(content);
        return content;
    } else {
        return null;
    }
}

const NumberToString = (number) => {
    if(number - 10 < 0) {
        return "0" + number.toString()
    } else {
        return number.toString();
    }
}

const HashCode = (str) => {
    var h = 0, l = str.length, i = 0;
    if ( l > 0 )
      while (i < l)
        h = (h << 5) - h + str.charCodeAt(i++) | 0;
    return h;
  };

export {
    RenderIf,
    NumberToString,
    HashCode
}