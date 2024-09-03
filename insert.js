const { getIndustry, insertKeyword } = require("./queries/queries")

const xlsx = require('xlsx');

const workbook = xlsx.readFile('콘타_인기_키워드 1.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(worksheet)


data.forEach(async (row) => {
    const 사업자번호 = row['사업자번호']
    const 회사명 = row['회사명']
    const 산업군 = row['산업군']
    const 키워드 = row['키워드']
    console.log(산업군)
    const result = await getIndustry(사업자번호, 산업군)
    result.rows.forEach(async (row) => {
        const { business_number, industry_id } = row
        await insertKeyword(business_number, industry_id, 키워드)
        console.log(row)
    })
})
