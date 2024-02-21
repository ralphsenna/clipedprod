import { Router } from "express";
import PedidoCtrl from "../Controle/pedidoCtrl.js";

const pedCtrl = new PedidoCtrl();
const rotaPedido = new Router();

rotaPedido
.get('/', pedCtrl.consultar)
.get('/:termo', pedCtrl.consultar)
.post('/', pedCtrl.gravar)
.patch('/', pedCtrl.atualizar)
.put('/', pedCtrl.atualizar)
.delete('/', pedCtrl.excluir);

export default rotaPedido;