# Setup Heavenly Match web app

### Staging: 
 heavenly-match.emerald-labs.com
### Production: 
 app.heavenly-match.com


# Amplify Documentation

[![DiscordChat](https://img.shields.io/discord/308323056592486420?logo=discord")](https://discord.gg/amplify)

> https://docs.amplify.aws

### Prerequisites

- [Node.js 18.14.0 or later](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)

## Deploy the App

To automatically deploy the app simply push your code to main branch CI/CD pipelines for Amplify will triggere a deploy to both backend and frontend.

> If you wish to manually deploy the app, follow the instructions below.

### Deploy the back end and run the app

1. Clone the repo & install the dependencies

```sh
~ git clone https://github.com/aws-samples/aws-amplify-quick-notes.git
~ cd aws-amplify-quick-notes
~ npm install
```

2. Initialize and deploy the Amplify project

```sh
~ amplify init
? Enter a name for the environment: dev (or whatever you would like to call this env)
? Choose your default editor: <YOUR_EDITOR_OF_CHOICE>
? Do you want to use an AWS profile? Y

~ amplify push
? Are you sure you want to continue? Y
? Do you want to generate code for your newly created GraphQL API? N
> We already have the GraphQL code generated for this project, so generating it here is not necessary.
```
