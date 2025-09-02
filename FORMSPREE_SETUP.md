# Formspree Setup Guide (Alternative to EmailJS)

Formspree is often more reliable than EmailJS and easier to set up. Here's how to implement it:

## 1. Create Formspree Account

1. Go to [Formspree.io](https://formspree.io/)
2. Sign up for a free account
3. Verify your email address

## 2. Create a New Form

1. In your Formspree dashboard, click "New Form"
2. Enter a form name (e.g., "Portfolio Contact Form")
3. Add your email address where you want to receive messages
4. Copy the form endpoint URL (e.g., `https://formspree.io/f/xpzgkjvw`)

## 3. Update Your HTML Form

Replace the current form action and method:

```html
<form class="contact__form" id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

## 4. Update JavaScript (Simplified Version)

Replace the EmailJS JavaScript with this simpler Formspree version:

```javascript
// Form submission with Formspree
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = document.getElementById('submit-btn');
    const formMessage = document.getElementById('form-message');
    const buttonText = submitBtn.querySelector('.button-text');
    const buttonIcon = submitBtn.querySelector('.button-icon');
    
    // Clear previous messages and errors
    clearFormErrors();
    hideFormMessage();
    
    // Validate form
    if (!validateForm(form)) {
        showFormMessage('Please fill in all required fields correctly.', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('button--loading');
    submitBtn.disabled = true;
    buttonText.textContent = 'Sending...';
    buttonIcon.className = 'fas fa-spinner fa-spin';
    
    // Send form data to Formspree
    fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            showFormMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
            form.reset();
            clearFormErrors();
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showFormMessage('Sorry, there was an error sending your message. Please try again or contact me directly.', 'error');
    })
    .finally(() => {
        // Reset button state
        submitBtn.classList.remove('button--loading');
        submitBtn.disabled = false;
        buttonText.textContent = 'Send Message';
        buttonIcon.className = 'fas fa-paper-plane';
    });
});
```

## 5. Benefits of Formspree

- **No OAuth issues** - No complex authentication
- **Reliable delivery** - Better email deliverability
- **Spam protection** - Built-in spam filtering
- **Easy setup** - Just need form endpoint
- **Free tier** - 50 submissions per month
- **No JavaScript required** - Works even with JS disabled

## 6. Free Plan Limits

Formspree free plan includes:
- 50 form submissions per month
- Spam filtering
- Email notifications
- Form analytics

## 7. Form Field Names

Make sure your form fields have these names for best compatibility:
- `name` or `from_name` - Sender's name
- `email` or `from_email` - Sender's email  
- `subject` - Message subject
- `message` - Message content

## 8. Testing

1. Deploy your updated form
2. Fill out and submit the form
3. Check your email for the message
4. Verify success/error messages work

This approach is much more reliable than EmailJS and doesn't have OAuth authentication issues!