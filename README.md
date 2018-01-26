# Mass Hike

This is the repository for the Mass Hike project. This project includes the source for the frontend of the Prismic CMS hosting the Mass Hike marketing site, as well as all of the code for the Mass Hike trip booking platform.

## Development

To work on this repository you'll need Node@8+, npm@5.3+, and access to the Mass Hike Prismic account (ask the project owner).

Simply clone the repository to your local machine, run `npm install`, and then `npm start` to start the local development server. Navigating to `localhost:3000` in your browser should load the local version of Prismic.

Because Prismic only has one environment (no concept of staging), if you're making changes to an existing template, clone a page and give it a new UID before editing content so the live site is not affected.

## Project Structure

```
 mass-hike
 |
 +--public          # static assets (images, HTML, etc)
    |  index.html
    |  favicon.ico
    +--images       # i hope you can figure this one out
    +--stylesheets  # same here
 +--src             # main folder for all JS in the app
 |  .eslintrc       # just extends Scout's eslint config
 |  .prettierrc     # Scout's default prettier config
```
