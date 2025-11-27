export const CODIGOS_ERRO = {
     ERRO_INTERNO: { codigo: 1000, mensagem: 'Erro interno do servidor' },
     DADOS_INCOMPLETOS: { codigo: 1001, mensagem: 'Preencha todos os dados necessários' },
     DADO_TIPO_INVALIDO: { codigo: 1002, mensagem: 'O tipo do dado enviado é inválido' },
     ID_INVALIDO: { codigo: 1003, mensagem: 'O ID enviado é inválido' },

     CLIENTE_LISTAR_ERR: { codigo: 1100, mensagem: 'Erro ao listar clientes' },
     CLIENTE_EXISTE_ERR: { codigo: 1101, mensagem: 'O Cliente já está registrado.'},
     CLIENTE_EXISTE_IG_ERR: { codigo: 1101.1, mensagem: 'Já existe um cliente com esse instagram registrado.'},
     CLIENTE_EXISTE_TEL_ERR: { codigo: 1101.2, mensagem: 'Já existe um cliente com esse telefone registrado.'},
     CLIENTE_N_EXISTE_ERR: { codigo: 1102, mensagem: 'O Cliente não existe.' },
}
export const CODIGOS_SUCESSO = {
     SUCESSO_GENERICO: { codigo: 3000, mensagem: 'Erro interno do servidor' },

     CLIENTE_LISTAR_SUCESS: { codigo: 3100, mensagem: 'Clientes listados com sucesso.' },
     CLIENTE_EXISTE_SUCESS: { codigo: 3101, mensagem: 'O Cliente já está registrado.'},
     CLIENTE_N_EXISTE_SUCESS: { codigo: 3102, mensagem: 'O Cliente não existe.' },
     CLIENTE_CRIAR_SUCESS: { codigo: 3103, mensagem: 'Cliente criado com sucesso.' },
     CLIENTE_EDITAR_SUCESS: { codigo: 3104, mensagem: 'Cliente editado com sucesso.' },
     CLIENTE_EXCLUIR_SUCESS: { codigo: 3105, mensagem: 'Cliente excluido com sucesso.' },
}