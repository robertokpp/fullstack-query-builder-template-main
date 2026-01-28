export default {
  client : "sqlite3",
  connetion:{
    filename :"./src/database/database.db",
  },
  useNullAsDefault: true,
  migrations : {
    extensions :"ts",
    diretory: ".src/database/migrations",
  }

}