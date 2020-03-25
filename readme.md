<p align="center"><img  width="100"src="/public/svgs/bmac.svg"/></p>

<h1 align="center"> '95-Chat, A Social Network</h1>
<br>

<h3> you can visit the live version of this project, hosted with Heroku at the link next to the repo description, or <a style="text-decoration: underline"href="https://hjec-95-chat.herokuapp.com/">here</a>.
Jump in the chat like it's 1995! 💾</h3>
<p align="center"><img src="/public/gif/overview.gif" width="80%" height="200%"/></p>

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

<p align="center"><img src="/public/gif/register.gif" width="70%"/></p>

What does any good social-network site need? Valid account registration of course! The users are presented with a choice of registering a new account, or logging in to the site. All HTML input is fully sanitized and uploaded to the <strong>SQL</strong> database, which also checks for invalid/missing input. Duplicate emails will throw an error.
The password provided is passed through <strong>Bcrypt</strong> to generate a hash password, which is then saved to the database.
Once registered, the user session cookies are applied with <strong>Cookie-Session</strong> and the DOM is re-rendered with the home page react component.

#### 2. Log-In <a name="2"></a>

<br>
<p align="center"><img src="/public/gif/login.gif" width="70%"/></p>

If a user has an existing account with '95-chat, they can enter their email and password combination to log in. The password hash in the database (corresponding to the provided email) is cross-checked using <strong>Bcrypt compare</strong>. If incorrect, the user will be prompted with an error message to try again, otherwise the session cookies will be reapplied and the DOM will render the home page component again.

#### 3. Password Reset <a name="3"></a>

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

#### 4. Modal Pop-up Windows <a name="4"></a>

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

#### 5. Upload/Change Profile Image <a name="5"></a>

<br>

<p align="center"><img src="/public/gif/upload.gif" width="70%"/></p>

Upon initial registration, user's profiles will be given a default image for their profile. If they so choose they can upload their own image (up to 2.5mb's in size). This is achieved with <strong>multer</strong> and then uploaded to an <strong>AWS S3 bucket</strong>. The AWS address for that image is then sent to the server and stored in the database for reference.

#### 6. Editing Personal Information <a name="6"></a>

<br>

<p align="center"><img src="/public/gif/edit.gif" width="70%"/></p>

Users can also add information about themselves via a text-area element on their personal profile. The bio-editor component is re-rendered based on three different conditions:

1. Do they have a pre-existing bio? If not, show an empty text area and prompt to add bio.
2. If they do have a bio, change the submit button to say "change your bio".
3. During the editing state, the button will display "submit your bio"

these changes are accomplished with 3 different JSX elements, an indication value in local state, and a ternary operator inside the component return to watch the local state indicator value.

#### 7. Friend Finder <a name="7"></a>

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

#### 8. Relationship Management <a name="8"></a>

<br>
<p align="center"><img src="/public/gif/relationships.gif" width="70%"/></p>

Yes, friendships! Users can send, receive, accept, and deny friendship requests from other users. The Friendship management portal allows you to manage all of these relationships, and what's even more exciting: Just like dragging files into the Mac OS 7 trashcan, you can now pickup your relevant friend's and <b>dump them in the trash!</b>
The draggable container for each friendship can be pulled over to the trashcan svg I designed, and when the mouse-up event is detected, will delete the friendship relation, change the icon of the trashcan and play a short "bloop" audio clip I created, based on sounds from the original OS.

#### 9. Global Chatroom <a name="9"></a>

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

1. Introduction screen animation
   <br> - This is something I wanted to work on from the beginning, but felt like more of a flourish than a necessary feature. I look forward to adding that extra nostalgic touch with a vintage inspired <strong> pure CSS animation</strong> to round off the project.
2. Music radio with controls
   <br> - Expect all the biggest hits and classics from 1995 with a custom site audio player built into the header. This would be a great opportunity to experiment with audio formats and bring some more functionality to the site.
3. Account deletion / Extra information field editing.
   <br> - Due to time constraints these features were put aside to make way for the main functions, but they are just as essential to a full fledged product as anything else.
4. Private chat messaging.
   <br> - For the extra touch of class, users on the site should be able to enjoy messaging one-to-one with their friends.
5. Message Notifications.
   <br> - Users should be able to recieve a live notification whenever a new message has appeared on the global, or private chat that they have not seen yet.
6. Wall posts
   <br> - The people must be heard. So why not let them publicise any thought that comes to their mind? This is probably the most ambitious of all features, but ideally users should be able to add post's to their wall, including but not limited to: text, images, video, embedded links etc.

> “If liberty means anything at all, it means the right to tell people what they do not want to hear.” - George Orwell
