## Introduction

[SpaceX just launched a new GraphQL API](https://medium.com/open-graphql/launching-spacex-graphql-api-b3d7029086e0), and we thought it would be exciting to use that API to visualize all of their launches on a single page.

We built this out and it works OK, but it has a few issues and could use some love. That's where you come in! In no particular order...

 - ✨ There's another GraphQL API with comments on each launch. It would be great to add a button that fetches and displays these comments, [something like this](https://i.imgur.com/rBkl87E.png). [See below](https://github.com/thoughtindustries/spacex-launches#comments-api) for more info on the comments API.
 - ~~ 🐛 The launches aren't in order! For example, #7 (2010-12-08) appears after #6 (2010-06-04), where did we go wrong? ~~
 - 💄 It'd be nice if it looked [more like this](https://i.imgur.com/VB2c48X.png), with alternating left/right timeline items, and maybe some color variation in the background of the rocket/bomb icon. To see the live version of that screenshot, [navigate here](https://themes.getbootstrap.com/preview/?theme_id=1696&show_new=) and click Pages > Timeline v2. All of the classes in this framework can be used.
 - ~~🐛 If you open up the developer console, you'll see the error `"Warning: Each child in a list should have a unique "key" prop."` but [we're specifying a key](https://github.com/thoughtindustries/spacex-launches/blob/3402ee684b71d129f74bbd8fb2e2bf41ea991cd4/src/App.js#L80)! What gives?~~
 - ✨ The SpaceX GraphQL API, [which you can play with here](https://api.spacex.land/graphql/), has a "video_link" (under "links") which could be used to embed a video of the launch. That would be awesome!

## Your Task

While we don't use React ourselves (we're an Ember shop), this exercise is designed to mimic what you would be doing at Thought Industries fulltime: pick up some new technologies and improve upon an existing platform... just on a much smaller scale, and with more rockets. 🚀

We're hoping you will have time to pick one or more tasks off the list above and resolve them. We respect your home time and there's no need to accomplish everything on the list above, we're just looking to get a feel for your work, applied in a neutral space.

You can fork this repository and commit your changes there, then open up a pull request and send us the link.

We plan to review up until ~Feb 12th, but let us know if you need more time.



## Applicant's notes

So I've encountered an error with React that doesn't have a useful error message, that has roadblocked  me for the past two days. The app won't compile due to this error message: `Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.`, pointing to line 32 in `App.js` (where the state is set by graphQL), but the vast majority of the uncommented code is the same as the initial repository, so I'm at a loss with the little time I have left. I also didn't want to refactor the entire app to how I write React apps, because I felt it would show poorly in a 'team environment' to completely restructure the code base for my own personal success.

- Comments API was something I had some groundwork down, but was running into issues with the `useEffect()` hook throwing errors before the component rendered. Hooks are super neat and I really enjoyed using them, though. You can find a commented out component on line 125.

- Launch Order was pretty easy, once I read the GraphQL documentation to figure out how to set the results to sort. GraphQL is very neat, I enjoyed learning about it and would like to use it in future projects (or at Thought Industries, assuming all goes well).

- Keys error was a simple fix, when I was learning React in my bootcamp I had the same error so I knew the quickest solution was to add a key to every child component.

- Video API was a tricky one that I spent a *lot* of time on, mostly with trying to render just *a* video. There are some notes in `App.js` starting at line 163, but the overall gist is that the API doesn't serve just the video's ID, but the entire *watchable* video URL, not the *embeddable* version. YouTube doesn't allow you to embed videos without the *embeddable* URL, which is the same URl with `/watch?v={videoID}` being replaced by `/embed/{videoID}`, so I was trying to parse the URL for the last 11 characters of the URL to grab the ID and use it as a prop for a `<video>` tag, but React's hooks also threw errors with `useEffect()` again. Hooks are great, but I think I need to learn more about them.
