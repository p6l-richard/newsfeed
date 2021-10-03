# Ondeck Newsfeed

A feed to update On Deck users about the latest news in terms of new projects, users & announcements.

## Features

### Fellowship-specific feeds

The feed can be filtered for a specific fellowship, which changes the news aggregation:

|          | announcements | users             | projects |
| -------- | ------------- | ----------------- | -------- |
| writers  | writers-only  | writers-only      | ❌       |
| founders | founders-only | founders & angels | ✔️       |
| angels   | angels-only   | founders & angels | ✔️       |

_Note: If `all` (the default) is selected, the newsfeed aggregates announcements, users & projects for all fellowships_

### Infinite Queries

The newsfeed fetches only a specific amount of news (more can be fetched via button-click)

## Getting started

1. Create a `.env.local` file (you can copy [the included example file](./.env.local.example))
2. `yarn dev`
