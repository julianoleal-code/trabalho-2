import express from "express";
import usuarioRouters from "./src/routes/usuario.routes.js";

const app = express();

app.use(express.json());
app.use("/api/usuarios", usuarioRouters);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Erro interno do servidor" });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000...");
});