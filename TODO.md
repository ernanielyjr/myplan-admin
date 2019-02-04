# TO-DO List

ao adicionar/alterar/excluir um lançamento, recalcular o "saldo da fatura anterior" na fatura que está aberta

Salvar no cadastro do cliente a opção "sempre boleto", selecionando esta opção:
  o sistema deve fechar a fatura 3 dias antes do vencimento
  deve anexar o boleto no email da fatura
  Acrescentar 1 real da taxa de emissão do boleto (somente no demonstrativo, não no banco de dados) tanto no email enviado quanto no "cli web"

opção de reabrir a fatura
  move o lançamentos avulsos da fatura em aberto para a fatura que está reabrindo
  exclui a fatura em aberto
  tira o vencimento da fatura em questão, valor total, e outros dados gerados quando ela foi fechada
  opção de excluir lançamentos de uma fatura aberta (só o botão, pois o serviço já existe)
  só pode reabrir caso nao tenha nenhuma outra fechada depois dela (ela tem que ser a fatura fechada mais recente)

Na lista de faturas adicionar filtro por situação (fechada, aberta, paga, não paga, vencida) e competencia (mes/ano)

Ao entrar na lista de faturas, por padrão filtrar assim: closed and !paid and overdue

permitir pagar valor diferente, desde que seja multiplo da soma de serviços: desconto de 2% a.m.
  Explicar ao cliente que ele ficará com um saldo positivo na sua conta, mas se utilizar serviços avulsos bem como contratar manutenções, estes serviços serão descontados do seu saldo, e no momento que o saldo zerar, ele voltará a ser cobrado

cobrar atrasados automaticamente - somente aqueles que estão com o status do pagseguro "aguardando pagamento" a mais de 1 dia útil ou aqueles que ainda nao iniciaram o processo de pagamento

fazer bloqueio automático após 5 dias de atraso

debloquear automaticamente quando identificar o pagamento

notificar cliente sobre bloqueio

cobrar multa e juros por atraso

fechar faturas automaticamente

emitir nota fiscal automaticamente





- Email List
  - Send email (if unsent)
  - Send all unsent emails

- Create interceptors
  - Logout user if response code is 401
  - Redirect to /admin if response code is 403
  - Throw generic error when "success" is false
  - Redirecionar para página correta depois de logar

- Base form and form validations

- CRUD Postings
- CRUD Services
- CRUD Customer
- CRUD Invoices
- CRUD Email
- Close all invoices
- Generate invoice pay code
- CRUD Users
