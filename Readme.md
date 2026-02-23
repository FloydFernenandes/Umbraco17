Setup Instructions

Prerequisites
•	Visual Studio 2026 (recommended for .NET 10) 
•	Visual Studio 2022 may also work if the required .NET 10 tooling/workloads are installed.
•	.NET 10 SDK (required to run/build the project)
•	IIS Express (required to run/debug via Visual Studio)
•	Node.js v22.15.0 (required due to the project’s SCSS/dashboard tooling setup)

Run the project (Visual Studio)
1.	Unzip the provided Umbraco 17 folder.
2.	Open the project in Visual Studio 2026 (or Visual Studio 2022 if configured for .NET 10). 
3.  Open the .sln if present, otherwise open the folder/project (Umbraco17.csproj).
4.	Set the web project as the Startup Project (if prompted).
5.  In the Visual Studio run target dropdown, select IIS Express.
6.	Press F5 to run.


SCSS / Frontend Styles (after cloning)
•	node_modules is not included in the repo.
•	Open a terminal in the Umbraco17 folder (same folder as Umbraco17.sln and package.json).
•	Run the following to install dependencies (this creates node_modules):  
•	npm install 
•	If you change any SCSS (e.g., under wwwroot/scss), rebuild CSS with:
•	npm run sass

Dashboard (Backoffice) Setup (after cloning)
•	App_Plugins/ArticleDetails/node_modules is not committed.
•	Open a terminal in the Umbraco17 folder (same folder as Umbraco17.sln).
•	Navigate to the dashboard Vite project:
•	cd App_Plugins/ArticleDetails
•	Install dashboard dependencies (creates node_modules under App_Plugins/ArticleDetails): 
•	npm install
•	Build the dashboard bundle (only needed if you changed dashboard code or if dist/ is not included): 
•	npm run build
•	Run the Umbraco site (Visual Studio / IIS Express or dotnet run) and open the backoffice.

Backoffice Credentials
•	Email: admin@example.com
•	Password: 1234567890

Database
• SQLite (database file is included in the GitHub repository; no separate database setup required after cloning).

Assumptions made (2 points)
•   title, intro, publishDate, and heroImage are mandatory to ensure the Razor templates always have required data and the frontend does not break due to missing values. 
•   No dedicated 'Homepage' was added since the requested scope is Article List + Article templates. the Article List page serves as the main entry point.


Brief Notes on Decisions and Trade-offs
•  Bundled compiled assets + SCSS tooling: Node.js is required due to SCSS/dashboard tooling; compiled assets are included in the zip so the project runs immediately, at the cost of a slightly larger submission.
•  Scope-first delivery: prioritized the required Article List + Article rendering, reading-time service, and Content dashboard over extra site structure/features to match the acceptance criteria and timebox.


What I Would Improve With More Time
•   Article list pagination: paginate the Article List (and optionally sort by newest) to keep the page fast and readable as content grows. 
•   Dashboard navigation: make the “Latest titles” cards clickable so editors can jump directly to the corresponding Content item for quick editing.
