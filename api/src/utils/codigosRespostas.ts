export const CODIGOS_ERRO = {
     ERRO_INTERNO: { codigo: 1000, mensagem: 'Erro interno do servidor' },
     DADOS_INCOMPLETOS: { codigo: 1001, mensagem: 'Preencha todos os dados necessários' },
     DADO_TIPO_INVALIDO: { codigo: 1002, mensagem: 'O tipo do dado enviado é inválido' },

     CLIENTE_LISTAR_ERR: { codigo: 1100, mensagem: 'Erro ao listar clientes' },
     CLIENTE_EXISTE_ERR: { codigo: 1101, mensagem: 'O Cliente já está registrado.'},
     CLIENTE_N_EXISTE_ERR: { codigo: 1102, mensagem: 'O Cliente não existe.' },
}
export const CODIGOS_SUCESSO = {
     SUCESSO_GENERICO: { codigo: 3000, mensagem: 'Erro interno do servidor' },

     CLIENTE_LISTAR_SUCESS: { codigo: 3100, mensagem: 'Clientes listados com sucesso.' },
     CLIENTE_EXISTE_SUCESS: { codigo: 3101, mensagem: 'O Cliente já está registrado.'},
     CLIENTE_N_EXISTE_SUCESS: { codigo: 3102, mensagem: 'O Cliente não existe.' },
}