USE [GoontactDb]
GO
/****** Object:  StoredProcedure [dbo].[sp_ContactList]    Script Date: 11/14/2021 6:01:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE OR ALTER   PROC [dbo].[sp_ContactList]
AS 
BEGIN 
	SELECT p.Id,  
		   p.FirstName+' '+ p.LastName AS Name,
		   e.Address AS Email,
		   '(' + ph.AreaCode + ') ' + ph.SubcriberCode AS PhoneNumber
	  FROM Person p 
	  JOIN Email e ON p.Id = e.PersonId
	  JOIN Phone ph ON p.Id = ph.PersonId

END
