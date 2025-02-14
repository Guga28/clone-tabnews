import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  // Consulta versão do Postgres
  const version = await database.query("SHOW server_version;");

  // Consulta máximo de conexões
  const maxConnections = await database.query("SHOW max_connections;");

  // Consulta conexões em uso
  const usedConnections = await database.query(`
    SELECT count(*)::int 
    FROM pg_stat_activity 
    WHERE datname = current_database();
  `);

  const responseData = {
    updated_at: updatedAt,
    postgres_version: version.rows[0].server_version,
    max_connections: parseInt(maxConnections.rows[0].max_connections),
    used_connections: usedConnections.rows[0].count,
  };

  response.status(200).json(responseData);

  console.log(
    responseData.updated_at,
    responseData.postgres_version,
    responseData.max_connections,
    responseData.used_connections,
  );
}

export default status;
