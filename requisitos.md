# Casa Arrumada — Documentação de Requisitos

## Visão Geral
O Casa Arrumada é um web app responsivo desenvolvido com Angular (frontend), NestJS (backend) e PostgreSQL (banco de dados), com o objetivo de organizar e distribuir tarefas domésticas entre residentes de uma casa.

O sistema busca reduzir conflitos, equilibrar responsabilidades e incentivar a colaboração por meio de gamificação e classificação de desempenho.

---

# 1. Requisitos Funcionais

## Autenticação
- RF01: O sistema deve permitir cadastro de usuários.
- RF02: O sistema deve permitir login de usuários autenticados.
- RF03: O sistema deve manter sessão ativa do usuário.

## Gestão de Tarefas
- RF04: O sistema deve listar todas as tarefas domésticas disponíveis.
- RF05: O sistema deve permitir que um usuário assuma uma tarefa.
- RF06: O sistema deve exibir o responsável por cada tarefa.
- RF07: O sistema deve permitir marcar tarefas como concluídas.

## Gamificação e Desempenho
- RF08: O sistema deve atribuir pontos ao usuário ao concluir tarefas.
- RF09: O sistema deve exibir ranking de desempenho entre os residentes.
- RF10: O sistema deve exibir histórico de tarefas realizadas por usuário.

## Organização Inteligente
- RF11: O sistema deve ordenar tarefas por prioridade.
- RF12: O sistema deve destacar tarefas críticas (ex: lavar louça).

---

# 2. Requisitos Não Funcionais

## Tecnológicos
- RNF01: O frontend deve ser desenvolvido em Angular.
- RNF02: O backend deve ser desenvolvido em NestJS.
- RNF03: O banco de dados deve ser PostgreSQL.

## Usabilidade
- RNF04: O sistema deve ser responsivo (mobile e desktop).
- RNF05: A interface deve ser simples e intuitiva.

## Performance
- RNF06: O tempo de resposta das requisições deve ser inferior a 2 segundos.
- RNF07: O sistema deve suportar múltiplos usuários simultâneos.

## Segurança
- RNF08: As senhas devem ser armazenadas de forma criptografada.
- RNF09: O sistema deve utilizar autenticação via token (JWT).

## Manutenibilidade
- RNF10: O código deve seguir boas práticas e arquitetura modular.
- RNF11: O sistema deve permitir fácil expansão de funcionalidades.

---

# 3. Regras de Negócio

## Distribuição de Tarefas
- RN01: Uma tarefa só pode ter um responsável por vez.
- RN02: Um usuário pode assumir múltiplas tarefas, mas o sistema deve incentivar equilíbrio.

## Prioridade (Foco na Louça)
- RN03: A tarefa lavar louça deve ter prioridade alta.
- RN04: Tarefas prioritárias devem aparecer no topo da lista.

## Pontuação
- RN05: Cada tarefa concluída gera pontos.
- RN06: Tarefas mais críticas (ex: louça) geram mais pontos.
- RN07: O ranking deve ser atualizado automaticamente.

## Histórico
- RN08: Todas as tarefas concluídas devem ser registradas no histórico do usuário.

## Conflitos
- RN09: Um usuário não pode assumir uma tarefa já atribuída.
- RN10: O sistema deve evitar sobrecarga de um único usuário (regra futura de balanceamento).

---

# 4. Etapas de Desenvolvimento (Roadmap)

## Etapa 1 — MVP (Base do Sistema)
Objetivo: Criar o fluxo principal funcional.

### Backend
- Estrutura inicial do NestJS
- Entidades: User, Task
- CRUD básico de usuários e tarefas
- Autenticação (JWT)

### Frontend
- Tela de login e cadastro
- Dashboard com lista de tarefas
- Atribuição e conclusão de tarefas

---

## Etapa 2 — Organização e Controle
Objetivo: Melhorar visibilidade e organização.

### Backend
- Adicionar prioridade nas tarefas
- Implementar histórico de tarefas
- Melhorar regras de atribuição

### Frontend
- Ordenação de tarefas por prioridade
- Tela de histórico
- Melhor feedback visual de status

---

## Etapa 3 — Gamificação e Engajamento
Objetivo: Incentivar uso e equilíbrio.

### Backend
- Sistema de pontuação
- Ranking de usuários
- Regras de pontuação por tipo de tarefa

### Frontend
- Tela de ranking
- Exibição de pontos
- Indicadores de desempenho

---

# Considerações Finais
O sistema Casa Arrumada propõe uma solução simples e eficaz para um problema cotidiano, utilizando tecnologia e gamificação para promover colaboração, justiça e organização no ambiente doméstico.