const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Configuração da conexão com o banco de dados MongoDB
const uri =
   "mongodb+srv://admin:admin@cluster0.tgzsdkq.mongodb.net/?retryWrites=true&w=majority";
const options = {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true,
   useFindAndModify: false,
};

// Conexão com o banco de dados
mongoose
   .connect(uri, options)
   .then(() => {
      console.log("Conexão estabelecida com o banco de dados!");
   })
   .catch((err) => {
      console.log("Erro ao conectar com o banco de dados:", err);
      process.exit();
   });

module.exports = mongoose;