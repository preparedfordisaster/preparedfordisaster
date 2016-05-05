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
  * handlebars

## devDependencies
  * chai
  * chai-http
  * gulp
  * gulp-eslint
  * gulp-mocha
  * mocha

## How to sign up
Note: All instructions are for use with httpie but can be changed accordingly to your favorite command line tool for making REST requests.

In your terminal (command line) enter:
```
http POST prepared-for-disaster.herokuapp.com/api/signup username=Username password=Password
```
Note: User name and password should be unique to you. You will receive a token after sign up which should be copied and saved somewhere secure **other than the internet**.

You will receive a token such as...
```
{
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGQiOiI4M2Y4ZDI3NTM4ZjY3NzgxYmM5M2RkMTFjZDA4Nzc4YWMxZTZjNmU0MjJjMjBiZmRmZDQzZTgxODJkMTVlMWQxIiwiaWF0IjoxNDYyNDY2NTI0fQ.oiuyo0klhkz1yYYkKOwSzW45BAsKK4l8FYZymaL3sUkDX5uIOPXE"
}
```
This token will be used as the authorization for your future REST requests.

## How to sign in
If you already have an account and want to use it for making REST requests, go to the command line and make a POST request using your predetermined user name and password.
```
http POST prepared-for-disaster.herokuapp.com/api/signin username=Username password=Password
```

You will again receive the same token as for sign up. Copy and paste it into your future REST request.

## How to POST

For your convenience we've provided an example JSON file of what needs to be posted. This can be manipulated to contain more personalized information so long as it complies with the JSON format. Below is the link to our github repo containing the test_post file.

https://github.com/preparedfordisaster/preparedfordisaster/blob/master/test_post.json

In the command line make a POST request similar to the one below, which uses the test_post JSON file and concats it into the request. This is done because the information needing to be posted is complex and would be difficult to type out in the command line. The test_post does not go into the command line. It needs to be copied into a JSON file within a directory on your local machine. Please note that the token in the example below should be substituted with the token you received while signing up or signing in.

For your POST request enter your token similar to below:
```
cat test_post.json | http POST prepared-for-disaster.herokuapp.com/api/plan token:eyJ08976546khjgfdtygukjlbvhg4M2Y4ZDI3NTM4ZjY3Nzgxyiuyfjhmvbdfghf98765HFGJKkjhgmvgfhjGJjkhmvHJKzZTgxODJkMTVlMWQxIiwiaWF0IjoxNDYyNDY2NTI0fQ.oiuyo0klhkz1yYYkKOwSzW45BAsKK4l8FYZyma
```
## How to PUT

For your PUT request you will want to use your token. After you have posted you will have received a response showing all of the information that you posted as well as a unique identifier given by mongo which needs to be stored in order to make a PUT request and edit the content you've posted. To edit your content, make changes to the JSON file that you've saved and enter into the command line a PUT request as seen below.
```
cat test_post.json | http PUT prepared-for-disaster.herokuapp.com/api/plan/_ID token:eyJ08976546khjgfdtygukjlbvhg4M2Y4ZDI3NTM4ZjY3Nzgxyiuyfjhmvbdfghf98765HFGJKkjhgmvgfhjGJjkhmvHJKzZTgxODJkMTVlMWQxIiwiaWF0IjoxNDYyNDY2NTI0fQ.oiuyo0klhkz1yYYkKOwSzW45BAsKK4l8FYZyma
```
The PUT request includes the unique identifier which should be a number like this:  **572b84966efe0a1100607be8**

If that were your unique ID, then your request would look like this:
```
cat test_post.json | http PUT prepared-for-disaster.herokuapp.com/api/plan/572b84966efe0a1100607be8 token:eyJ08976546khjgfdtygukjlbvhg4M2Y4ZDI3NTM4ZjY3Nzgxyiuyfjhmvbdfghf98765HFGJKkjhgmvgfhjGJjkhmvHJKzZTgxODJkMTVlMWQxIiwiaWF0IjoxNDYyNDY2NTI0fQ.oiuyo0klhkz1yYYkKOwSzW45BAsKK4l8FYZyma
```
## How to DELETE

A DELETE request is nearly identical to a PUT request in that it needs the unique ID in the url to be able to pinpoint which entry plan is being deleted. A DELETE request would look something like this:
```
http DELETE prepared-for-disaster.herokuapp.com/api/plan/572b87956efe0a1100607bef token:eyJ08976546khjgfdtygukjlbvhg4M2Y4ZDI3NTM4ZjY3Nzgxyiuyfjhmvbdfghf98765HFGJKkjhgmvgfhjGJjkhmvHJKzZTgxODJkMTVlMWQxIiwiaWF0IjoxNDYyNDY2NTI0fQ.oiuyo0klhkz1yYYkKOwSzW45BAsKK4l8FYZyma
```
There is no need to concat the JSON file because we are simply deleting it.

## How to GET

In order to view all of your plans, you need to (in your command line), make an authorized GET request using your authorized token similar to as seen below.
```
http GET prepared-for-disaster.herokuapp.com/api/plan/ token:eyJ08976546khjgfdtygukjlbvhg4M2Y4ZDI3NTM4ZjY3Nzgxyiuyfjhmvbdfghf98765HFGJKkjhgmvgfhjGJjkhmvHJKzZTgxODJkMTVlMWQxIiwiaWF0IjoxNDYyNDY2NTI0fQ.oiuyo0klhkz1yYYkKOwSzW45BAsKK4l8FYZyma
```
You will receive back an array of your unique plans. Example:
```
[
    {
        "__v": 0,
        "_id": "572b84236efe0a1100607be4",
        "city": "Safetown",
        "email": "emAddress@gmail.com",
        "emergencykit": {
            "canOpener": true,
            "dustMask": true,
            "extraBatteries": true,
            "firstAidKit": true,
            "flashlight": true,
            "food": true,
            "garbageBagsAndPlasticTies": true,
            "localMaps": true,
            "moistTowelettes": true,
            "noaaWeatherRadio": true,
            "sheetingAndDuctTape": true,
            "water": true,
            "whistle": true,
            "wrenchOrPliers": true
        },
        "firstName": "Moose",
        "householdMembers": [
            {
                "_id": "572b84236efe0a1100607be7",
                "birthYear": 2009,
                "city": "Safetown",
                "email": "sonsEmailAddress@gmail.com",
                "firstName": "SonsName",
                "height": "4",
                "lastName": "lastName",
                "primaryPhone": "555-555-5555",
                "relationship": "Son",
                "secondaryPhone": "555-555-5555",
                "state": "Washington",
                "streetAddress": "555 RightOutSideHouse St.",
                "streetAddressPt2": "100 FartherFromHome Ave.",
                "weight": "100",
                "workSchoolName": "Safetown Elementary",
                "zip": 98105
            },
            {
                "_id": "572b84236efe0a1100607be6",
                "birthYear": 1985,
                "city": "Safetown",
                "email": "partnersEmailAddress@gmail.com",
                "firstName": "partnersFirstName",
                "height": "5",
                "lastName": "lastName",
                "primaryPhone": "555-555-5555",
                "relationship": "Partner",
                "secondaryPhone": "555-555-5555",
                "state": "Washington",
                "streetAddress": "555 RightOutSideHouse St.",
                "streetAddressPt2": "100 FartherFromHome Ave.",
                "weight": "150",
                "workSchoolName": "Safetown Inc.",
                "zip": 98105
            }
        ],
        "ice": [
            {
                "_id": "572b84236efe0a1100607be5",
                "city": "Safetown",
                "email": "icesEmailAddress@gmail.com",
                "firstName": "IceName",
                "lastName": "lastName",
                "primaryPhone": "555-555-5555",
                "secondaryPhone": "555-555-5555",
                "state": "Washington",
                "streetAddress": "555 IcesStreet St.",
                "streetAddressPt2": "100 FartherFromIce Ave.",
                "zip": 98105
            }
        ],
        "lastName": "lastName",
        "memberID": "572b82546efe0a1100607be2",
        "primaryPhone": "555-555-5555",
        "rallyPoints": {
            "immediate": "Field near House",
            "rallyCity": "Safetown",
            "rallyState": "Washington",
            "rallyStreetAddress": "555 RightOutSideHouse St.",
            "rallyStreetAddressPt2": "100 FartherFromHome Ave.",
            "rallyZip": 98105
        },
        "reminderDate": "2016-05-05T16:33:45.000Z",
        "reminderFrequency": 91,
        "secondaryPhone": "555-555-5555",
        "state": "Washington",
        "streetAddress": "555 RightOutSideHouse St.",
        "streetAddressPt2": "100 FartherFromHome Ave.",
        "zip": 98105
    }
]
```
## 
