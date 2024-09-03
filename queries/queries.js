const { client } = require("../db/pgConnect");
const { v4: uuidv4 } = require('uuid'); // uuid 패키지의 v4 function을 사용


const getIndustry = async (bizno, idstry) => {
    try {

        const result = await client.query(
            'SELECT * FROM info_industry_list WHERE business_number = $1 AND industry_name = $2',
            [bizno, idstry]
        );

        return result

    } catch(err) {
        console.error(err)
    }

}

const insertKeyword = async (bizno, idsty_id, keywords) => {

    try{
     
    
        keywords.split(",").forEach(async(keyword, idx) => {
            
            const query = `
            INSERT INTO info_keyword_list (keyword_id, business_number, industry_id, content, ranking_criteria)
            VALUES ($1, $2, $3, $4, $5)
          `;
      
          const values = [uuidv4(), bizno, idsty_id, keyword.trim(), idx+1];
      
          await client.query(query, values);
        })

    } catch(err) {
        console.log(err)
    }
}

module.exports = {
    getIndustry,
    insertKeyword
}