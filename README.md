# Frontend Mentor - Interactive comments section solution

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

The Interactive Comments project is a dynamic and responsive comment section built with HTML, CSS, JavaScript, and Supabase. It allows users to seamlessly manage comments, including adding, editing, replying, and deleting, with real-time updates powered by Supabase as the backend.

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments
- **Bonus**: If you're building a purely front-end project, use `localStorage` to save the current state in the browser that persists when the browser is refreshed.
- **Bonus**: Instead of using the `createdAt` strings from the `data.json` file, try using timestamps and dynamically track the time since the comment or reply was posted.

## My process

This is the second time I’ve built this project. The first version was created with vanilla JavaScript. In this version, I used React for the frontend, Supabase for the backend, and Tailwind CSS for styling.

My focus this time was more on the logic and functionality rather than design. I also added myself as the current user for a personalized experience.

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- React
- Tailwind
- Supabase

### What I learned

I learned about the field-sizing: content property, which allows form fields to adjust their size automatically based on the content, creating a more dynamic and user-friendly interface.

```css
.proud-of-this-css {
  field-sizing: content;
}
```

### Continued development

A potential future improvement for this project is adding user account functionality. By allowing users to create accounts using their email addresses, each person can have a unique currentUser profile, enhancing personalization and interactivity.

## Author

- Frontend Mentor - [@maziarja](https://www.frontendmentor.io/profile/maziarja)
- Twitter - [@maz_alem](https://x.com/maz_alem)
- Instagram - [@maziar_jamalialem](https://www.instagram.com/maziar_jamalialem)
