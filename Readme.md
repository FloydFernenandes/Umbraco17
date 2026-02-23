Setup Instructions

Prerequisites
1.	Visual Studio 2026 (recommended for .NET 10) 
2.	Visual Studio 2022 may also work if the required .NET 10 tooling/workloads are installed.
3.	.NET 10 SDK (required to run/build the project)
4.	IIS Express (required to run/debug via Visual Studio)
5.	Node.js v22.15.0 (required due to the project’s SCSS/dashboard tooling setup)

Run the project (Visual Studio)
1.	Unzip the provided Umbraco 17 folder.
2.	Open the project in Visual Studio 2026 (or Visual Studio 2022 if configured for .NET 10). 
3.  Open the .sln if present, otherwise open the folder/project (Umbraco17.csproj).
4.	Set the web project as the Startup Project (if prompted).
5.  In the Visual Studio run target dropdown, select IIS Express.
6.	Press F5 to run.


SCSS / Frontend Styles (after cloning)
1.	node_modules is not included in the repo.
2.	Open a terminal in the Umbraco17 folder (same folder as Umbraco17.sln and package.json).
3.	Run the following to install dependencies (this creates node_modules):  
4.	npm install 
5.	If you change any SCSS (e.g., under wwwroot/scss), rebuild CSS with:
6.	npm run sass

Dashboard (Backoffice) Setup (after cloning)
1.	App_Plugins/ArticleDetails/node_modules is not committed.
2.	Open a terminal in the Umbraco17 folder (same folder as Umbraco17.sln).
3.	Navigate to the dashboard Vite project:
4.	cd App_Plugins/ArticleDetails
5.	Install dashboard dependencies (creates node_modules under App_Plugins/ArticleDetails): 
6.	npm install
7.	Build the dashboard bundle (only needed if you changed dashboard code or if dist/ is not included): 
8.	npm run build
9.	Run the Umbraco site (Visual Studio / IIS Express or dotnet run) and open the backoffice.

Backoffice Credentials:
	Email: admin@example.com
	Password: 1234567890

Database
• SQLite (database file is included in the GitHub repository; no separate database setup required after cloning).

Assumptions made (2 points)
1.   title, intro, publishDate, and heroImage are mandatory to ensure the Razor templates always have required data and the frontend does not break due to missing values. 
2.   No dedicated 'Homepage' was added since the requested scope is Article List + Article templates. the Article List page serves as the main entry point.


Brief Notes on Decisions and Trade-offs
1.  Bundled compiled assets + SCSS tooling: Node.js is required due to the SCSS/dashboard tooling; compiled assets are included so the project runs immediately after cloning.
2.  Scope-first delivery: prioritized the required Article List + Article rendering, reading-time service, and Content dashboard over extra site structure/features to match the acceptance criteria and timebox.


What I Would Improve With More Time
1.   Article list pagination: paginate the Article List (and optionally sort by newest) to keep the page fast and readable as content grows. 
2.   Dashboard navigation: make the “Latest titles” cards clickable so editors can jump directly to the corresponding Content item for quick editing.
