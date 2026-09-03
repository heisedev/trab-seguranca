# Scripts de exploracao - WebGoat

Scripts e comandos usados na identificacao/exploracao de cada vulnerabilidade,
organizados por categoria OWASP Top 10:2021. Pre-requisito: ambiente WebGoat
rodando (`docker compose up -d`) e usuario logado no navegador.

| Arquivo | Categoria | Como usar |
|---|---|---|
| `A01_idor.js` | A01 - Broken Access Control | Colar no Console do DevTools (F12) com sessao logada como "tom" |
| `A02_cryptographic_failures.txt` | A02 - Cryptographic Failures | Passo a passo manual via DevTools (nao ha script de exploracao) |
| `A03_sql_injection.sql` | A03 - Injection | Comandos digitados nos campos "SQL query" das licoes do WebGoat |
| `A05_xxe.js` | A05 - Security Misconfiguration | Colar no Console do DevTools (F12) na licao XXE |
| `A07_auth_bypass.js` | A07 - Identification and Authentication Failures | Colar no Console do DevTools (F12) apos preencher o formulario uma vez |
| `A10_ssrf.js` | A10 - Server-Side Request Forgery | Colar no Console do DevTools (F12) na licao SSRF |

Cada arquivo `.js` contem comentarios explicando a requisicao original, a
falha identificada, o payload usado e o resultado esperado — use como
referencia de reprodutibilidade no relatorio (Secao 7.1 do roteiro).
