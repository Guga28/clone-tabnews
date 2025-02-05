import database from "infra/database.js";

async function status(requet, response) {
  const result = await database.query("SELECT 1 + 1 as sum;");
  console.log(result.rows);
  response.status(200).json({ Declaração: "Eu amo a Sara e o Bento!" });
}

export default status;
