Take Home Projects - Build an Image Search Abstraction Layer
=================

- **Objective**: Build a full stack JavaScript app that allows you to search for images like this: [Search Link](https://cryptic-ridge-9197.herokuapp.com/api/imagesearch/lolcats%20funny?offset=10) and browse recent search queries like this: [Recent Query Link](https://cryptic-ridge-9197.herokuapp.com/api/latest/imagesearch/). Then deploy it to Glitch.
- Note that for each project, you should create a new GitHub repository and a new Glitch project. If you can't remember how to do this, revisit [Get SetUp Link](https://freecodecamp.org/challenges/get-set-for-our-api-development-projects).
- Here are the specific user stories you should implement for this project:
- **User Story**: I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
- **User Story**: I can paginate through the responses by adding a ?offset=2 parameter to the URL.
- **User Story**: I can get a list of the most recently submitted search strings.
- Once you've finished implementing these user stories, click the "I've completed this challenge" button and enter the URLs for both your GitHub repository and your live app running on Glitch.
- You can get feedback on your project by sharing it with your friends on Facebook.

Other Notes
-----------

- Fields returned in example search: url, snippet, thumbnail, context
- Fields returned for latest: term, when
- [Custom Search API Documentation](https://developers.google.com/custom-search/v1/cse/list#request)
- [MongoDB Node.js Driver API](http://mongodb.github.io/node-mongodb-native/3.1/api)

Your Project
------------

On the front-end,
- edit `public/client.js`, `public/style.css` and `views/index.html`
- drag in `assets`, like images or music, to add them to your project

On the back-end,
- your app starts at `server.js`
- add frameworks and packages in `package.json`
- safely store app secrets in `.env` (nobody can see this but you and people you invite)


Made by [Glitch](https://glitch.com/)
-------------------

\ ゜o゜)ノ
