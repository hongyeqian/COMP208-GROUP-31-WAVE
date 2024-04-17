-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mybatis
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance` (
  `Time` date DEFAULT NULL,
  `DaysOfCheckIn` int DEFAULT NULL,
  `DayOfMaxCheckIn` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES ('2024-04-09',11,20),('2024-04-10',12,20),('2024-04-11',13,20),('2024-04-15',14,20),('2024-04-16',15,20);
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `history`
--

DROP TABLE IF EXISTS `history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `history` (
  `Time` date DEFAULT NULL,
  `TotalFat` float DEFAULT NULL,
  `TotalProtein` float DEFAULT NULL,
  `TotalCarbs` float DEFAULT NULL,
  `TotalConsumption` float DEFAULT NULL,
  `TotalIntake` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history`
--

LOCK TABLES `history` WRITE;
/*!40000 ALTER TABLE `history` DISABLE KEYS */;
INSERT INTO `history` VALUES ('2024-04-14',13.4,20.4,23.1,430,600),('2024-04-15',20,25.3,26.9,300,570),('2024-04-16',28,38.9,32.4,201,680);
/*!40000 ALTER TABLE `history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `Name` varchar(100) NOT NULL,
  `CaloriesPerGram` float NOT NULL,
  `Fat` float NOT NULL,
  `Protein` float NOT NULL,
  `Carbs` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES ('Noodles',1.4,0.01,0.05,0.28),('Bread',2.65,0.03,0.09,0.49),('Corn Tortilla',2.2,0.025,0.05,0.46),('Oatmeal',3.8,0.05,0.03,0.66),('Rye Bread',2.5,0.036,0.08,0.48),('Brown Rice',1.1,0.009,0.025,0.23),('Pasta',1.5,0.02,0.05,0.3),('Pizza Slice',2.8,0.11,0.1,0.33),('Pancake',2.3,0.1,0.06,0.31),('White Rice',1.3,0.003,0.027,0.28),('Apple',0.25,0.002,0.003,0.138),('Banana',0.89,0.003,0.011,0.23),('Strawberry',0.32,0.003,0.007,0.057),('Blueberry',0.57,0.003,0.007,0.145),('Orange',0.47,0.001,0.009,0.12),('Watermelon',0.3,0.002,0.006,0.08),('Grape',0.69,0.002,0.006,0.17),('Peach',0.39,0.003,0.009,0.1),('Pear',0.57,0.001,0.004,0.15),('Pineapple',0.5,0.001,0.005,0.13),('Broccoli',0.34,0.004,0.028,0.07),('Carrot',0.41,0.002,0.009,0.1),('Potato',0.77,0.001,0.02,0.17),('Tomato',0.18,0.002,0.009,0.047),('Cucumber',0.15,0.001,0.0065,0.036),('Lettuce',0.15,0.0015,0.014,0.029),('Spinach',0.23,0.004,0.029,0.036),('Bell Pepper',0.2,0.002,0.01,0.06),('Onion',0.4,0.001,0.011,0.093),('Garlic',1.49,0.005,0.064,0.33),('Chicken Breast',1.65,0.036,0.31,0),('Beef Steak',2.5,0.15,0.26,0),('Pork',2.42,0.21,0.27,0),('Lamb',2.96,0.28,0.25,0),('Duck',3.35,0.28,0.27,0),('Bacon',4.15,0.42,0.37,0.01),('Fish',2.08,0.06,0.2,0),('Shrimp',0.99,0.003,0.24,0.002),('Lobster',0.89,0.006,0.19,0),('Crab',0.9,0.007,0.181,0),('Cola',0.42,0,0,0.106),('Orange Juice',0.45,0.002,0.007,0.1175),('Apple Juice',0.46,0.001,0.001,0.116),('Milk',0.6,0.033,0.032,0.048),('Coffee(black)',0.2,0,0.001,0),('Green Tea',0.2,0,0.002,0),('Beer',0.43,0,0.005,0.036),('Red Wine',0.83,0,0.001,0.026),('White Wine',0.82,0,0.001,0.027),('Mineral Water',0,0,0,0),('Chocolate',5.5,0.31,0.077,0.59),('Ice Cream',2.07,0.11,0.035,0.24),('Cake',3.9,0.15,0.043,0.49),('Cookie',4.8,0.25,0.059,0.64),('Macaron',5,0.17,0.082,0.75),('Candy',3.9,0.002,0,0.82),('Donut',4.5,0.25,0.049,0.51),('Brownie',4.65,0.28,0.042,0.52),('Cupcake',3.85,0.19,0.045,0.46),('Jam',2.9,0,0.004,0.65);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sport`
--

DROP TABLE IF EXISTS `sport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sport` (
  `sportName` varchar(255) DEFAULT NULL,
  `perCalories` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sport`
--

LOCK TABLES `sport` WRITE;
/*!40000 ALTER TABLE `sport` DISABLE KEYS */;
INSERT INTO `sport` VALUES ('Walking',4),('Jogging',10),('Swimming',8),('Cycling',8),('Jump Rope',12),('Aerobic Dance',7),('Stair Climbing',9),('Stepping Machine',9),('Cross-counrty Skiing',10),('Badminton',7),('Weight Lifting',3),('Sprinting',20),('High-Intensity Interval Training (HIIT)',15),('Strength Training',5),('Taekwondo',10),('Boxing',12),('Speed Climbing',8),('Gymnastics',4),('Functional Training',6),('Wrestling',6);
/*!40000 ALTER TABLE `sport` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tmp_foodlist`
--

DROP TABLE IF EXISTS `tmp_foodlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_foodlist` (
  `foodName` varchar(200) DEFAULT NULL,
  `weight` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tmp_foodlist`
--

LOCK TABLES `tmp_foodlist` WRITE;
/*!40000 ALTER TABLE `tmp_foodlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `tmp_foodlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tmp_sportlist`
--

DROP TABLE IF EXISTS `tmp_sportlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_sportlist` (
  `sportName` varchar(200) DEFAULT NULL,
  `sportTime` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tmp_sportlist`
--

LOCK TABLES `tmp_sportlist` WRITE;
/*!40000 ALTER TABLE `tmp_sportlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `tmp_sportlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `UserId` int NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Gender` varchar(10) NOT NULL,
  `Age` int NOT NULL,
  `Height` float NOT NULL,
  `Weight` float NOT NULL,
  `BMI` float NOT NULL,
  `BMR` float DEFAULT NULL,
  `ActivityLevel` int DEFAULT NULL,
  `IsVegetarian` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`UserId`),
  CONSTRAINT `user_chk_1` CHECK ((`Gender` in (_utf8mb4'Female',_utf8mb4'Male',_utf8mb4'Other')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'New User','Male',0,0,0,0,0,1,'N');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-17 14:53:55
