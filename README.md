# recommend-to-watch

Recommend a movie based on your favorite movie(s) and tell you on which streaming/renting/buying platforms you can watch it!

You can check out in action on: [Recommend to Watch](https://recommend-to-watch.vercel.app)

**Work in progress!**
Things to do for v1:

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
- Azure for hosting the site
- AWS for hosting backend/API (lamdba+API gateway)

## Services/APIs used:

- TMDB api
- JustWatch api (through TMDB api)
- ChatGPT api

## V2 plans:

- Signing into TMDB account and using their TMDB favorites list for recommendation input
- Ability to add recommended movie to TMDB watchlist
- Movie recommendations based on genres and favorite movies

## V3 plans:

- Same functionality but also for TV shows
