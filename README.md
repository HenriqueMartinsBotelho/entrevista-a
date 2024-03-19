# Como executar

1. Instale as dependências: `npm install`
2. Execute: `npx ts-node index.ts`

# Estratégias de Otimização

Usei um conjunto (`Set`) de promessas representando as tarefas atualmente em execução. Ao iniciar uma tarefa, ela é adicionada ao conjunto; uma vez concluída, é removida. Isso permite monitorar quais tarefas estão em andamento e quantas estão sendo processadas simultaneamente.
Utilizei `Promise.race()` para aguardar a conclusão de qualquer tarefa ativa no conjunto de promessas. Isso permite liberar um worker assim que uma tarefa é concluída, ao invés de esperar que todas as tarefas no lote atual terminem, melhorando significativamente a eficiência e reduzindo o tempo ocioso dos workers.
O número ótimo de workers (`maxTasks`) pode ser ajustado de acordo com os recursos do sistema e a natureza das tarefas.

# Regras

1.  Typescript
2.  Eslint com o pattern airbnb
3.  Prettier com um tabWidth de 4 espacos
4.  Padrao do commitlint para commits
5.  Versione o seus codigos a cada commit utilizando o husky (com pre-commit)

O código é versionado automaticamente fazendo o husky chamar o `npx changeset`.
