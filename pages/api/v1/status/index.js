import database from "infra/database.js";
import { version } from "react";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  // Consulta versão do Postgres
  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  // Consulta máximo de conexões
  const databasemaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnectionsValue =
    databasemaxConnectionsResult.rows[0].max_connections;

  // Consulta conexões abertas
  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT count (*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
}

export default status;
