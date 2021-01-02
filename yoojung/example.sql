

CREATE TABLE `author` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `profile` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `perfume` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `brand` varchar(20) NOT NULL,
  `type` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
CREATE TABLE `practice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` FLOAT,
  PRIMARY KEY (`id`)
);
INSERT INTO `practice` VALUES (1,0);
INSERT INTO `practice` VALUES (2,0);
INSERT INTO `practice` VALUES (3,3);
INSERT INTO `practice` VALUES (5,2);
INSERT INTO `practice` VALUES (4,1);

CASE WHEN sum(types_train.Citron) = 0 THEN NULL ELSE sum(rating.score* types_train.Citron)/sum(types_train.Citron) END
CASE WHEN sum(types_train.Floral) = 0 THEN NULL ELSE sum(rating.score* types_train.Floral)/sum(types_train.Floral) END
CASE WHEN sum(types_train.Grapefruit) = 0 THEN NULL ELSE sum(rating.score* types_train.Grapefruit)/sum(types_train.Grapefruit) END
CASE WHEN sum(types_train.Jasmine) = 0 THEN NULL ELSE sum(rating.score* types_train.Jasmine)/sum(types_train.Jasmine) END
CASE WHEN sum(types_train.Musk) = 0 THEN NULL ELSE sum(rating.score* types_train.Musk)/sum(types_train.Musk) END
CASE WHEN sum(types_train.Peony) = 0 THEN NULL ELSE sum(rating.score* types_train.Peony)/sum(types_train.Peony) END
CASE WHEN sum(types_train.Rose) = 0 THEN NULL ELSE sum(rating.score* types_train.Rose)/sum(types_train.Rose) END
CASE WHEN sum(types_train.Spices) = 0 THEN NULL ELSE sum(rating.score* types_train.Spices)/sum(types_train.Spices) END
CASE WHEN sum(types_train.Teakwood) = 0 THEN NULL ELSE sum(rating.score* types_train.Teakwood)/sum(types_train.Teakwood) END
CASE WHEN sum(types_train.Warm) = 0 THEN NULL ELSE sum(rating.score* types_train.Warm)/sum(types_train.Warm) END
CASE WHEN sum(types_train.Woods) = 0 THEN NULL ELSE sum(rating.score* types_train.Woods)/sum(types_train.Woods) END



CREATE TEMPORARY TABLE temp_profile
  SELECT userId, CASE WHEN x= 1 THEN 'Citron' WHEN x= 2 THEN 'Floral' WHEN x= 3 THEN 'Grapefruit' WHEN x= 4 THEN 'Jasmine'
  WHEN x= 5 THEN 'Musk'
  WHEN x= 6 THEN 'Peony'
  WHEN x= 7 THEN 'Rose'
  WHEN x= 8 THEN 'Spices'
  WHEN x= 9 THEN 'Teakwood'
  WHEN x= 10 THEN 'Warm' WHEN x= 11 THEN 'Woods' END PARAMETER, CASE WHEN x =1 THEN Citron WHEN x =2 THEN Floral
  WHEN x =3 THEN Grapefruit
  WHEN x =4 THEN Jasmine
  WHEN x =5 THEN Musk
  WHEN x =6 THEN Peony
  WHEN x =7 THEN Rose
  WHEN x =8 THEN Spices
  WHEN x =9 THEN Teakwood
  WHEN x =10 THEN Warm
  WHEN x =11 THEN Woods
  END VALUE
  FROM(SELECT * FROM user_profile a,(SELECT 1 AS x
  UNION ALL SELECT 2 AS x
  UNION ALL SELECT 3 AS x
  UNION ALL SELECT 4 AS x
  UNION ALL SELECT 5 AS x
  UNION ALL SELECT 6 AS x
  UNION ALL SELECT 7 AS x
  UNION ALL SELECT 8 AS x
  UNION ALL SELECT 9 AS x
  UNION ALL SELECT 10 AS x
  UNION ALL SELECT 11 AS x
  ) b
  ) a
  ORDER BY ID, PARAMETER;

CREATE TABLE bar
  SELECT userId, CASE WHEN x= 1 THEN 'Citron' WHEN x= 2 THEN 'Floral' WHEN x= 3 THEN 'Grapefruit' WHEN x= 4 THEN 'Jasmine'
  WHEN x= 5 THEN 'Musk'
  WHEN x= 6 THEN 'Peony'
  WHEN x= 7 THEN 'Rose'
  WHEN x= 8 THEN 'Spices'
  WHEN x= 9 THEN 'Teakwood'
  WHEN x= 10 THEN 'Warm' WHEN x= 11 THEN 'Woods' END PARAMETER, CASE WHEN x =1 THEN Citron WHEN x =2 THEN Floral
  WHEN x =3 THEN Grapefruit
  WHEN x =4 THEN Jasmine
  WHEN x =5 THEN Musk
  WHEN x =6 THEN Peony
  WHEN x =7 THEN Rose
  WHEN x =8 THEN Spices
  WHEN x =9 THEN Teakwood
  WHEN x =10 THEN Warm
  WHEN x =11 THEN Woods
  END VALUE
  FROM(SELECT * FROM user_profile a,(SELECT 1 AS x
  UNION ALL SELECT 2 AS x
  UNION ALL SELECT 3 AS x
  UNION ALL SELECT 4 AS x
  UNION ALL SELECT 5 AS x
  UNION ALL SELECT 6 AS x
  UNION ALL SELECT 7 AS x
  UNION ALL SELECT 8 AS x
  UNION ALL SELECT 9 AS x
  UNION ALL SELECT 10 AS x
  UNION ALL SELECT 11 AS x
  ) b
  ) a
  ORDER BY ID, PARAMETER;

alter table perfume add(
  `woody` int(11),
  `green` int(11),
  `floral` int(11),
  `citrus` int(11),
  `oriental` int(11),
  `cypre` int(11),
  `herbal` int(11)
);
INSERT INTO `perfume` VALUES (1,'no5_perf','channel','woody|green');
INSERT INTO `perfume` VALUES (2,'topinut_perf','dior','floral|citrus');
INSERT INTO `perfume` VALUES (3,'choppp_perf','tomford','oriental|cypre');
INSERT INTO `perfume` VALUES (4,'blackberry_perf','jomalon','woody|herbal');

CREATE TABLE `rating` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11),
  `perfumeId` int(11),
  `rating` int(11),
  PRIMARY KEY (`id`)
);
UPDATE perfume
SET woody = 1,
  green = 1,
  floral = 0,
  citrus = 0,
  oriental = 0,
  cypre = 0,
  herbal = 0
WHERE id = 1 ;

UPDATE perfume
 SET woody = 0,
  green = 0,
  floral = 1,
  citrus = 1,
  oriental = 0,
  cypre = 0,
  herbal = 0
 WHERE id = 2 ;

 UPDATE perfume SET woody = 0,
   green = 0,
   floral = 0,
   citrus = 0,
   oriental = 1,
   cypre = 1,
   herbal = 0
 WHERE id = 3 ;

 UPDATE perfume SET woody = 1,
   green = 0,
   floral = 0,
   citrus = 0,
   oriental = 0,
   cypre = 0,
   herbal = 1
 WHERE id = 4 ;

CREATE TABLE `survey`(
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `woody` int(11),
  `green` int(11),
  `floral` int(11),
  `citrus` int(11),
  `oriental` int(11),
  `cypre` int(11),
  `herbal` int(11),
  `perfume_id` int(11),
  PRIMARY KEY(`id`)
);

{ '1': '4',
'2': '3',
'3': '4',
'4': '5' }
0|main     | [Object: null prototype]
{ '1': '5',
'2': '3',
'3': '',
'4': '5' }
--
-- Dumping data for table `author`
--

INSERT INTO `author` VALUES (1,'egoing','developer');
INSERT INTO `author` VALUES (2,'duru','database administrator');
INSERT INTO `author` VALUES (3,'taeho','data scientist, developer');

--
-- Table structure for table `topic`
--

CREATE TABLE `topic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  `description` text,
  `created` datetime NOT NULL,
  `author_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

--
-- Dumping data for table `topic`
--

INSERT INTO `topic` VALUES (1,'MySQL','MySQL is...','2018-01-01 12:10:11',1);
INSERT INTO `topic` VALUES (2,'Oracle','Oracle is ...','2018-01-03 13:01:10',1);
INSERT INTO `topic` VALUES (3,'SQL Server','SQL Server is ...','2018-01-20 11:01:10',2);
INSERT INTO `topic` VALUES (4,'PostgreSQL','PostgreSQL is ...','2018-01-23 01:03:03',3);
INSERT INTO `topic` VALUES (5,'MongoDB','MongoDB is ...','2018-01-30 12:31:03',1);
