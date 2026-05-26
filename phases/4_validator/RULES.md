# RULES — Fase 4: Validator Stage

- **Sem código de negócio:** Proibido criar ou modificar código fonte nesta fase.
- **Validação estrita:** Execute fielmente e de forma determinística os comandos declarados no `build_report.md`.
- **Colete Logs:** Obtenha toda a saída do terminal (seja sucesso ou erro) para comprovar a veracidade do teste.
- **Auto-Correção Obrigatória:** Caso aconteça algum erro na fase 4 (validator), a execução NÃO PODE ser interrompida. Você deve registrar a falha temporária no `validation_report.md` e `state.json`, e prosseguir automaticamente para a próxima etapa apropriada (como assumir a Fase 5 de Review e retornar à Fase 3 de Builder) para corrigir o problema. Você deve manter o ciclo rodando de forma autônoma até que a validação passe com sucesso e o fluxo principal seja concluído.
- **Checklist de Qualidade Web (Skills):** O Validator DEVE utilizar as boas práticas de segurança, UX e HTML semântico descritas em [web-best-practices.md](file:///d:/projetos/AgentOrchestrix/skills/web-best-practices.md) como métrica adicional na validação da entrega, alertando sobre qualquer infração crítica encontrada.
