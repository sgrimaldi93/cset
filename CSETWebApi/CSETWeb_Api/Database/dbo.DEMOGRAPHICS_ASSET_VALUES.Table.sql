USE [CSETWeb]
GO
/****** Object:  Table [dbo].[DEMOGRAPHICS_ASSET_VALUES]    Script Date: 11/14/2018 3:57:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DEMOGRAPHICS_ASSET_VALUES](
	[DemographicsAssetId] [int] IDENTITY(1,1) NOT NULL,
	[AssetValue] [varchar](50) NOT NULL,
	[ValueOrder] [int] NULL,
 CONSTRAINT [PK_DEMOGRAPHICS_ASSET_VALUES] PRIMARY KEY CLUSTERED 
(
	[AssetValue] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[DEMOGRAPHICS_ASSET_VALUES] ON 

INSERT [dbo].[DEMOGRAPHICS_ASSET_VALUES] ([DemographicsAssetId], [AssetValue], [ValueOrder]) VALUES (2, N'< $1,000,000', 2)
INSERT [dbo].[DEMOGRAPHICS_ASSET_VALUES] ([DemographicsAssetId], [AssetValue], [ValueOrder]) VALUES (3, N'< $10,000,000', 3)
INSERT [dbo].[DEMOGRAPHICS_ASSET_VALUES] ([DemographicsAssetId], [AssetValue], [ValueOrder]) VALUES (1, N'< $100,000', 1)
INSERT [dbo].[DEMOGRAPHICS_ASSET_VALUES] ([DemographicsAssetId], [AssetValue], [ValueOrder]) VALUES (4, N'> $10,000,000', 4)
SET IDENTITY_INSERT [dbo].[DEMOGRAPHICS_ASSET_VALUES] OFF