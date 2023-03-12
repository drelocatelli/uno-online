# Uno-Online

<!---Esses são exemplos. Veja https://shields.io para outras pessoas ou para personalizar este conjunto de escudos. Você pode querer incluir dependências, status do projeto e informações de licença aqui--->

<!-- ![GitHub repo size](https://img.shields.io/github/repo-size/iuricode/README-template?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/iuricode/README-template?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/iuricode/README-template?style=for-the-badge)
![Bitbucket open issues](https://img.shields.io/bitbucket/issues/iuricode/README-template?style=for-the-badge)
![Bitbucket open pull requests](https://img.shields.io/bitbucket/pr-raw/iuricode/README-template?style=for-the-badge) -->

<img style="width: 100%; border-radius: 10px; margin: 10px 0;" src="capa.jpg"
alt="Capa do UNO">

> Uno Online para se divertir com os amigos.

Tabela de conteúdos
=================
<!--ts-->
* [Sobre](#sobre)
* [Tabela de Conteudo](#tabela-de-conteudo)
* [Ajustes e Melhorias](#ajustes-e-melhorias)
* [Documentação Server Side](#documentação-server-side)
* [Pré Requisitos](#pré-requisitos)
* [Instalando Uno Online](#instalando-uno-online)
* [Usando Uno Online](#usando-uno-online-e-jogando-com-amigos)
* [Contribuindo](#contribuindo-para-uno-online)
* [Colaboradores](#colaboradores)
* [Licença](#licença)
<!--te-->  

## 🔧 Ajustes e melhorias

O projeto ainda está em desenvolvimento e as próximas atualizações serão voltadas nas seguintes tarefas:

- [x] Tarefa 1

## 📚 Documentação do server-side
[Ler documentação](https://free-borogovia-69a.notion.site/Uno-Online-server-docs-978b591e1aec4cb8816c0209e91c217d)

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- [Docker](https://www.docker.com/) 
- [Docker-compose](https://docs.docker.com/compose/install/)

Importante⚠️: Dentro das pastas `server` e `client`, copie o conteúdo do arquivo `.env.example` e crie um arquivo `.env` com o conteúdo copiado.

## 🚀 Instalando Uno Online

1. Acesse a pasta do projeto.
2. Execute o comando abaixo para subir a máquina:

```bash
docker-compose up
``` 

## ☕ Usando Uno Online e Jogando com amigos!

### 🎮 Jogando com amigos [método 1]

- Para convidar seus amigos para jogar, você precisará abrir a DMZ (conhecido também como abrir portas) do seu roteador.
- Após isso, acesse esse site e copie o endereço de IP Público: https://meuip.com.br/
- Copie o IP e adicione a porta nele, por exemplo:
```
127.0.0.1:PORTA
```
- Agora, basta enviar o link para seus amigos e começar a jogar!

### 🎮 Jogando com amigos [método 2]

- Esse projeto tem um recurso chamado **ngrok** que permite que você crie um link público para jogar com seus amigos.
- Para isso, basta acessar o site https://ngrok.com/ e criar uma conta.
- Após criar a conta, copie o token e preencha `AUTH_TOKEN=` dentro do arquivo `/client/.env`.
- Agora, basta executar o comando abaixo para subir o projeto com as configurações do ngrok:

```bash
docker-compose --env-file=client/.env up
```

- O link que você vai enviar para seu amigos você pegará em: [localhost:4551](http://localhost:4551)
- Obs: Envie para seu amigo o link em **http** e não em https.

## 📫 Contribuindo para Uno Online

<!---Se o seu README for longo ou se você tiver algum processo ou etapas específicas que deseja que os contribuidores sigam, considere a criação de um arquivo CONTRIBUTING.md separado--->

Para contribuir com Uno Online, siga estas etapas:

1. Bifurque este repositório.
2. Crie um branch: `git checkout -b <nome_branch>`.
3. Faça suas alterações e confirme-as: `git commit -m '<mensagem_commit>'`
4. Envie para o branch original: `git push origin uno-online / <local>`
5. Crie a solicitação de pull.

Como alternativa, consulte a documentação do GitHub em [como criar uma solicitação pull](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## 🤝 Colaboradores

Agradecemos às seguintes pessoas que contribuíram para este projeto:

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/32282846?v=4" width="100px;" alt="Foto da 4ndr3224 no GitHub"/><br>
        <sub>
          <b>4ndr3224</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/66280834?v=4" width="100px;" alt="Foto do Guilherme S. no GitHub" /><br>
        <sub>
          <b>Guilherme S. Barros</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE.md) para mais detalhes.

[⬆ Voltar ao topo](#Uno-Online)<br>
