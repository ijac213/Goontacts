USE [master]
GO

/****** Object:  Database [GoontactDb]    Script Date: 11/14/2021 4:55:33 PM ******/
CREATE DATABASE [GoontactDb]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'GoontactDb', filename=N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\GoontactDb.mdf')
 LOG ON 
( NAME = N'GoontactDb_log',filename=N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\GoontactDb_log.ldf')
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO

USE [GoontactDb]
GO

/****** Object:  Table [dbo].[Person]    Script Date: 11/14/2021 5:03:17 PM ******/
CREATE TABLE [dbo].[Person](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[LastName] [nvarchar](50) NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_People] PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

ALTER TABLE [dbo].[Person] ADD  CONSTRAINT [DF_People_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

/****** Object:  Table [dbo].[Email]    Script Date: 11/14/2021 5:07:05 PM ******/
CREATE TABLE [dbo].[Email](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PersonId] [int] NOT NULL,
	[Address] [varchar](50) NOT NULL,
	[Emailabel] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Email] PRIMARY KEY CLUSTERED ([Id] ASC) 
)
GO

ALTER TABLE [dbo].[Email]  WITH CHECK ADD  CONSTRAINT [FK_Email_Person] FOREIGN KEY([PersonId])
REFERENCES [dbo].[Person] ([Id])
GO

ALTER TABLE [dbo].[Email] CHECK CONSTRAINT [FK_Email_Person]
GO

USE [GoontactDb]
GO

/****** Object:  Table [dbo].[Phone]    Script Date: 11/14/2021 5:09:00 PM ******/
CREATE TABLE [dbo].[Phone](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PersonId] [int] NOT NULL,
	[CountryCode] [varchar](4) NOT NULL,
	[AreaCode] [varchar](4) NOT NULL,
	[SubcriberCode] [varchar](11) NOT NULL,
	[Extention] [varchar](5) NULL,
	[PhoneLabel] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Phone] PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

ALTER TABLE [dbo].[Phone]  WITH CHECK ADD  CONSTRAINT [FK_Phone_Person] FOREIGN KEY([PersonId])
REFERENCES [dbo].[Person] ([Id])
GO

ALTER TABLE [dbo].[Phone] CHECK CONSTRAINT [FK_Phone_Person]
GO

CREATE or ALTER PROC sp_SaveContactInfo
	@Id INT OUT,
	@FirstName NVARCHAR(50),
	@LastName NVARCHAR(50),
	@Email NVARCHAR(50),
	@EmailLabel NVARCHAR(50),
	@Phone NVARCHAR(10),
	@PhoneLabel NVARCHAR(50)
AS 
/*
	DECLARE @_Id int
	exec sp_SaveContactInfo @_Id OUT, 'Jon','Campos','ijac213@gmail.com','Email','6266416764','cell'
	SELECT * FROM Person WHERE Id=@_Id
	SELECT * FROM Email WHERE PersonId=@_Id
	SELECT * FROM Phone WHERE PersonId=@_Id
*/
BEGIN
	BEGIN TRY
		BEGIN TRANSACTION
		INSERT INTO Person(
			FirstName,
			LastName
		) VALUES(
			@FirstName,
			@LastName
		)
		Set @Id = SCOPE_IDENTITY()
		INSERT INTO Email(
			PersonId,
			Address,
			Emailabel
		) VALUES(
			@Id,
			@Email,
			@EmailLabel
		)
		INSERT INTO Phone(
			PersonId,
			CountryCode,
			AreaCode,
			SubcriberCode,
			PhoneLabel
		) VALUES(
			@Id,
			1,
			SUBSTRING(@Phone,1,3),
			SUBSTRING(@Phone,4,7),
			@PhoneLabel
		)
		COMMIT 
	END TRY
	BEGIN CATCH 
		ROLLBACK
	END CATCH
END
GO

CREATE OR ALTER   PROC [dbo].[sp_ContactList]
	@pageCnt int = 5, 
	@pageNum int = 1
AS 
/*
	EXEC sp_ContactList 10,5
*/
BEGIN 
	SELECT p.Id,  
		   p.FirstName+' '+ p.LastName AS Name,
		   e.Address AS Email,
		   '(' + ph.AreaCode + ') ' + ph.SubcriberCode AS PhoneNumber
	  FROM Person p 
	  JOIN Email e ON p.Id = e.PersonId
	  JOIN Phone ph ON p.Id = ph.PersonId
	 ORDER BY p.Id
	OFFSET @pageCnt*(@pageNum-1) ROWS FETCH NEXT @pageCnt ROWS ONLY
	
	SELECT COUNT(1) FROM Person
END
GO

DECLARE @cnt INT = 1,@cnt_total int = 100;

WHILE @cnt < @cnt_total
BEGIN
   INSERT INTO Person(FirstName,LastName) VALUES (N'First'+ CAST(@cnt AS nvarchar), N'Last'+ CAST(@cnt AS nvarchar));
   INSERT INTO Email(PersonId,Address,Emailabel) VALUES (@cnt, N'email'+ CAST(@cnt AS nvarchar)+N'@example.com',N'Emailabel'+ CAST(@cnt AS nvarchar))
   INSERT INTO Phone(PersonId,CountryCode,AreaCode,SubcriberCode,PhoneLabel) VALUES (@cnt,1,'213', CAST(@cnt AS nvarchar), N'PhoneLabel'+ CAST(@cnt AS nvarchar))
   SET @cnt = @cnt + 1;
END;

