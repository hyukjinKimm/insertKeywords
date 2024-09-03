const { client } = require("./db/pgConnect");
const xlsx = require('xlsx');

const workbook = xlsx.readFile('콘타_인기_키워드 1.xlsx');
const sheetName = workbook.SheetNames[0];

const worksheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(worksheet)

console.log(data[1])

