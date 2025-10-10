# Blog Section Management Guide

Your portfolio now has a flexible blog section that can showcase posts from any platform!

## Current Setup

Your blog section currently displays 3 posts from your Blogspot blog:
- How to Enable Root in Ubuntu 12.04
- Kexec and Kdump
- Compiling Linux Kernel

## Adding New Blog Posts

### From Blogspot

To add a new Blogspot post, copy this template and update the details:

```html
<div class="blog__card">
    <div class="blog__data">
        <div class="blog__header">
            <span class="blog__platform">
                <i class="fab fa-blogger"></i> Blogspot
            </span>
            <span class="blog__date">YOUR_DATE</span>
        </div>
        <h3 class="blog__title">
            <a href="YOUR_BLOG_POST_URL" target="_blank">
                YOUR_POST_TITLE
            </a>
        </h3>
        <p class="blog__excerpt">
            YOUR_POST_EXCERPT_OR_SUMMARY
        </p>
        <a href="YOUR_BLOG_POST_URL" target="_blank" class="blog__link">
            Read More <i class="fas fa-arrow-right"></i>
        </a>
    </div>
</div>
```

### From Dev.to

To add a Dev.to post:

```html
<div class="blog__card">
    <div class="blog__data">
        <div class="blog__header">
            <span class="blog__platform">
                <i class="fab fa-dev"></i> Dev.to
            </span>
            <span class="blog__date">YOUR_DATE</span>
        </div>
        <h3 class="blog__title">
            <a href="YOUR_DEVTO_POST_URL" target="_blank">
                YOUR_POST_TITLE
            </a>
        </h3>
        <p class="blog__excerpt">
            YOUR_POST_EXCERPT_OR_SUMMARY
        </p>
        <a href="YOUR_DEVTO_POST_URL" target="_blank" class="blog__link">
            Read More <i class="fas fa-arrow-right"></i>
        </a>
    </div>
</div>
```

### From Medium

To add a Medium post:

```html
<div class="blog__card">
    <div class="blog__data">
        <div class="blog__header">
            <span class="blog__platform">
                <i class="fab fa-medium"></i> Medium
            </span>
            <span class="blog__date">YOUR_DATE</span>
        </div>
        <h3 class="blog__title">
            <a href="YOUR_MEDIUM_POST_URL" target="_blank">
                YOUR_POST_TITLE
            </a>
        </h3>
        <p class="blog__excerpt">
            YOUR_POST_EXCERPT_OR_SUMMARY
        </p>
        <a href="YOUR_MEDIUM_POST_URL" target="_blank" class="blog__link">
            Read More <i class="fas fa-arrow-right"></i>
        </a>
    </div>
</div>
```

### From Hashnode

To add a Hashnode post:

```html
<div class="blog__card">
    <div class="blog__data">
        <div class="blog__header">
            <span class="blog__platform">
                <i class="fas fa-hashtag"></i> Hashnode
            </span>
            <span class="blog__date">YOUR_DATE</span>
        </div>
        <h3 class="blog__title">
            <a href="YOUR_HASHNODE_POST_URL" target="_blank">
                YOUR_POST_TITLE
            </a>
        </h3>
        <p class="blog__excerpt">
            YOUR_POST_EXCERPT_OR_SUMMARY
        </p>
        <a href="YOUR_HASHNODE_POST_URL" target="_blank" class="blog__link">
            Read More <i class="fas fa-arrow-right"></i>
        </a>
    </div>
</div>
```

## Where to Add New Posts

1. Open `index.html`
2. Find the `<!-- Blog Section -->` comment (around line 1348)
3. Locate the `<div class="blog__content">` section
4. Add your new blog card HTML inside this div
5. Save and push to GitHub

## Mixing Multiple Platforms

You can have posts from different platforms in the same section! For example:

```html
<div class="blog__content">
    <!-- Blogspot post -->
    <div class="blog__card">...</div>
    
    <!-- Dev.to post -->
    <div class="blog__card">...</div>
    
    <!-- Medium post -->
    <div class="blog__card">...</div>
    
    <!-- Another Blogspot post -->
    <div class="blog__card">...</div>
</div>
```

## Updating the "Visit My Blog" Button

If you want to change the main blog link at the bottom:

1. Find the `<div class="blog__cta">` section
2. Update the href in the button:

```html
<a href="YOUR_MAIN_BLOG_URL" target="_blank" class="button button--primary">
    Visit My Blog <i class="fas fa-external-link-alt"></i>
</a>
```

## Tips

- **Keep it fresh**: Show your 3-6 most recent or best posts
- **Mix platforms**: Showcase posts from different platforms to show your reach
- **Update regularly**: Add new posts as you publish them
- **Good excerpts**: Write compelling 2-3 sentence summaries
- **Consistent dates**: Use format like "January 15, 2024" or "Jan 15, 2024"

## Platform Icons Reference

- Blogspot: `<i class="fab fa-blogger"></i>`
- Dev.to: `<i class="fab fa-dev"></i>`
- Medium: `<i class="fab fa-medium"></i>`
- Hashnode: `<i class="fas fa-hashtag"></i>`
- LinkedIn: `<i class="fab fa-linkedin"></i>`

## Example: Adding Your First Dev.to Post

When you publish your first Dev.to post about AWS, add it like this:

```html
<div class="blog__card">
    <div class="blog__data">
        <div class="blog__header">
            <span class="blog__platform">
                <i class="fab fa-dev"></i> Dev.to
            </span>
            <span class="blog__date">January 10, 2025</span>
        </div>
        <h3 class="blog__title">
            <a href="https://dev.to/sonuabraham/your-post-slug" target="_blank">
                How I Passed 6 AWS Certifications in One Year
            </a>
        </h3>
        <p class="blog__excerpt">
            My journey through AWS certifications, study strategies, and lessons learned. A comprehensive guide for aspiring cloud professionals.
        </p>
        <a href="https://dev.to/sonuabraham/your-post-slug" target="_blank" class="blog__link">
            Read More <i class="fas fa-arrow-right"></i>
        </a>
    </div>
</div>
```

Happy blogging! 📝✨