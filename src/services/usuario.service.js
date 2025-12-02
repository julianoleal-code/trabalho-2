import usuarioRepository from "../repositories/usuario.repository.js";

async function createUsuarioService(novoUsuario) {
  const usuario = await usuarioRepository.createUsuarioRepository(novoUsuario);
  if (!usuario) throw new Error("Erro ao criar novo usuário!");
  return usuario;
}

async function findAllUsuarioService() {
  return await usuarioRepository.findAllUsuarioRepository();
}

async function findUsuarioByIdService(id) {
  const usuario = await usuarioRepository.findUsuarioByIdRepository(id);
  if (!usuario) throw new Error("Usuário não encontrado!");
  return usuario;
}

async function updateUsuarioService(id, novoUsuario) {
  const existente = await usuarioRepository.findUsuarioByIdRepository(id);
  if (!existente) throw new Error("Usuário não encontrado!");
  const ok = await usuarioRepository.updateUsuarioRepository(id, novoUsuario);
  if (!ok) throw new Error("Erro ao atualizar o usuário!");
  return await usuarioRepository.findUsuarioByIdRepository(id);
}

async function deleteUsuarioService(id) {
  const existente = await usuarioRepository.findUsuarioByIdRepository(id);
  if (!existente) throw new Error("Usuário não encontrado!");
  const ok = await usuarioRepository.deleteUsuarioRepository(id);
  if (!ok) throw new Error("Erro ao deletar usuário!");
  return { message: "Usuário excluído" };
}

export default {
  createUsuarioService,
  findAllUsuarioService,
  findUsuarioByIdService,
  updateUsuarioService,
  deleteUsuarioService
};