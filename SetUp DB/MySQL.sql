CREATE DATABASE  IF NOT EXISTS `cloudbase` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `cloudbase`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: cloudbase
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bills`
--

DROP TABLE IF EXISTS `bills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bills` (
  `bid` int unsigned NOT NULL AUTO_INCREMENT,
  `uid` int unsigned NOT NULL,
  `status` enum('Waiting','Succeed','Canceled') NOT NULL,
  PRIMARY KEY (`bid`),
  KEY `fk_bill_users_idx` (`uid`),
  CONSTRAINT `fk_bill_users` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bills`
--

LOCK TABLES `bills` WRITE;
/*!40000 ALTER TABLE `bills` DISABLE KEYS */;
/*!40000 ALTER TABLE `bills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bills_detail`
--

DROP TABLE IF EXISTS `bills_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bills_detail` (
  `bid` int unsigned NOT NULL,
  `pid` int unsigned NOT NULL,
  `quantity` int NOT NULL,
  KEY `fk_billDetail_bills_idx` (`bid`),
  CONSTRAINT `fk_billDetail_bills` FOREIGN KEY (`bid`) REFERENCES `bills` (`bid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bills_detail`
--

LOCK TABLES `bills_detail` WRITE;
/*!40000 ALTER TABLE `bills_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `bills_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `pid` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `brand` varchar(45) DEFAULT NULL,
  `price` int NOT NULL,
  `image` varchar(255) NOT NULL,
  `quantity` int NOT NULL,
  `bestsell` tinyint NOT NULL,
  PRIMARY KEY (`pid`),
  UNIQUE KEY `pid_UNIQUE` (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'น้ำตาล','มิตรผล',29,'https://aumento.officemate.co.th/media/catalog/product/0/0/0070100.jpg?imwidth=640',7,1),(2,'น้ำมันพืช','มรกต',65,'https://cf.shopee.co.th/file/4bc27c8b886b0a00dadf900878c27cd7_tn',4,0),(3,'น้ำจิ้มสุกี้','พันท้าย',54,'https://backend.tops.co.th/media/catalog/product/8/8/8850058003346_1.jpg',7,1),(4,'ผงชูรส','ถ้วยแดง',98,'https://ocs-k8s-prod.s3-ap-southeast-1.amazonaws.com/UPLOAD11052020/844191.jpg',6,0),(5,'ข้าวหอมมะลิ','ฉัตร',55,'https://static.bigc.co.th/media/catalog/product/cache/2/image/17f82f742ffe127f42dca9de82fb58b1/8/8/8858868801107_2.jpg',8,0),(6,'แป้งทอดกรอบ','ยูเอฟเอ็ม',35,'https://inwfile.com/s-dc/v7srnp.jpg',5,0),(7,'ผงซักฟอก','โอโม',48,'https://aumento.officemate.co.th/media/catalog/product/6/0/60211166.jpg?imwidth=640',5,0),(8,'น้ำยาล้างจาน','ซันไลต์',36,'https://www.goodchoiz.com/content/images/thumbs/0034443_%E0%B9%89%E0%B8%B3%E0%B9%89-%E0%B8%B4%E0%B8%B8%E0%B8%B4-%E0%B8%B1%E0%B9%8C-550-_550.jpeg',4,1),(9,'ยาสีฟัน','Dentiste',130,'https://www.dentiste-oralcare.com/wp-content/uploads/2020/10/14.png',10,0),(10,'สบู่','Protex',20,'https://api.watsons.co.th/medias/prd-side-207119.jpg?context=bWFzdGVyfGltYWdlc3w0MDg1ODd8aW1hZ2UvanBlZ3xoNzcvaGJkLzEwNTAyODAwNTM5Njc4L1dUQ1RILTIwNzExOS1zaWRlLmpwZ3w0MmYwNmY3ZWM5N2E1YmRjNTA4MjRhZGM0OTg2OGI2MWI1Mjg0MjRiNWI2MjYzZTk2ZTM2ZTljOTMwZTcxMWUz',4,1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tokens` (
  `tid` int unsigned NOT NULL AUTO_INCREMENT,
  `uid` int unsigned NOT NULL,
  `token` varchar(100) NOT NULL,
  PRIMARY KEY (`tid`),
  UNIQUE KEY `token_UNIQUE` (`token`),
  KEY `fk_tokens_users_idx` (`uid`),
  CONSTRAINT `fk_tokens_users` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
INSERT INTO `tokens` VALUES (1,1,'@HvkYP-wv5Gh6vUnsHlFsDyu0STFB91Sp9TxlxrQG1yyIXPuIs!gdnql^wZBET@H2JnKFHl2K!aog@*CToRt!DF@IXUlpyNNCgz#'),(2,2,'eO=4@kJ6dTHHTmQ5cs#QKIH3cp53QsCxYBQveVY**crdfEL$8Yh9eZMU6=@mLnVV#ddYffiDSux*1D8G#Flpyczvj#PH4ydsk3DR');
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `uid` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('Admin','Customer') NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `mobile` varchar(10) DEFAULT NULL,
  `join_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uid_UNIQUE` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','$2b$05$ZuF5bL8EVjt8XgfCnWTsCeWQq0hp.UkjG3t9jf2CXC1u7RTw4zpY2','Admin','Admin','Role','admin@hotmail.com','0999999999','2022-05-16 07:31:40'),(2,'customer','$2b$05$NLb.RZAo8YYo.rnDtfTTCeuaaNFtaqfydNHazWNU8Ranfd2zR/V5.','Customer','Customer2','Role2','customer2@hotmail.com','0111111111','2022-05-18 18:04:15');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-22 15:48:02
