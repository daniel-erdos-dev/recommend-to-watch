# recommend-to-watch

Recommend a movie based on your favorite movie(s) and tell you on which streaming/renting/buying platforms you can watch it!

You can check out in action on: [Recommend to watch on Azure](https://witty-beach-04f598103.5.azurestaticapps.net)

**Work in progress!**
Things to do for v1:

- Create tests for the application
- Refactor/clean-up CSS, break down into smaller files, use Tailwind CSS
- Style it to make prettier
- Host backend repositories in Azure, and serve data through those
- Fix loading periods to give a consistent experience (sometimes loading animation stops before next dataset is loaded)
- Performance optimisation

## Tech stack/tools used:

- React
- Next.js
- Typescript
- Redux + redux/toolkit
- Tailwind CSS
- Github
- Github actions

## Services/APIs used:

- TMDB api
- JustWatch api (through TMDB api)
- ChatGPT api (currently only working with localhost)

## Notes:

It was built with the intention of recommending movies with the help of AI (cgpt), but since I wouldn't feel good about storing my cgpt api key in FE code, or sending through browser client, that part only works locally. If you want to try that out too, you can get a chatgpt apikey and store it in the .env variable (should be in project root folder). In the meantime it can be used with TMDB recommendations, although those are less valid... Once I host the backend services in the cloud, and probably in v2 the AI recommendation functionality will be back in prod also

## V2 plans:

- Use backend microservices (nodejs + express + TS) and handle chatGPT recommendations in prod
- Signing into TMDB account and using their TMDB favorites list for recommendation input
- Ability to add recommended movie to TMDB watchlist
- Movie recommendations based on genres and favorite movies

## V3 plans:

- Same functionality but also for TV shows
