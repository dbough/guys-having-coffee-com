# Guys Having Coffee - V1 Website Specification

## Overview

A single-page static website for "Guys Having Coffee," a casual men's coffee meetup group. The site emphasizes low-effort, low-commitment participation while providing essential information about meetings and how to stay connected.

## Technical Stack

- **HTML5**: Semantic markup, accessible, works without JavaScript
- **CSS3**: Embedded styles or single external file, mobile-first responsive design
- **Optional JavaScript**: Vanilla JS only, for calendar integration enhancement
- **Hosting**: GitHub Pages with custom domain (GuysHavingCoffee.com)
- **No frameworks, build tools, or external dependencies**

## File Structure

```
/
├── index.html          # Single-page website
├── styles.css         # Optional separate CSS file
├── script.js          # Optional separate JavaScript file
├── upcoming-meetup.ics # Downloadable calendar file
├── assets/
│   ├── favicon.ico
│   └── logo-placeholder.png  # Simple logo or text-based
└── README.md          # Development documentation
```

## Page Structure & Content Requirements

### 1. Header Section
**HTML Structure:**
```html
<header>
  <div class="logo">
    <!-- Text-based logo or simple image placeholder -->
    <h1>Guys Having Coffee</h1>
  </div>
</header>
```

**Content Requirements:**
- Group name: "Guys Having Coffee"
- Logo: Text-based or simple image placeholder
- Tagline: Optional, reinforces casual nature

### 2. Purpose Section
**HTML Structure:**
```html
<section id="purpose">
  <h2>What We're About</h2>
  <div class="purpose-content">
    <!-- Purpose explanation -->
    <!-- No expectations statement -->
  </div>
</section>
```

**Content Requirements:**
- **Headline**: "What We're About" or similar
- **Core message**: Brief explanation of the group (2-3 sentences)
- **Key statement**: Explicit text: "Low effort, no commitment, no expectations"
- **Tone**: Friendly, welcoming, transparent
- **Length**: Maximum 100 words total

**Example Content:**
> Guys Having Coffee is a casual meetup for men who want to connect over coffee without pressure or commitment. Come when you can, leave when you want. Low effort, no commitment, no expectations. Just coffee and conversation.

### 3. Meetup Details Section
**HTML Structure:**
```html
<section id="meetup-details">
  <h2>When & Where We Meet</h2>
  <div class="schedule">
    <div class="regular-schedule">
      <!-- Regular cadence -->
    </div>
    <div class="next-meetup">
      <!-- Next specific date -->
    </div>
    <div class="location">
      <!-- Location details -->
    </div>
  </div>
</section>
```

**Content Requirements:**
- **Regular Schedule**: "1st Saturday and 3rd Tuesday of each month"
- **Time**: Specific time (e.g., "9:00 AM - 10:30 AM")
- **Next Meetup**: Specific date and time for next meeting (manual update acceptable)
- **Location**: 
  - Venue name
  - Street address
  - City, State, ZIP
  - Parking/access notes if relevant
- **Format**: Clear, scannable layout with visual hierarchy

**Content Updates:**
- Next meetup date: Monthly manual update required
- Location: Update immediately if changed
- Regular schedule: Rarely changes

### 4. Get Updates Section
**HTML Structure:**
```html
<section id="updates">
  <h2>Stay in the Loop</h2>
  <div class="email-signup">
    <p>Get notified about meetups and occasional updates.</p>
    <a href="[EXTERNAL_SIGNUP_URL]" class="cta-button">Join Email List</a>
  </div>
</section>
```

**Content Requirements:**
- **Headline**: "Stay in the Loop" or "Get Updates"
- **Description**: Brief explanation of what emails include
- **Call-to-action**: Link to external service (Mailchimp, ConvertKit, etc.)
- **Privacy note**: Optional reference to privacy policy
- **Frequency expectation**: "Occasional updates" or similar

**Implementation Notes:**
- External service link opens in new tab/window
- No embedded forms or data collection
- Service selection: Mailchimp, ConvertKit, or similar privacy-conscious option

### 5. Calendar Section
**HTML Structure:**
```html
<section id="calendar">
  <h2>Add to Your Calendar</h2>
  <div class="calendar-options">
    <a href="upcoming-meetup.ics" download>Download Calendar File (.ics)</a>
    <div class="calendar-links">
      <!-- Google, Outlook, Apple Calendar links -->
    </div>
  </div>
</section>
```

**Content Requirements:**
- **Download option**: .ics file for upcoming meetup
- **Quick-add links**: Google Calendar, Outlook.com, Apple Calendar
- **Instructions**: Brief note about compatibility

**JavaScript Enhancement (Optional):**
```javascript
// Generate calendar URLs dynamically based on next meetup date
function generateCalendarLinks(date, title, location) {
  // Google Calendar URL
  // Outlook.com URL  
  // Return object with URLs
}
```

**Implementation Notes:**
- Primary function works without JavaScript (.ics download)
- JavaScript enhances by generating direct calendar service links
- .ics file updated manually with each new meetup date

### 6. Contact Section
**HTML Structure:**
```html
<section id="contact">
  <h2>Questions?</h2>
  <div class="contact-info">
    <p>Organizer: [Name]</p>
    <p>Email: <a href="mailto:[EMAIL]">[EMAIL]</a></p>
    <p>Response time: Usually within 24-48 hours</p>
  </div>
</section>
```

**Content Requirements:**
- **Organizer name**: Primary contact person
- **Contact method**: Email address (mailto: link)
- **Response expectation**: Realistic timeframe
- **Tone**: Approachable, not corporate

## Design Requirements

### Visual Design
- **Style**: Clean, modern but not trendy
- **Colors**: Neutral palette with coffee-related accent colors
- **Typography**: Web-safe fonts, highly readable
- **Logo**: Text-based or simple geometric design
- **Images**: Minimal; placeholder for logo only in V1

### Responsive Design
- **Mobile-first**: Design for smallest screen, enhance upward
- **Breakpoints**: 
  - Mobile: < 768px
  - Tablet: 768px - 1024px  
  - Desktop: > 1024px
- **Navigation**: No complex navigation needed (single page)
- **Touch targets**: Minimum 44px for buttons/links

### Accessibility
- **Semantic HTML**: Proper heading hierarchy, landmarks
- **Color contrast**: WCAG AA compliance minimum
- **Focus management**: Visible focus indicators
- **Screen readers**: Alt text, proper labels
- **No-JavaScript fallback**: Full functionality without JS

## JavaScript Functionality (Optional)

### Calendar Link Generation
**Purpose**: Enhance calendar section with direct service links
**Fallback**: .ics download works without JavaScript
**Implementation**:
```javascript
// Simple, self-contained script
// No external dependencies
// Progressive enhancement only
```

### Next Meetup Date Logic
**Purpose**: Calculate next 1st Saturday / 3rd Tuesday
**Fallback**: Manual date display
**Note**: Only implement if clearly beneficial vs. manual update

## Content Maintenance

### Regular Updates (Monthly)
- Next meetup date in "Meetup Details" section
- Update .ics file with new event details
- Verify location and contact information

### Occasional Updates
- Email signup service link
- Contact information
- Location changes (immediate update required)

### Annual Review
- Overall content accuracy
- Link functionality
- Mobile/desktop usability

## Performance Requirements

- **Page load**: Under 2 seconds on 3G connection
- **File size**: Total assets under 500KB
- **Images**: Optimized, appropriate formats
- **CSS/JS**: Minified if using external files

## Browser Support

- **Modern browsers**: Full functionality
- **Older browsers**: Graceful degradation
- **No-JavaScript**: Complete functionality
- **Screen readers**: Full accessibility

## Deployment Process

1. Push to main branch
2. GitHub Pages auto-deployment
3. Custom domain configured in repository settings
4. HTTPS enabled
5. Test all functionality post-deployment

## Success Criteria

- ✅ Loads and functions completely without JavaScript
- ✅ Readable and usable on mobile devices
- ✅ All calendar options work correctly
- ✅ Email signup link functions
- ✅ Contact information accessible
- ✅ Fast loading on slow connections
- ✅ Screen reader compatible
- ✅ Reflects group's casual, low-commitment nature

## Out of Scope for V1

- User authentication or profiles
- Backend functionality
- Analytics tracking
- Social media integration
- Complex animations or interactions
- Multiple pages or navigation
- Search functionality
- Comments or user-generated content

---

**Document Version**: 1.0  
**Created**: December 17, 2025  
**Implementation Target**: Direct code generation without interpretation
