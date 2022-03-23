## URL shortener

Implement a URL shortening service like TinyURL. a URL shortening service like TinyURL.
This service will provide short aliases redirecting to long URLs.
Similar services: bit.ly, ow.ly, short.io


#### Exposes 2 endpoints

 - **/api/shorten:**
 
    - accept long domain name information and return short domain name information.

- **/:shortId:**

    - accept short domain name information and resolve to long domain name.


***The project took approximately 6hours***

#### Tech Stacks And libraries Choice

 - NodeJS Express framework was used with TypeScript addded.
 - Swagger (OpenAPI) was used for documentation purposes
 - Jest was selected as the choice unit test framework
 - dotenv for accessing environment variables

#[!https://dot-take-home-assessment.s3.eu-central-1.amazonaws.com/TypeScript+%26+Node.js+Assignment.pdf]