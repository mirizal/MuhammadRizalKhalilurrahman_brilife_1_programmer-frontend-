CREATE DATABASE  IF NOT EXISTS `db_keluarga_berencana` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_keluarga_berencana`;
-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db_keluarga_berencana
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `list_kontrasepsi`
--

DROP TABLE IF EXISTS `list_kontrasepsi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `list_kontrasepsi` (
  `id_Kontrasepsi` int NOT NULL AUTO_INCREMENT,
  `Nama_Kontrasepsi` varchar(100) NOT NULL,
  PRIMARY KEY (`id_Kontrasepsi`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list_kontrasepsi`
--

LOCK TABLES `list_kontrasepsi` WRITE;
/*!40000 ALTER TABLE `list_kontrasepsi` DISABLE KEYS */;
INSERT INTO `list_kontrasepsi` VALUES (1,'Pil'),(2,'Kondom'),(3,'IUD');
/*!40000 ALTER TABLE `list_kontrasepsi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `list_pemakai_kontrasepsi`
--

DROP TABLE IF EXISTS `list_pemakai_kontrasepsi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `list_pemakai_kontrasepsi` (
  `id_List` int NOT NULL AUTO_INCREMENT,
  `id_Propinsi` int NOT NULL,
  `id_Kontrasepsi` int NOT NULL,
  `Jumlah_Pemakaian` int DEFAULT NULL,
  PRIMARY KEY (`id_List`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list_pemakai_kontrasepsi`
--

LOCK TABLES `list_pemakai_kontrasepsi` WRITE;
/*!40000 ALTER TABLE `list_pemakai_kontrasepsi` DISABLE KEYS */;
INSERT INTO `list_pemakai_kontrasepsi` VALUES (1,1,1,41),(2,6,2,1326),(3,3,2,40),(4,9,1,2),(5,2,2,2),(6,2,1,1);
/*!40000 ALTER TABLE `list_pemakai_kontrasepsi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `list_propinsi`
--

DROP TABLE IF EXISTS `list_propinsi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `list_propinsi` (
  `id_Propinsi` int NOT NULL AUTO_INCREMENT,
  `Nama_Propinsi` varchar(100) NOT NULL,
  PRIMARY KEY (`id_Propinsi`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list_propinsi`
--

LOCK TABLES `list_propinsi` WRITE;
/*!40000 ALTER TABLE `list_propinsi` DISABLE KEYS */;
INSERT INTO `list_propinsi` VALUES (1,'Aceh'),(2,'Sumatera Utara'),(3,'Sumatera Barat'),(4,'Riau'),(5,'Kepulauan Riau'),(6,'Jambi'),(7,'Bangka Belitung'),(8,'Sumatera Selatan'),(9,'Lampung');
/*!40000 ALTER TABLE `list_propinsi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'db_keluarga_berencana'
--

--
-- Dumping routines for database 'db_keluarga_berencana'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-20 23:40:31
