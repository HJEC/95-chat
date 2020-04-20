<p align="center"><img  width="100"src="/public/svgs/bmac.svg"/></p>

<h1 align="center"> '95-Chat, A Social Network</h1>
<h4 align="center">(now unofficially official version 2.0!)<h4>
<br>

<h3> you can visit the live version of this project, hosted with Heroku at the link next to the repo description, or <a style="text-decoration: underline"href="https://hjec-95-chat.herokuapp.com/">here</a>.
Jump in the chat like it's 1995! 💾</h3>
<p align="center"><img src="/public/gif/overview.gif" width="80%" height="200%"/></p>
<h4 align="center">Overview demo of '95-Chat</h4>

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
   <br>[- Intro animation](#1)
   <br>[- Registration](#2)
   <br>[- Log-In](#3)
   <br>[- Password Reset](#4)
   <br>[- Delete Account](#5)
   <br>[- Modal Pop-Up Windows](#6)
   <br>[- Upload Image](#7)
   <br>[- Edit Info](#8)
   <br>[- Friend Finder](#9)
   <br>[- Relationship Management](#10)
   <br>[- Global Chatroom](#11)
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
-   Typeit
-   Bundle.js
-   Socket.io
-   Webpack
-   Amazon Web Services (S3, SES)
-   ipstack location API service
-   Heroku

### Design Packages <a name="Design"></a>

-   Adobe Illustrator
-   Adobe Photoshop
-   Audacity digital audio editor

# Features:

#### 1. Intro animation: <a name="1"></a>

<br>

<p align="center"><img src="/public/gif/intro.gif" width="70%"/></p>

<dl>
    <dt>The boot sequence.</dt>
<dd>This recent addition was a very interesting challenge for me. I wanted to add a feature that would build upon the character of the theme I had chosen for the project. I started small and built a react component using the <strong>typeit</strong> library to recreate a vintage pc boot-sequence.</dd>

<dt>The user data</dt>
<dd>Initially I began filling the boot sequence with some techno-jargon Inspired from classical "hollywood OS" style scenes from movies with footage of impressive but meaningless computer system data running across the screen. Fairly soon I realised that I had the opportunity to do something cool by adding relevant information about the user somewhere they wouldn't expect to see it.</dd>
<br>
<dd>First of all, using the global window object, I could detect what the size of the screen the user has, and then the browser user-agent that they are viewing the site on. The next challenge was to display the user's location, which I achieved via a third-party API called <strong>Ipstack</strong></dd>

<dt>The audio</dt>
<dd>To add to the authentic experience of logging into a chat-room based on a 90's operating system, I created a mp3 file with the sounds of a vintage pc booting up, and with some royalty-free sound effects based on the 1978 "Alien" film for the retro feel. I edited all the clips to trigger at the appropriate time for the intro animation.</dd>

<br>

<dd>I encountered an issue with the audio file not always playing when the page starts due to browser differences, so I added a conditional to check what type of browser is viewing the page and then either an iframe containing the audio file source, or just a plain audio tag would load. I achieved it like this: </dd>

```
    {/Chrome/.test(navigator.userAgent) && (
        <iframe
            src="/boot*sequence*.mp3"
            allow="autoplay"
            style={{ display: "none" }} ></iframe>
    )}
    {!/Chrome/.test(navigator.userAgent) && (
        <audio src="/boot_sequence_.mp3" autoPlay></audio>
    )}
```

<br>

<dt>The flash and the reveal</dt>

<dd>I wanted to use this chance to test my creativity and gain more experience with animating <strong>SVGs</strong>, so I created a redesigned version of the site intro to surprise users on their first visit. This was a simple design with a couple CSS animations but I am already looking forward to experimenting with more.</dd>

<br>

<dt>The repeat</dt>
<dd>After spending so much time creating the animation, I felt like it would be a shame if it could only be seen when a user first visits the website before registering, so I set the intro to play again after the user has been away for a set period of time.
The way I achieved this was by saving a UNIX timestamp from the moment that they first see the introduction and click to enter, and then compare that with a timestamp from the next time they revisit the website. Using some simple math relating to UNIX time, if 30 minutes has elapsed, the next time they visit the site the intro will be played again:

```
function checkIntroTime(serverTime) {
    let localStorageTime = localStorage.getItem("intro_closed");
    let diffMins = Math.round(
        (((serverTime - localStorageTime) % 86400000) % 3600000) / 60000
    );
    if (diffMins > 30) {
        return {
            type: "SHOW_INTRO"
        };
    } else {
        return {
            type: "HIDE_INTRO"
        };
    }
}
```

<dt>The problems</dt>

<dd> I was adamant that I wanted to display the website logo in <strong>ASCII</strong> art form, but the typeit library struggled to print so many characters with all the whitespace. I even contacted the author of typeit to open an issue which was then resolved using an experimental work-around. </dd>

<br>

<dd>I also became aware after deploying the new version of the site to Heroku, that the API I was using to determining the user's location and add the data to the boot sequence was incompatible with Heroku, as the platform initially forwards the traffic from the user's IP address through their server. This meant that I had to tear down this part of the sequence and rebuild it using a different API. After spending some time getting familiar with the Heroku and Ipstack documentation, I found a way to get the user's IP address from the heroku server, build a get request to send to ipstack and then use the returned object to render the text for the intro sequence</dd>
</dl>

#### 2. Account Registration: <a name="2"></a>

<br>

<p align="center"><img src="/public/gif/register.gif" width="70%"/></p>

What does any good social-network site need? Valid account registration of course! The users are presented with a choice of registering a new account, or logging in to the site. All HTML input is fully sanitized and uploaded to the <strong>SQL</strong> database, which also checks for invalid/missing input. Duplicate emails will throw an error.
The password provided is passed through <strong>Bcrypt</strong> to generate a hash password, which is then saved to the database.
Once registered, the user session cookies are applied with <strong>Cookie-Session</strong> and the DOM is re-rendered with the home page react component.

#### 3. Log-In <a name="3"></a>

<br>
<p align="center"><img src="/public/gif/login.gif" width="70%"/></p>

If a user has an existing account with '95-chat, they can enter their email and password combination to log in. The password hash in the database (corresponding to the provided email) is cross-checked using <strong>Bcrypt compare</strong>. If incorrect, the user will be prompted with an error message to try again, otherwise the session cookies will be reapplied and the DOM will render the home page component again.

#### 4. Password Reset <a name="4"></a>

<br>

<p align="center"><img src="/public/gif/reset.gif" width="70%"/></p>

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

#### 5. Delete Account <a name="5"></a>

<br>
<p align="center"><img src="/public/gif/delete.gif" width="70%"/></p>

This was a feature I had initially missed out on due to time constraints, and why should anyone really want to leave '95-chat? But it seemed like a necessary feature. The user's email is stored in session when they are logged in to the site, which is then used to build a SQL query to remove their account from the database. <br>
I also added a conditionally rendered window to make sure the user wants to delete their account after they fill the checkbox to avoid accidental deletion. After they confirm, the user session is removed and the url location is then replaced sending them back to the registration page, with the intro.

#### 6. Modal Pop-up Windows <a name="6"></a>

<br>

<p align="center"><img src="/public/gif/modal.gif" width="70%"/></p>

This feature was one of my favourite parts to work on.
A really important focus for me was to get as many of the details to carry across from the source material. In an attempt to emulate the original Operating-System, I wanted as much of my social network's functionality to operate inside pop-up modal windows.

---

Using the power of <strong>React's component structure and data flow</strong> in tandem with <strong>Redux state management</strong>, I constructed a template window component with elements that let the user manipulate the window. The horizontal lines act as a drag-bar. The bottom icon resizes, the top right expands and shrinks, and the top left icon closes the individual window. I even recreated the original icons for each of the interactive buttons in <strong>Adobe Illustrator</strong> to exactly match the originals, as well as the icon change when clicked on.

---

By passing information about the window down through the window component props, and then back into the state, each window was capable of opening/closing it's respective self through the use of Redux state.
<br><br>
A difficult problem I had with the approach I designed was fixing issues with <strong>Z-indexing</strong>. As I had created a single component that dynamically rendered other components inside of it, all the modal windows were <b>fundamentally the same element</b>. Applying a class to change the z-index on mouse-down wouldn't work in this instance, as the class would be applied to all open windows. I solved this with some tricky manipulation of the data flowing down through the <strong>component props</strong>, which would then feed back up to the top level via the apps local state to discern which specific window element had been clicked on. I can safely say, <em>"It was a real melon-twister!"</em>

#### 7. Upload/Change Profile Image <a name="7"></a>

<br>

<p align="center"><img src="/public/gif/upload.gif" width="70%"/></p>

Upon initial registration, user's profiles will be given a default image for their profile. If they so choose they can upload their own image (up to 2.5mb's in size). This is achieved with <strong>multer</strong> and then uploaded to an <strong>AWS S3 bucket</strong>. The AWS address for that image is then sent to the server and stored in the database for reference.

#### 8. Editing Personal Information <a name="8"></a>

<br>

<p align="center"><img src="/public/gif/edit.gif" width="70%"/></p>

Users can also add information about themselves via a text-area element on their personal profile. The bio-editor component is re-rendered based on three different conditions:

1. Do they have a pre-existing bio? If not, show an empty text area and prompt to add bio.
2. If they do have a bio, change the submit button to say "change your bio".
3. During the editing state, the button will display "submit your bio"

these changes are accomplished with 3 different JSX elements, an indication value in local state, and a ternary operator inside the component return to watch the local state indicator value.

#### 9. Friend Finder <a name="9"></a>

<br>

<p align="center"><img src="/public/gif/finder.gif" width="70%"/></p>

An essential part of any social network is to be social, right? This window component allows users to input a name to find other users on the social network. First the text is formatted to allow a user to search for either <b>first, last or first & last names</b>, including spaces. The results retrieved from the database of users are then rendered inside a DOM element using the Array.prototype.Map() method:

```
    users.map((i, idx) => {
        return (
            <a
                href={`user/${i.id}`}
                key={idx}
                className="individual_friend_block"
            >
                <div>
                    <img
                        src={i.image || "/default.png"}
                        className="find_image"
                    />
                    <p>
                        {i.first} {i.last}
                    </p>
                </div>
            </a>
        );
    })
```

This is a simple but effective demonstration of the power of using a framework that uses a virtual DOM to render the content on the page, without having to reload all the content to display new information.
Simply put, frameworks like React are awesome.

#### 10. Relationship Management <a name="10"></a>

<br>
<p align="center"><img src="/public/gif/relationships.gif" width="70%"/></p>

Yes, friendships! Users can send, receive, accept, and deny friendship requests from other users. The Friendship management portal allows you to manage all of these relationships, and what's even more exciting: Just like dragging files into the Mac OS 7 trashcan, you can now pickup your relevant friend's and <b>dump them in the trash!</b>
The draggable container for each friendship can be pulled over to the trashcan svg I designed, and when the mouse-up event is detected, will delete the friendship relation, change the icon of the trashcan and play a short "bloop" audio clip I created, based on sounds from the original OS.

#### 11. Global Chatroom <a name="11"></a>

<br>
<p align="center"><img src="/public/gif/chat.gif" width="70%"/></p>

What says 1997 more than a site-wide chat room?
Users can contribute to the global-chat, using the immense power of <strong>Socket.io</strong>, live messaging allows users to see each message appear live in the chat. Utilising React's <strong>useRef</strong> and <strong>useEffect</strong> methods to target the chat container, whenever the component is loaded or a new message appears, the container will automatically reposition the container scroll to the bottom to display the most recent message. This was achieved so:

```
const elemRef = useRef();

useEffect(() => {
    let { clientHeight, scrollHeight } = elemRef.current;
    elemRef.current.scrollTop = scrollHeight - clientHeight;
}, [chatMessages]);
```

The sender-id of each message is also checked against the session-id of the currently logged in user, which allows each message to have relevant CSS classes applied to it. This way, any message written by the user will appear on the right side of the chat, and other users will be on the left.

# Future Features <a name="Future"></a>

First of all, I would like to say <b>thank you</b> for taking an interest in my project, and getting through this lengthy Readme. I know it is a fledgling work for the moment, but I immensely enjoyed creating '95-chat. Getting to grips with React & Redux was a great opportunity to improve my skills, and putting my creativity into overdrive was a fun way to test my limits.

#### Ideas for future features are, in no particular order:

1. ~Introduction screen animation~ <strong>Completed!</strong>
   <br>
2. Music radio with controls
   <br> - Expect all the biggest hits and classics from 1995 with a custom site audio player built into the header. This would be a great opportunity to experiment with audio formats and bring some more functionality to the site.
3. ~Account deletion~ <strong>Completed!</strong>
   <br>
4. Private chat messaging.
   <br> - For the extra touch of class, users on the site should be able to enjoy messaging one-to-one with their friends.
5. Message Notifications.
   <br> - Users should be able to recieve a live notification whenever a new message has appeared on the global, or private chat that they have not seen yet.
6. Wall posts
   <br> - The people must be heard. So why not let them publicise any thought that comes to their mind? This is probably the most ambitious of all features, but ideally users should be able to add post's to their wall, including but not limited to: text, images, video, embedded links etc.

> “If liberty means anything at all, it means the right to tell people what they do not want to hear.” - George Orwell
