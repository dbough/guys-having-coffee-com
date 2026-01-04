# Guys Having Coffee - Website

A simple, static website for a casual men's coffee meetup group in Lakeland, FL.

## About

This website provides information about "Guys Having Coffee" - a low-commitment, casual coffee meetup that happens on the 1st Saturday and 3rd Tuesday of each month.

## Technology Stack

- **HTML5**: Semantic, accessible markup
- **CSS3**: Mobile-first responsive design
- **Vanilla JavaScript**: Progressive enhancements for calendar features
- **No frameworks or build tools**: Simple, maintainable code

## Features

- ✅ Fully functional without JavaScript
- ✅ Mobile-first responsive design
- ✅ Automatic next meetup date calculation
- ✅ Multiple calendar integration options (Google, Outlook, .ics download)
- ✅ Accessible and fast-loading
- ✅ No external dependencies

## File Structure

```
/
├── index.html              # Main page
├── styles.css             # Styles
├── script.js              # JavaScript enhancements
├── upcoming-meetup.ics    # Downloadable calendar file
├── assets/                # Images and icons
│   └── favicon.ico
└── README.md              # This file
```

## Local Development

Simply open `index.html` in a web browser. No build process required.

For a local server (optional):
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have npx)
npx serve
```

Then visit `http://localhost:8000`

## Deployment

This site is designed for GitHub Pages:

1. Push to the main branch
2. Enable GitHub Pages in repository settings
3. Configure custom domain (GuysHavingCoffee.com)
4. Enable HTTPS

## Maintenance

### Regular Updates (Monthly)
- The next meetup date updates automatically via JavaScript
- The .ics file is regenerated dynamically by the script

### When Location Changes
- Update the location in `index.html` (Meetup Details section)
- Update the location in `script.js` (calendar generation functions)

### Annual Review
- Verify all content is accurate
- Test all calendar links
- Check mobile/desktop usability

## Browser Support

- Modern browsers: Full functionality
- Older browsers: Graceful degradation
- No JavaScript: Complete core functionality
- Screen readers: Full accessibility

## Meeting Schedule

- **1st Saturday** of each month: 8:00 AM - 10:00 AM
- **3rd Tuesday** of each month: 7:30 AM - 9:00 AM
- **Location**: Black & Brew @ the Library, 100 Lake Morton Dr, Lakeland, FL 33801

## License

© 2026 Guys Having Coffee. All rights reserved.

## Contact

For website issues or suggestions, please contact the site maintainer.

---

**Last Updated**: January 4, 2026
