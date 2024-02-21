import { Router } from "express";
import ClienteCtrl from "../Controle/clienteCtrl.js";

const cliCtrl = new ClienteCtrl();
const rotaCliente = new Router();

rotaCliente
.get('/', cliCtrl.consultar)
.get('/:termo', cliCtrl.consultar)
.post('/', cliCtrl.gravar)
.patch('/', cliCtrl.atualizar)
.put('/', cliCtrl.atualizar)
.delete('/', cliCtrl.excluir);

export default rotaCliente;