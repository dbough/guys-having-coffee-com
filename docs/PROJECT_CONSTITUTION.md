# Guys Having Coffee - Project Constitution

## Project Overview

**Mission**: Provide a simple, low-maintenance web presence for a casual men's coffee group that clearly communicates what we're about, when we meet, and how to stay connected.

**Target Audience**: Men interested in casual coffee meetups without pressure or commitment.

## Core Principles

### 1. Simplicity Over Cleverness
- Raw HTML, CSS, and optional vanilla JavaScript only
- No frameworks, build tools, or backend systems
- Single-page design preferred
- Code should be readable by anyone with basic web knowledge

### 2. Minimal Maintenance
- Static content that rarely changes
- Manual updates are acceptable and expected
- No databases, user accounts, or complex integrations
- Self-documenting code with clear comments

### 3. Privacy-Respecting
- No tracking scripts or analytics by default
- External services (email signup) should be privacy-conscious
- Minimal data collection
- No cookies unless absolutely necessary

### 4. Universal Accessibility
- Works on all devices (mobile-first approach)
- Fully functional without JavaScript
- Fast loading on slow connections
- Readable by screen readers and assistive technologies

## Technical Constraints

### Hard Requirements
- **Hosting**: GitHub Pages with custom domain
- **Technology Stack**: HTML, CSS, vanilla JavaScript only
- **No Dependencies**: No npm, build tools, or package managers
- **Browser Support**: Works in all modern browsers and degrades gracefully

### Architecture Decisions
- Single HTML file (`index.html`)
- Embedded CSS in `<style>` tag or single external CSS file
- Optional JavaScript in `<script>` tag or single external file
- All assets (images, fonts) hosted locally or via reliable CDN

## Functional Requirements

### Must Have
1. **Group Description**
   - Clear explanation of purpose
   - Explicit messaging: "no pressure, no commitment"
   - Target audience clarification

2. **Meeting Information**
   - Schedule: 1st Saturday and 3rd Tuesday each month
   - Time (manually updated is acceptable)
   - Location details
   - Current month's dates prominently displayed

3. **Contact Methods**
   - Primary contact person/method
   - How to get questions answered
   - Response time expectations

4. **Calendar Integration**
   - "Add to calendar" links for upcoming meetings
   - Downloadable .ics file option
   - Support for major calendar applications

5. **Email Updates**
   - Link to external email service (Mailchimp, ConvertKit, etc.)
   - Clear opt-in process
   - Privacy policy reference

### Nice to Have
- Basic styling that looks modern but not trendy
- Subtle animations or interactions (CSS-only preferred)
- Social proof (testimonials, photos from past meetings)

### Explicitly Excluded
- User authentication or accounts
- Database or backend storage
- Analytics tracking (unless explicitly requested)
- Complex forms or data processing
- Social media integration beyond simple links

## Content Guidelines

### Tone and Voice
- Friendly and welcoming but not overly casual
- Transparent about expectations
- Inclusive language
- Clear and concise communication

### Messaging Priorities
1. **Low commitment**: Emphasize casual, drop-in nature
2. **Accessibility**: Anyone can join, no experience required
3. **Consistency**: Regular schedule you can count on
4. **Community**: Connection over coffee, not networking

### Updates and Maintenance
- Meeting times/dates: Update monthly (acceptable to be manual)
- Location changes: Update immediately
- Contact info: Verify quarterly
- Content review: Annually or as needed

## File Structure

```
/
├── index.html          # Main page
├── styles.css         # Styles (optional separate file)
├── script.js          # JavaScript (optional separate file)
├── calendar.ics       # Downloadable calendar file
├── assets/            # Images, fonts, etc.
│   └── favicon.ico
└── README.md          # Development notes
```

## Development Guidelines

### Code Standards
- Use semantic HTML5 elements
- CSS follows mobile-first approach
- JavaScript enhances but doesn't break core functionality
- Comments explain "why" not "what"
- Consistent indentation (2 spaces recommended)

### Testing Checklist
- [ ] Works without JavaScript
- [ ] Readable on mobile devices
- [ ] Calendar links work on major platforms
- [ ] Email signup functions properly
- [ ] Fast loading on slow connections
- [ ] Accessible via screen reader
- [ ] All links work and open appropriately

### Deployment
- Push to main branch triggers GitHub Pages build
- Custom domain configured in repository settings
- HTTPS enabled by default
- Regular backups not required (Git history suffices)

## Governance

### Decision Making
- Technical decisions: Favor simplicity and maintainability
- Content changes: Group consensus for major changes
- Emergency updates: Primary maintainer can act independently

### Maintenance Responsibility
- Primary maintainer updates meeting dates/times
- Backup maintainer for continuity
- Annual review of content and functionality

### Success Metrics
- Site loads quickly and works reliably
- Meeting attendance remains steady or grows
- Minimal maintenance overhead
- Positive feedback from group members

## Migration and Evolution

### When to Consider Changes
- Current solution no longer meets basic needs
- Maintenance burden becomes excessive
- Technology becomes obsolete or insecure

### Change Process
1. Document current issues
2. Evaluate alternatives within existing constraints
3. If constraints must change, reassess entire constitution
4. Implement changes gradually
5. Monitor impact and adjust

### Exit Strategy
- All code and content in version control
- No vendor lock-in beyond GitHub Pages
- Documentation sufficient for handoff
- Domain and email service easily transferable

---

**Last Updated**: December 17, 2025  
**Next Review**: December 2026
