## Project Description
‘PrognosUs’, essentially the project is about providing care/aiding caregivers/patients with neurological disability primarily dementia. We’ll develop a webpage and a mobile app (react native) and the technology stack we’ll use is AWS Amplify but our core focus will be the mobile application.

## Tech Stacks
1. React JS
2. AWS Amplify CLI
3. AWS Cognito
4. AWS Lambda functions
5. AWS S3 bucket
6. AWS AppSync (Graphql)
7. AWS DynamoDB
8. Strapi CMS
9. ANT Design
10. Tailwind CSS 
11. Form IO

### React Js

ReactJS is a declarative, efficient, and flexible JavaScript library for building reusable UI components. It is an open-source, component-based front end library which is responsible only for the view layer of the application. It was initially developed and maintained by Facebook and later used in its products like WhatsApp & Instagram.
### AWS Amplify CLI
The CLI will allow you to add features like authentication, GraphQL APIs, Lambda functions, web hosting, analytics, storage & more to your existing app without leaving your command line. TO install CLI run `npm  install -g @aws-amplify/cli`
### AWS Cognito
Amazon Cognito provides an identity store that scales to millions of users, supports social and enterprise identity federation, and offers advanced security features to protect  consumers and business. Run `amplify add auth` to add authentication, for updating auth use `amplify auth update`
### AWS Lambda functions
AWS Lambda is an event-driven serverless computing platform. It provides following services
1.  Operating serverless websites
2.  Rapid document conversion
3.  Predictive page rendering
4.  Working with external services
5.  Log analysis on the fly
6.  Automated backups and everyday tasks
7.  Processing uploaded S3 objects
8.  Backend cleaning
9.  Bulk real-time data processing

### AWS S3 bucket
Amazon S3 (Simple Storage Service) provides object storage, which is built for storing and recovering any amount of information or data from anywhere over the internet. It provides this storage through a web services interface. It can also store computer files up to 5 terabytes in size.  To add s3 bucket, run `amplify add storage`

### AWS App Sync
AWS AppSync allows your applications to access exactly the data they need. Create a flexible API to securely access, manipulate, and combine data from multiple sources. Pay only for requests to your API and for real-time messages delivered to connected clients. To add appsync run `amplify add api`.
### AWS DynamoDB
Amazon DynamoDB is a fully managed, serverless, key-value NoSQL database designed to run high-performance applications at any scale. DynamoDB offers built-in security, continuous backups, automated multi-Region replication, in-memory caching, and data import and export tools.
### Strapi CMS
Strapi is a headless CMS that is used to develop websites, mobile applications, eCommerce sites, and APIs. It allows you to create an API without knowing anything about the backend or databases. The system builds APIs based on content models automatically, making it easy to view data in the CMS.
[Strapi](https://strapi.io/)
### Form IO
Form Io is  an enterprise class combined form and API data management platform for developers who are building their own complex form-based business process applications.
[Form IO](https://www.form.io/)

## Project Setup
Follow these steps to setup project
1. First we need to clone github repo
    git clone git@github.com:EmeraldLabs/prognos-web.git
2. Now configure amplify backend with react app so run
    amplify pull 
3. Next select AWS Access keys option
4. Now enter Access key ID and Secret Access key
5. Next select region us-east-1
6. Next select prognos-web
7. Next select VS code editor
8. Next select javascript
9. Next select react
10. Press enter for default source directory
11. Press enter for default build settings
12. Press enter for default build command
13. Press enter for default start command
14. Do you plan on modifying this backend? (Y/n)  Press Y
