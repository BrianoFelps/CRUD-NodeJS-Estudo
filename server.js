import app from "./app.js";
const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>{
    console.log(`Servidor rodando na porta ${PORT}: http://localhost:${PORT}`)
})
/*Segundo arquivo criado, acresce de importância por criar a conexão*/ 