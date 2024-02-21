import express from 'express';
import cors from 'cors';
import rotaCliente from './Rotas/rotaCliente.js';
//import rotaPedido from './Rotas/rotaPedido.js';

const host='0.0.0.0';
const porta='3000';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/cliente', rotaCliente);
//app.use('/pedido', rotaPedido);

app.listen(porta, host, () => {
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
