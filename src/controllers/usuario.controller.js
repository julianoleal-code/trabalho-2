import usuarioService from "../services/usuario.service.js";

async function createUsuarioController(request, response) {
  const novoUsuario = request.body;
  if (!novoUsuario?.nome || !novoUsuario?.email || !novoUsuario?.senha) {
    return response.status(400).json({ message: "Campos obrigatórios: nome, email, senha" });
  }
  try {
    const usuario = await usuarioService.createUsuarioService(novoUsuario);
    return response.status(201).json(usuario);
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
}

async function findAllUsuarioController(request, response) {
  try {
    const usuarios = await usuarioService.findAllUsuarioService();
    return response.status(200).json(usuarios);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}

async function findUsuarioByIdController(request, response) {
  const { id } = request.params;
  try {
    const usuario = await usuarioService.findUsuarioByIdService(id);
    return response.status(200).json(usuario);
  } catch (error) {
    return response.status(404).json({ message: error.message });
  }
}

async function updateUsuarioController(request, response) {
  const { id } = request.params;
  const novoUsuario = request.body;
  if (!novoUsuario?.nome || !novoUsuario?.email || !novoUsuario?.senha) {
    return response.status(400).json({ message: "Campos obrigatórios: nome, email, senha" });
  }
  try {
    const usuario = await usuarioService.updateUsuarioService(id, novoUsuario);
    return response.status(200).json(usuario);
  } catch (error) {
    const status = /não encontrado/i.test(error.message) ? 404 : 400;
    return response.status(status).json({ message: error.message });
  }
}

async function deleteUsuarioController(request, response) {
  const { id } = request.params;
  try {
    const retorno = await usuarioService.deleteUsuarioService(id);
    return response.status(200).json(retorno);
  } catch (error) {
    const status = /não encontrado/i.test(error.message) ? 404 : 400;
    return response.status(status).json({ message: error.message });
  }
}

export default {
  createUsuarioController,
  findAllUsuarioController,
  findUsuarioByIdController,
  updateUsuarioController,
  deleteUsuarioController
};