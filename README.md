## HappyPaws

###Testing:
- Devices:
    - Works in both iOS and Android emulators.
    - Mainly tested on an iPhone (real device) as I do not own an android device.
- All intended features work as expected. 
- A message (alert) will popup for TODOs indicating that the feature is not available yet.
- No compilation errors.  

###Native Plugins used:
- Vibration
- Camera
- Email Composer (happy path only)

###Custom Providers:
- Camera service
- Dog service
- Gallery service
- Helper service
- Pending review service
- Post service
- Review service
- user auth service 

###TODO Features:
- Regular user management
    - Registration
    - Add reviews (goes to pending)
    - Add posts (goes to pending)

###Styling:
Most of the styling details are in `app.scss` and `theme\variables.scss`
and contains some inline styling as well.

NOTE: 
- I have experimented with converting observables to promises, using promise chaining and async/await throughout
the code base so code style is not consistent. 
- I have included the backend project along with the submission which is hosted in Heroku as well. 
- `npm install` will be required for both projects
- Initial load of a page that makes a backed call will take a few seconds because heroku kills services that 
aren't getting traffic for a certain amount of time (not sure what the timeline is).
- You CANNOT hit the local backed server from a real device even in debug mode.   