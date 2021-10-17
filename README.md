# **Vítor César Lulio - Kabum 2021**

<img src="public/img/capa-readme-kabum.png" alt="Kabum 2021">

> Área administrativa onde o(s) usuário(s) pode acessar através de login e senha.

<details>
  <summary>Índice</summary>
  <ol>
    <li><a href="#projeto">Projeto</a></li>
    <li>
      <a href="#comecando">Começando</a>
      <ul>
        <li><a href="#pre-requisitos">Pré-requisitos</a></li>
        <li><a href="#instalacao">Instalando Kabum-2021</a></li>
        <ul>
        <li><a href="#instalacao">Windows</a></li>
        </ul>
      </ul>
    </li>
    <li><a href="#usando">Usando Kabum-2021</a></li>
    <li><a href="#roadmap">Colaboradores</a></li>
    <li><a href="#contributing">Licença</a></li>
    <li><a href="#license">Contato</a></li>
    <li><a href="#contact">Agradecimentos</a></li>
  </ol>
</details>

<p align="center">
  <a href="ALTERAR">Explore os documentos</a>
  ·
  <a href="ALTERAR">Ver demonstração</a>
  ·
  <a href="https://github.com/vitorcesarlulio/kabum-2021/issues">Reportar bug</a>
  ·
  <a href="malito:vitorcesarlulio@hotmail.com">Solicitar recurso</a>
</p>

## **Projeto**

O projeto conta com algumas funcionalidades referentes a segurança:

- [x] Controle de permissões
- [x] Controle de inatividade (Time Out)
- [x] Controle de tentativas no login
- [x] Função "Lembre-me" no login
- [x] Criptografia de senhas
- [x] Controle contra SQL-Injection
- [ ] Aprimorar Cookies
- [ ] Google Authenticator
- [ ] Melhorias OO (Orientação Obejetos)
- [ ] Ordenação DataTable
- [ ] Properties para labels

## **Começando**

### **Pré-requisitos**

Antes de começar, verifique se você atendeu aos seguintes requisitos:

* [PHP](https://www.php.net/)
  - Versão de desenvimento: 7.4.4;
  - Obrigatorio.
* [Composer](https://getcomposer.org/)
  - Utilizado para dependências do projeto desenvolvidas por terceiros como *blade* e *plug-route*;
  - Opcional.
* [Servidor Web](https://httpd.apache.org/) 
   - Pode ser utilizado servidor Web [Xammp](https://www.apachefriends.org/pt_br/index.html) que já embuti o PHP, Apache e MySQL, [Lamp](https://bitnami.com/stack/lamp/installer) ou [Wamp](https://www.wampserver.com/en/);
   - Obrigatorio.
* [MySQL](https://www.mysql.com/)
  - Versão de desenvolvimento: 10.4.13;
  - Obrigatório.
* [Git](https://git-scm.com/)
  - Opcional.

### **Instalando Kabum-2021**
Para instalar o Kabum-2021, siga estas etapas:
### Windows:
- Certifique-se que seguiu as instruções dos tópicos <a href="#pre-requisitos">Pré-requisitos</a>
- No arquivo httpd.conf realizar os seguintes passos:
  - Geralmente localizado em `C:\Apache24\conf\httpd.conf` ou `C:\xampp\apache\conf\httpd.conf`;
  - Remova o `#` na linha `LoadModule rewrite_module modules/mod_rewrite.so`.

- No arquivo httpd-vhosts.conf realize os seguintes passos:
  - Geralmente localizado em `C:\Apache24\conf\extra\httpd-vhosts.conf` ou `C:\xampp\apache\conf\extra\httpd-vhosts.conf`. Insira o trecho de código abaixo que criará um servidor virtual para aplicação (obrigatorio).
```
<VirtualHost *:80>  
	# Indeferi
	ServerAdmin webmaster@local.kabum-2021.com
	
	# Se baseie na localização da pasta /public/ onde se localiza o index.html
    DocumentRoot "C:/xampp/htdocs/kabum-2021/public/"
	
	# Serve apenas como alias para acesso ao módulo
    ServerName local.kabum-2021
    ServerAlias local.kabum-2021
	
	# Parametrizações de logs
    ErrorLog "logs/local.kabum-2021-error.log"
    CustomLog "logs/local.kabum-2021-access.log" common
	
	# Parâmetros para questão de permissão (importante)
	<Directory "C:/xampp/htdocs/kabum-2021/public/">
		AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

- Vá até o arquivo de hosts do Windows, geralmente localizado em `C:\Windows\System32\drivers\etc\hosts`. Obs.: é necessário editar o arquivo `hosts` com privilégios de administrador. Insira o trecho de código abaixo refere-se ao atributo `ServerName` e `ServerAlias` do arquivo `httpd-vhosts.conf` e é necessário para acessar em seu navegador de preferência a aplicação.
```	
127.0.0.1   localhost
127.0.0.1   local.kabum-2021
```

- Em seu editor SQL de preferência, importe o arquivo `database-kabum-2021.sql` localizado na pasta `kabum-2021/public/`.

- Verifique se a pasta `cache` é existente na estrutura `/app/View/`.

- Vá até o arquivo `config.php` localizado em `/config/`
  - Altere os dados da seção `Acesso ao banco de dados`, informando o Host de conexão, porta, nome do banco de dados, usuário e senha.

- No arquivo php.ini pode ser necessario realizar os seguintes passos:
  - Geralmente localizado em `C:\xampp\php\php.ini` ou `C:\php\php.ini`;
  - Remova o `;` na linha `extension=pdo_mysql`;
  - Remova o `;` na linha `extension=php_pdo.dll`;
  - Remova o `;` na linha `extension=php_pdo_mysql.dll`;
  - Remova o `;` na linha `extension=php_pdo_pgsql.dll`;
  - Remova o `;` na linha `extension=php_pdo_sqlite.dll`;
  - Remova o `;` na linha `extension=mysqli`.

## **Usando Kabum-2021**

Para usar Kabum-2021, siga estas etapas:

- Certifique-se que seguiu as instruções dos tópicos <a href="#pre-requisitos">Pré-requisitos</a> e <a href="#instalacao">Instalando Kabum-2021</a>
 - Acesse em seu navegador de preferência o endereço: http://local.kabum-2021/ ou http://localhost/
 - Entre com usuário **ROOT** e senha **root@123**

## **Colaboradores**
  Agradecemos   às seguintes pessoas que contribuíram para este projeto:

  <table>
    <tr>
      <td align="center">
        <a href="https://www.linkedin.com/in/vitor-cesar-lulio/">
          <img src="https://media-exp1.licdn.com/dms/image/C4E03AQE-Cj9mvSwupA/profile-displayphoto-shrink_200_200/0/1596294499712?e=1639612800&v=beta&t=HAQTDRVeGz11cO5_Hp2mOolx2JoynhyqCrGtp9dUMMA" width="100px;" alt="Foto - Vítor César Lulio"/><br>
          <sub>
            <b>Vítor César Lulio</b>
          </sub>
        </a>
      </td>
      <td align="center">
        <a href="https://www.kabum.com.br/">
          <img src="public/img/kabum-logo-150x150.png" width="100px;" alt="Foto - Kabum"/><br>
          <sub>
            <b>KaBum!</b>
          </sub>
        </a>
      </td>
    </tr>
  </table>

## **Licença**
  Esse projeto está sob licença MIT. Veja o arquivo [LICENÇA](LICENSE.md) para mais detalhes.

## **Contato**
  <a href="https://www.linkedin.com/in/vitor-cesar-lulio/">
    <img align="left" alt="Vitor Cesar Lulio - Linkdein" width="40px" src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/linkedin.svg" />
  </a>
  <a href="https://github.com/vitorcesarlulio">
    <img align="left" alt="Vitor Cesar Lulio - Github" width="40px" src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/github.svg" />
  </a>  
  <a href="https://www.youtube.com/channel/UC8gstlxBhvKSsMVnEQhb8Cg?view_as=subscriber">
    <img align="left" alt="Vitor Cesar Lulio - YouTube" width="40px" src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/youtube.svg" /> 
  </a>
  <a href="https://mailto:vitorcesarlulio@hotmail.com">
  <img align="left" alt="Vitor Cesar Lulio - Outlook" width="40px" src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/microsoftoutlook.svg" />
  </a>

  <br>
  <br>

## **Agradecimentos**
  Recursos considerados úteis e aos quais gostaria de dar crédito. Incluí alguns dos meus favoritos para dar o pontapé inicial!

  - [Alura](https://www.alura.com.br/artigos/quando-usar-ou-em-php)
  - [Blade](https://github.com/jenssegers/blade)
  - [Código Fonte TV](https://www.youtube.com/c/codigofontetv)
  - [FullCycle](https://www.youtube.com/FullCycle)
  - [JavaScript Brasil](https://t.me/javascriptbr)
  - [Node Studio Treinamentos](https://www.youtube.com/channel/UCZZ0NTtOgsLIT4Skr6GUpAw)
    - https://www.youtube.com/watch?v=Yt35H_zinTk
    - https://www.youtube.com/watch?v=F1bLyT55BWM
    - https://www.youtube.com/watch?v=L1wqfXv-lAo 
  - [PHP](https://www.php.net/manual/pt_BR/)
  - [PHP Brasil](https://t.me/phpbrasil)
  - [Plug-Route](https://github.com/erandirjunior/plug-route)
  - [UpInside](https://www.youtube.com/UpInsideBr)
  - [Webdesign em Foco](https://www.youtube.com/WebdesignemFocoBrasil)








[⬆ Voltar ao topo](#kabum-2021)
