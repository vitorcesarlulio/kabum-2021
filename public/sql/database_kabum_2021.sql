CREATE DATABASE IF NOT EXISTS database_kabum_2021 CHARACTER SET = 'utf8mb4' COLLATE = 'utf8mb4_general_ci';

CREATE TABLE `tb_pessoas` (
  `pess_codigo` int(11) NOT NULL AUTO_INCREMENT,
  `pess_tipo` varchar(11) DEFAULT NULL,
  `pess_classificacao` char(1) DEFAULT NULL,
  `pess_nome` varchar(30) DEFAULT NULL,
  `pess_razao_social` varchar(80) DEFAULT NULL,
  `pess_sobrenome` varchar(30) DEFAULT NULL,
  `pess_nome_fantasia` varchar(80) DEFAULT NULL,
  `pess_cpfcnpj` varchar(16) DEFAULT NULL,
  `pess_cep` varchar(8) DEFAULT NULL,
  `pess_logradouro` varchar(80) DEFAULT NULL,
  `pess_log_numero` varchar(20) DEFAULT NULL,
  `pess_bairro` varchar(50) DEFAULT NULL,
  `pess_cidade` varchar(50) DEFAULT NULL,
  `pess_estado` char(2) DEFAULT NULL,
  `pess_edificio` varchar(80) DEFAULT NULL,
  `pess_bloco` varchar(30) DEFAULT NULL,
  `pess_apartamento` varchar(10) DEFAULT NULL,
  `pess_logradouro_condominio` varchar(80) DEFAULT NULL,
  `pess_observacao` varchar(510) DEFAULT NULL,
  `pess_data_cadastro` timestamp(2) NULL DEFAULT current_timestamp(2),
  PRIMARY KEY (`pess_codigo`),
  UNIQUE KEY `pess_cpfcnpj` (`pess_cpfcnpj`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tb_contatos` (
  `cont_codigo` int(11) NOT NULL AUTO_INCREMENT,
  `cont_tipo` varchar(30) NOT NULL,
  `cont_responsavel` varchar(30) NOT NULL,
  `cont_contato` varchar(80) NOT NULL,
  `pess_codigo` int(11) NOT NULL,
  PRIMARY KEY (`cont_codigo`),
  KEY `fk_tb_contatos` (`pess_codigo`),
  CONSTRAINT `fk_tb_contatos` FOREIGN KEY (`pess_codigo`) REFERENCES `tb_pessoas` (`pess_codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


CREATE TABLE `tb_tentativas` (
  `ten_id` int(11) NOT NULL AUTO_INCREMENT,
  `ten_ip` varchar(32) NOT NULL,
  `ten_data` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`ten_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tb_usuarios` (
  `usu_codigo` int(11) NOT NULL AUTO_INCREMENT,
  `usu_login` varchar(45) NOT NULL,
  `usu_senha` varchar(90) NOT NULL,
  `usu_data_cadastro` timestamp(2) NOT NULL DEFAULT current_timestamp(2),
  `usu_nome` varchar(80) DEFAULT NULL,
  `usu_sobrenome` varchar(80) DEFAULT NULL,
  `usu_permissoes` varchar(20) NOT NULL,
  `usu_status` char(1) NOT NULL,
  PRIMARY KEY (`usu_codigo`),
  UNIQUE KEY `usu_login` (`usu_login`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

INSERT INTO `tb_usuarios` (`usu_codigo`,`usu_login`,`usu_senha`,`usu_data_cadastro`,`usu_nome`,`usu_sobrenome`,`usu_permissoes`,`usu_status`) VALUES (1,'ROOT','$2y$10$QMPAYxNQdz2rSwCDiDBm2.EgMmSUZwvBwgLoBLjVZ617Z3z2BYbC2','2020-11-06 21:36:00.71','Administrador','do Sistema','admin','A');