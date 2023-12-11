drop database if exists [Test]

go

create database [Test]

go

use [Test]
create table TEST_DATA (
	IDZ int identity(1, 1) not null,
	NAME varchar(50) not null,
	constraint PK_TEST_DATA primary key (IDZ)
)

go

insert into TEST_DATA (NAME) values
	('item 1')
	, ('item 2')
	, ('item 3')
	, ('item 4')
