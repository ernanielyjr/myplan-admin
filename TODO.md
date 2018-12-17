# TO-DO List


fazer checkout transparente para boleto
  avisar o cliente que o que vale é a data do vencimento da fatura e nao do vencimento do boleto

permitir pagar valor diferente, desde que seja multiplo da soma de serviços: desconto de 2% a.m.
  Explicar ao cliente que ele ficará com um saldo positivo na sua conta, mas se utilizar serviços avulsos bem como contratar manutenções, estes serviços serão descontados do seu saldo, e e no momento que o saldo zerar, ele voltará a ser cobrado

cobrar atrasados automaticamente - somente aqueles que estão com o status do pagseguro "aguardando pagamento" a mais de 1 dia útil ou aqueles que ainda nao iniciaram o processo de pagamento

fazer bloqueio automático após 5 dias de atraso

debloquear automaticamente quando identificar o pagamento

notificar cliente sobre bloqueio

cobrar multa e juros por atraso

fechar faturas automaticamente

emitir nota fiscal automaticamente





- Email List
  - Remove email from list (if unsent)
  - Send email (if unsent)
  - Send all unsent emails

- Create interceptors
  - Logout user if response code is 401
  - Redirect to /admin if response code is 403
  - Throw generic error when "success" is false

- Base form and form validations

- CRUD Postings
- CRUD Services
- CRUD Customer
- CRUD Invoices
- CRUD Email
- Close all invoices
- Generate invoice pay code
- CRUD Users
