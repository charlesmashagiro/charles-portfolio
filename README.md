# Charles Niyonzima Portfolio

This is a simple HTML, CSS and JavaScript portfolio. You can edit it in Visual Studio Code, Visual Studio, Sublime Text or any other code editor.

## Open the project in Visual Studio Code

1. Extract the ZIP file.
2. Open Visual Studio Code.
3. Select **File → Open Folder**.
4. Choose the extracted `charles-portfolio` folder.
5. Open `dist/index.html` in a browser to see the portfolio.

For automatic browser refresh, install the **Live Server** extension in Visual Studio Code. Right-click `dist/index.html` and select **Open with Live Server**.

## Files you will edit

- `dist/index.html` contains all portfolio text, sections, links and checklist items.
- `dist/assets/styles.css` controls colours, spacing, fonts and mobile layout.
- `dist/assets/script.js` controls the mobile menu and interactive checklist.
- `dist/assets/profile.photo.jpeg` is the homepage profile picture.
- `dist/assets/network-lab.png` is the networking project picture.

## Change text

Open `dist/index.html`, find the sentence or heading you want to change, replace it, and save the file. Do not remove HTML tags such as `<p>`, `<h2>` or `<section>` unless you understand the page structure.

Example:

```html
<p class="hero-copy">Write your updated introduction here.</p>
```

## Change a picture

1. Put the new picture in `dist/assets`.
2. Use a short filename without spaces, for example `charles-profile.jpg`.
3. Find the related `<img>` element in `dist/index.html`.
4. Change its `src` value and update the `alt` description.

Example:

```html
<img class="hero-image" src="assets/charles-profile.jpg" alt="Charles Niyonzima working in a computer lab">
```

## Add a project

In `dist/index.html`, find `<div class="project-grid">`. Copy one complete `<article>...</article>` block, paste it before the closing `</div>`, and change the project number, initials, title, description and technologies.

## Add a checklist item

In the `career-checklist` section, copy a complete checklist label and give `data-check` a new unique value:

```html
<label class="check-item">
  <input type="checkbox" data-check="unique-new-skill">
  <span class="check-box" aria-hidden="true"></span>
  <span>
    <strong>New skill name</strong>
    <small>Short description of the skill</small>
  </span>
</label>
```

The JavaScript automatically includes the new item in the percentage calculation. Checked items change colour and their state is saved in the visitor's browser.

## Important publishing note

Changing the files on your computer does not automatically update the live website. After editing, the updated files must be uploaded or deployed again. Keep a backup before making major changes.
