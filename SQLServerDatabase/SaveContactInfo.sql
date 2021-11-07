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