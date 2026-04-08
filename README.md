# The SoundBox - Music Venue Dashboard Template

A modern, responsive HTML template designed for music venues, concert halls, and live event spaces. Features ticket purchasing, loyalty club membership, event listings, and comprehensive dashboard functionality.

![The SoundBox Preview](assets/images/hero/hero-1.jpg)

## Features

### Core Functionality
- **Event Listings** - Browse upcoming shows with detailed information
- **Ticket Purchasing** - Seamless ticket booking experience
- **Loyalty Club** - Member benefits with presale access and discounts
- **User Dashboard** - Manage tickets, view loyalty status, and account settings
- **Admin Dashboard** - Event management, analytics, and user management

### Design Features
- **Dark/Light Mode** - Toggle between color schemes with persistent preference
- **RTL Support** - Full right-to-left language support
- **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- **Modern UI** - Clean, professional design with smooth animations
- **Accessibility** - WCAG compliant with keyboard navigation support

## Pages Included

| Page | Description |
|------|-------------|
| `index.html` | Home 1 - Main landing page with hero, events, and features |
| `index-2.html` | Home 2 - Alternative layout with featured events |
| `shows.html` | Event calendar with filtering and search |
| `about.html` | Venue story, mission, and team |
| `services.html` | Services offered (private events, venue rental, etc.) |
| `blog.html` | Latest news and artist spotlights |
| `contact.html` | Contact form and information |
| `dashboard-user.html` | User dashboard for tickets and loyalty club |
| `dashboard-admin.html` | Admin dashboard for event management |
| `404.html` | Custom 404 error page |
| `coming-soon.html` | Coming soon page with countdown |

## Folder Structure

```
template-name/
├── assets/
│   ├── css/
│   │   ├── style.css       # Main stylesheet
│   │   ├── dark-mode.css   # Dark mode overrides
│   │   └── rtl.css         # RTL direction styles
│   ├── js/
│   │   ├── main.js         # Main JavaScript functionality
│   │   ├── dashboard.js    # Dashboard specific logic
│   │   └── plugins/        # Third-party plugins
│   ├── images/
│   │   ├── hero/           # Hero images
│   │   ├── bands/          # Band/artist images
│   │   └── content/        # Content images
│   └── fonts/              # Custom fonts
├── pages/
│   ├── index.html          # Homepage
│   ├── about.html          # About page
│   ├── blog.html           # Blog listing
│   └── ...                 # Other template pages
├── documentation/          # Documentation files
└── README.md
```

## Getting Started

1. **Download/Clone** the template files
2. **Open** any HTML file in your browser to preview
3. **Customize** the content, colors, and images to match your brand
4. **Deploy** to your web server

## Customization

### Colors
Edit CSS variables in `assets/css/style.css`:

```css
:root {
  --primary: #7c3aed;        /* Main brand color */
  --primary-light: #a78bfa;  /* Light variant */
  --primary-dark: #5b21b6;   /* Dark variant */
  --secondary: #ec4899;      /* Accent color */
  --accent: #f59e0b;         /* Highlight color */
  /* ... more variables */
}
```

### Images
Replace images in the `assets/images/` folder:
- `hero/` - Hero section backgrounds
- `bands/` - Artist/band photos
- `content/` - General content images

### Content
Edit the HTML files directly to update:
- Venue name and branding
- Event information
- Contact details
- Service descriptions

## JavaScript Features

### Main.js Includes:
- **Dark Mode Toggle** - Persisted in localStorage
- **RTL Direction Toggle** - For RTL languages
- **Mobile Navigation** - Hamburger menu for mobile
- **Navbar Scroll Effect** - Sticky navbar with shadow on scroll
- **Form Validation** - Client-side form validation
- **Smooth Scrolling** - For anchor links
- **Scroll Animations** - Intersection Observer based
- **Lazy Loading** - For images
- **Back to Top Button** - Appears on scroll
- **Cookie Consent** - GDPR compliant banner
- **Notification System** - Toast notifications
- **Counter Animation** - Animated number counters
- **Tabs & Accordion** - Interactive components
- **Modal System** - Accessible modal dialogs

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Dependencies

This template uses:
- **Google Fonts** - Inter & Space Grotesk
- **No JavaScript frameworks** - Pure vanilla JS
- **No CSS frameworks** - Custom CSS

All dependencies are loaded via CDN or included locally.

## License

This template is free for personal and commercial use. Attribution is appreciated but not required.

## Credits

- Images generated with AI
- Icons from Feather Icons (via SVG)
- Fonts from Google Fonts

## Support

For questions or issues, please refer to the documentation or contact the template author.

---

**The SoundBox** - Where Music Comes Alive
