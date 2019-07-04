create database if not exists `myMysql`;

use `myMysql`;

#用户表
CREATE TABLE if not exists `user` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `userName` VARCHAR(255) NOT NULL COMMENT '用户名',
  `password` VARCHAR(255) NOT NULL COMMENT '密码',
  `nickName` VARCHAR(255) NULL COMMENT '昵称',
  `description` LONGTEXT NULL COMMENT '描述',
  `token` LONGTEXT NULL,
  `createTime` VARCHAR(20) NULL COMMENT '创建时间',
  `modifiedTime` VARCHAR(20) NULL COMMENT '修改时间',
  `roles` VARCHAR(255) NULL COMMENT '权限级别',
  `active` INT NOT NULL COMMENT '是否是激活状态 0 是 1 否',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `userName_UNIQUE` (`userName` ASC) VISIBLE)
COMMENT = '用户表';
INSERT INTO `user` (`userName`, `password`, `nickName`, `description`, `createTime`, `modifiedTime`, `roles`, `active`) VALUES ('admin001', '111111', '管理员', '管理员的描述', '1551256596246', '1551256596246', '1', 0);
INSERT INTO `user` (`userName`, `password`, `nickName`, `description`, `createTime`, `modifiedTime`, `roles`, `active`) VALUES ('a1', '111111', 'user', 'test user', '1551256596246', '1551256596246', '2', 0);

