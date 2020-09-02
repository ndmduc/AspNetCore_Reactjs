
export function sumValues(value){
    return value.reduce((total, val) => total + val, 0);
}

export default function sumOdd(values){
    return sumValues(values.filter((item, index) => index % 2 === 0));
}