# Gerenciador de Jogos - Lista e Progresso

Este projeto foi desenvolvido com **React** como uma ferramenta pessoal para organizar e acompanhar os jogos que eu já joguei, os que completei e os que ainda preciso terminar. A ideia por trás deste site é ajudar na organização e manter o foco nos jogos que ainda não foram zerados, criando uma forma simples e intuitiva de acompanhar o progresso.

Usei o site **[Backloggd](https://backloggd.com/)** como inspiração para a estrutura e funcionalidade da aplicação, pois é uma plataforma excelente para acompanhar jogos, e queria recriar algo simples e útil para mim.

## Funcionalidades

- **Carregamento de Dados de uma Planilha Excel**: Os dados dos jogos são carregados a partir de uma planilha Excel hospedada remotamente.
- **Filtros Dinâmicos**: Permite filtrar por várias categorias, como:
  - **Nome**: Ordenação alfabética (A a Z ou Z a A)
  - **Plataforma**: Steam, PlayStation, Xbox, entre outras.
  - **Status**: Platinado, Zerado, Incompleto.
  - **Objetivo**: Zerar, Completar, Platinar, etc.
- **Visualização de Progresso**: Acompanhamento do progresso de cada jogo, com ícones representando as plataformas.
- **Modal de Filtros**: Interface intuitiva para aplicar filtros de maneira rápida e fácil.
- **Responsividade**: A aplicação é responsiva e funciona bem tanto em dispositivos móveis quanto desktops.

## Acesse o Projeto

O projeto está hospedado no Netlify. Clique no link abaixo para acessar a aplicação diretamente:

[Visite o Gerenciador de Jogos](https://gametrackerzile.netlify.app/)

## Tecnologias Usadas

- **React**: Biblioteca JavaScript para a construção da interface interativa.
- **FontAwesome**: Usado para adicionar ícones representando diferentes plataformas.
- **XLSX.js**: Biblioteca para ler e manipular dados de planilhas Excel.
- **Python**: Para desenvolvimento de uma aplicação que facilita a atualização da planilha, permitindo a adição automática de novos jogos.
- **CSS**: Estilização personalizada para a interface do usuário.
- **GitHub**: As imagens dos jogos e a planilha Excel estão hospedadas em repositórios do GitHub, permitindo que a aplicação consuma e filtre os dados diretamente a partir dessas fontes.

## Funcionalidades Futuras

- **Armazenamento de Progresso**: Um dia, planejo adicionar uma funcionalidade para salvar e recuperar o progresso dos jogos diretamente na aplicação, sem depender da planilha externa.
- **Edição Direta no Site**: Futuramente, quero permitir que os usuários (ou eu, no caso) possam adicionar e remover informações dos jogos diretamente pelo site, sem precisar editar a planilha manualmente.
- **Metas de Conclusão**: Implementar um sistema de metas para incentivar a conclusão dos jogos, como desafios de progresso e marcos.
- **Notificações de Compras/Assinaturas**: Alerta para evitar a compra de novos jogos enquanto ainda existem jogos não concluídos.
- **Aplicação Python para Atualização da Planilha**: Atualmente, estou desenvolvendo uma aplicação em **Python** para facilitar a atualização da planilha de maneira mais prática. Com essa aplicação, será possível adicionar novos jogos à lista, e eles serão automaticamente inseridos na planilha Excel. Isso permitirá que o site seja automaticamente atualizado sempre que a planilha for modificada, sem a necessidade de editar a planilha manualmente.

---

**Dica**: Use os filtros para focar nos jogos que você ainda não completou. A aplicação foi feita para te ajudar a manter o foco e evitar adicionar mais jogos à sua coleção enquanto ainda há títulos para terminar. 😉
