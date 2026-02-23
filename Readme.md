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

Backoffice Credentials
•	Email: admin@example.com
•	Password: 1234567890

Database
•	SQLite (included in the zipped project; no separate database setup required)


Assumptions made (2 points)
•   title, intro, publishDate, and heroImage are mandatory to ensure the Razor templates always have required data and the frontend does not break due to missing values. 
•   No dedicated 'Homepage' was added since the requested scope is Article List + Article templates. the Article List page serves as the main entry point.


Brief Notes on Decisions and Trade-offs
•  Bundled compiled assets + SCSS tooling: Node.js is required due to SCSS/dashboard tooling; compiled assets are included in the zip so the project runs immediately, at the cost of a slightly larger submission.
•  Scope-first delivery: prioritized the required Article List + Article rendering, reading-time service, and Content dashboard over extra site structure/features to match the acceptance criteria and timebox.


What I Would Improve With More Time
•   Article list pagination: paginate the Article List (and optionally sort by newest) to keep the page fast and readable as content grows. 
•   Dashboard navigation: make the “Latest titles” cards clickable so editors can jump directly to the corresponding Content item for quick editing.
