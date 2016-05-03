# preparedfordisaster
401d7 Project week 1 project

[![Build Status](https://travis-ci.org/preparedfordisaster/preparedfordisaster.svg?branch=master)](https://travis-ci.org/preparedfordisaster/preparedfordisaster)

## MVP:
+ Users can create a login (Auth)
+ Users can login securely after created.
+ Save info to the database.
+ RESTful routes that require the user to be logged in.
+ Email the user, back at user-defined interval.
+ Up on Heroku

## Stretch goals(not in order):
+ Have email reminder go out to household members and the emergency contact as well
+ Set calendar reminder
+ Have links to Amazon packages for preparedness kits (Amazon Associates, https://affiliate-program.amazon.com/)
+ more frequent reminder to the user for a missing piece of the preparedness kit
+ Enable Google, Facebook, Twitter login
+ Implement an argon2 authentication protocol instead of bcrypt https://www.npmjs.com/package/argon2 (2 generations newer than bcrypt)


Potential resources:
Auth:
https://scotch.io/tutorials/easy-node-authentication-facebook
http://code.tutsplus.com/articles/social-authentication-for-nodejs-apps-with-passport--cms-21618

Timed Emails:
http://patrickdmccarthy.tumblr.com/post/104974896772/how-to-send-timed-emails-with-templates-from

Mailgun API:
http://stackoverflow.com/questions/26956251/sending-emails-using-mailgun-with-nodemailer-package

# Documents
## Dependencies
  * bcrypt
  * body-parser
  * express
  * dotenv
  * jsonwebtoken
  * mongoose

## devDependencies
  * chai
  * chai-http
  * gulp
  * gulp-eslint
  * gulp-mocha
  * mocha
