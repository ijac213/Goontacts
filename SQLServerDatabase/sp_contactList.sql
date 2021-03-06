USE [GoontactDb]
GO
/****** Object:  StoredProcedure [dbo].[sp_ContactList]    Script Date: 11/14/2021 6:01:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
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
