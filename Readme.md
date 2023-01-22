
## Inspiration
Getting a referral increases your chances of landing the job dramatically. But sometimes, it is hard to get a referral. Normally you would go to Linkedin and search for a company. You may be able to send cold messages to say the top 50 people. But what about the people who appear on the later pages? They may be willing to give you a referral. And even if you message someone they may or may not be willing to give a referral at the given time. So to solve this dilemma, we want to get the people together who are perfect for each other (of course in terms of a referral).

## What it does
As we like to call it in one sentence, it is "Tinder for Referrals". There are two types of users. One who is looking for referrals and one who is willing to give a referral. You have to first signup and fill in a form that asks for some mandatory details like LinkedIn, name, email, etc. You can also select the preference for the seniority of a role. For example, a person who is willing to give a referral can choose to give a referral for only the senior positions (and vice versa).

Once the preferences are set, each of the users gets a set of profiles on their feed. They can either right or left-swipe it. Right means they're willing to give a referral or take a referral and left means otherwise. If they match, both of them will be notified and then they can see each other in the "Matches" section.

You can also watch the video to see a hands-on demo :)

## How we built it

React and Material UI has been used to create the front end. We used fast API as a backend framework. As for the database, we used PostgreSQL. And finally, we use Docker for pulling everything together. That sums up our tech stack.

As for the project management, we used GitHub and followed a loose iterative approach.

## Challenges we ran into

In our opinion, in the front end, the most challenging part was the swiping mechanism. We also faced an issue where the front end was making multiple calls at once to the backend. We put together a hacky solution to fix this as we didn't have enough time. As for the backend, one of the challenges was to handle the database representation of matches.

## Accomplishments that we're proud of
We were able to put together a working prototype despite starting late. And also, we were awake all night coding like there was no tomorrow.

## What we learned
Importance of low-level planning, the front can have some tricky bugs and they're sometimes hard to debug and appreciation for tinder/bumble devs. 

## What's next for Refferly
Well, we haven't thought of it yet. Maybe we will transform it into an App and launch it (of course after many significant improvements).
