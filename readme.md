<p align="center"><img  width="100"src="/public/svgs/bmac.svg"/></p>

<h1 align="center"> '95-Chat, A Social Network</h1>
<br>

<p align="center"><img src="/public/gif/overview.gif"/></p>

> “I think a simple rule of business is, if you do the things that are easier first, then you can actually make a lot of progress." - Mark Zuckerberg

#### DISCLAIMER!

#### This site is not optimised for mobile. For optimum experience please view using Chrome with a screen of at least min-width: 1100px!

#### Author: [Henry Crookes](http:/github.com/hjec) :cowboy_hat_face:

##### contents:

1. [Description](#Description)
2. [Insights](#Insights)
3. [Technologies](#Technologies)
4. [Design Packages](#Design)
5. [Features](#Features)
   <br>[- Registration](#1)
   <br>[- Log-In](#2)
   <br>[- Password Reset](#3)
   <br>[- Modal Pop-Up Windows](#4)
   <br>[- Upload Image](#5)
   <br>[- Edit Info](#6)
   <br>[- Friend Finder](#7)
   <br>[- Relationship Management](#8)
   <br>[- Global Chatroom](#9)
6. [Future Features](#future)

### Description:

<p align="center"><img src="/public/gif/macos.gif" width="50%"/></p>
<h4 align="center">Demonstration of the original MAC-OS 7 using <a href="http://jamesfriend.com.au/pce-js/pce-js-apps/">this emulator</a></h4>

'95-Chat is a single-page web application built with React/Redux. The core principle of the project was to create a basic social network with account management and chat functionality, based on the visual aesthetic of the Apple MAC Operating System 7, released in 1991.'

---

### Insights:

I created this experiment with the singular focus of seeing what kind of product I could generate, given a particular style to emulate. It was a chance to demonstrate my aptitude for attention to details, and create unique functionality. It also gave me a great opportunity to get hands on experience with Facebook's React framework, and the Redux state container. I also had some fantastic opportunities to experiment with other libraries to add more creative user-interactable elements, such as the resizable, draggable windows built inside the page.

### Technologies

-   mySQL
-   Axios
-   React
-   Redux
-   Jest
-   Babel
-   Csurf
-   Cookie Session
-   Crypto-random-string
-   express
-   Multer
-   Bundle.js
-   Socket.io
-   Webpack
-   Amazon Web Services (S3, SES)

### Design Packages <a name="Design"></a>

-   Adobe Illustrator
-   Adobe Photoshop
-   Audacity digital audio editor

# Features:

#### 1. Account Registration: <a name="1"></a>

<br>

<p align="center"><img src="/public/gif/register.gif" width="70%" height="200"/></p>

What does any good social-network site need? Valid account registration of course! The users are presented with a choice of registering a new account, or logging in to the site. All HTML input is fully sanitized and uploaded to the <strong>SQL</strong> database, which also checks for invalid/missing input. Duplicate emails will throw an error.
The password provided is passed through <strong>Bcrypt</strong> to generate a hash password, which is then saved to the database.
Once registered, the user session cookies are applied with <strong>Cookie-Session</strong> and the DOM is re-rendered with the home page react component.

#### 2. Log-In <a name="2"></a>

<br>
<p align="center"><img src="/public/gif/login.gif" width="70%" height="200"/></p>

If a user has an existing account with '95-chat, they can enter their email and password combination to log in. The password hash in the database (corresponding to the provided email) is cross-checked using <strong>Bcrypt compare</strong>. If incorrect, the user will be prompted with an error message to try again, otherwise the session cookies will be reapplied and the DOM will render the home page component again.

#### 3. Password Reset <a name="3"></a>

<br>

<p align="center"><img src="/public/gif/reset.gif" width="70%" height="200"/></p>

Using the power of <strong>React component state</strong>, the reset password component is dynamically rendered based on the progress of the reset procedure. The first layout prompts the user for the email of the account. Once entered, the user's email is stored in the component state, then an <strong>Axios request</strong> is made to the server, triggering a function that:

1. Generates a 6 digit secret via <strong>crypto-random-string</strong>
2. Retrieves the user's info from the database via the provided email.
3. Composes an email string with the user's first name, and the secret code.
4. Using the <strong>Amazon Web Services SDK</strong>, an instance of the aws-sdk "SES" is created.
5. The SES instance "SendEmail" method is called, with an object containing the user's email and string containing the reset code as an argument. The email is sent from a provided admin email address.
6. Finally, the secret 6 digit code is then stored in a separate database of password reset codes for later verification.

If this procedure successfully completes, the react state is updated, provoking the DOM to update with the next step of the component.

---

Once the reset email is sent, the user will find in their inbox an email containing the 6 digit reset code. Once the correct code is provided, they will have to provide a new password and submit. Once the submit button is clicked another Axios post request is made to the server. What happens next is:

1. An SQL query is triggered to retrieve the code stored in the database earlier, using the email we put into state during step 1.
2. The code provided by the user is checked against the one retrieved from the database to look for an exact match.
3. If the match succeeds then the new password is now hashed with Bcrypt. The previous password in the database for that user is then updated

Lastly, the state of the component is updated one last time on a successful reset, informing the user that their password has been changed. They can now relocate back to the start to log-in using their new credentials.

#### 4. Modal Pop-up Windows <a name="4"></a>

<br>

<p align="center"><img src="/public/gif/modal.gif" width="70%" height="200"/></p>

This feature was one of my favourite parts to work on.
A really important focus for me was to get as many of the details to carry across from the source material. In an attempt to emulate the original Operating-System, I wanted as much of my social network's functionality to operate inside pop-up modal windows.

---

Using the power of <strong>React's component structure and data flow</strong> in tandem with <strong>Redux state management</strong>, I constructed a template window component with elements that let the user manipulate the window. The horizontal lines act as a drag-bar. The bottom icon resizes, the top right expands and shrinks, and the top left icon closes the individual window. I even recreated the original icons for each of the interactive buttons in <strong>Adobe Illustrator</strong> to exactly match the originals, as well as the icon change when clicked on.

---

By passing information about the window down through the window component props, and then back into the state, each window was capable of opening/closing it's respective self through the use of Redux state.
<br><br>
A difficult problem I had with the approach I designed was fixing issues with <strong>Z-indexing</strong>. As I had created a single component that dynamically rendered other components inside of it, all the modal windows were <strong>fundamentally the same element</strong>. Applying a class to change the z-index on mouse-down wouldn't work in this instance, as the class would be applied to all open windows. I solved this with some tricky manipulation of the data flowing down through the <strong>component props</strong>, which would then feed back up to the top level via the apps local state to discern which specific window element had been clicked on. I can safely say: <em>It was a real head-scratcher!</em>

#### 5. Upload/Change Profile Image <a name="5"></a>

<br>

<p align="center"><img src="/public/gif/upload.gif" width="70%" height="200"/></p>

Upon initial registration, user's profiles will be given a default image for their profile. If they so choose they can upload their own image (up to 2.5mb's in size). This is achieved with <strong>multer</strong> and then uploaded to an <strong>AWS S3 bucket</strong>. The AWS address for that image is then sent to the server and stored in the database for reference.

#### 6. Editing Personal Information <a name="6"></a>

<br>

<p align="center"><img src="/public/gif/edit.gif" width="70%" height="200"/></p>

Users can also add information about themselves via a text-area element on their personal profile. The bio-editor component is re-rendered based on three different conditions:

1. Do they have a pre-existing bio? If not, show an empty text area and prompt to add bio.
2. If they do have a bio, change the submit button to say "change your bio".
3. During the editing state, the button will display "submit your bio"

these changes are accomplished with 3 different JSX elements, an indication value in local state, and a ternary operator inside the component return to watch the local state indicator value.

#### 7. Friend Finder <a name="7"></a>

<br>

<p align="center"><img src="/public/gif/finder.gif" width="70%" height="200"/></p>

#### 8. Relationship Management <a name="8"></a>

<br>
<p align="center"><img src="/public/gif/relationships.gif" width="70%" height="200"/></p>

#### 9. Global Chatroom <a name="9"></a>

<br>
<p align="center"><img src="/public/gif/chat.gif" width="70%" height="200"/></p>

# Future Features <a name="Future"></a>
