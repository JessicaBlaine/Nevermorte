const React = require('react');

const SplashPage = React.createClass({

  render() {
    return <div>
      <header>
        <a href="/">
          <img src="" alt="Raven Logo Nevermorte"/>
        </a>
        <a href="/Login">Sign in</a>
      </header>
      <figure>
        <img src="" alt="large splash page image"/>
        <figcaption>
          <h1>Make a Note of it With Nevermorte</h1>
          <p>Big ideas, little details, and everything in between. Anything that matters to you can be captured in a note, ready for when you need it.</p>
          <a href="/Signup">Try it Now</a>
        </figcaption>
      </figure>
      <div class="story">
        <div class="story-item image-on-right">
          <div class="story-image note"></div>
          <div class="story-content">
            <h2>Make a note of it</h2>
            <p>Create a project to-do list. Jot down a reminder. Or snap a picture of a sketch. A note can be anything you want it to be. And once you make a note, it’s accessible wherever you go, forever.</p>
          </div>
        </div>
      </div>
    </div>;
  }
});

module.exports = SplashPage;
