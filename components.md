# COMPONENTS INVENTORY

## December 26, 2024 - Update 3

| Component Name | Type | Framework | File Location | Usage | Description |
|----------------|------|-----------|---------------|-------|-------------|
| **Enhanced Navigation Components** |
| `header` | Layout | Custom CSS | index.html:19-30 | Main header | Site navigation and title container with backdrop blur effect |
| `nav` | Navigation | Custom CSS | index.html:23-34 | Header navigation | Enhanced button-based slide navigation system |
| `nav__btn` | Button | Custom CSS | index.html:24-33 | Navigation buttons | Interactive slide navigation with hover effects and transitions |
| **Layout & Content Components** |
| `title-slide` | Layout | Custom CSS + Google Maps | index.html:37-65 | Title section | Enhanced title slide with embedded property map |
| `property-map` | Embedded | Google Maps API | index.html:58-64 | Map display | Interactive Google Maps showing property location with coordinates |
| `slide` | Layout | Custom CSS | index.html:36+ | Content sections | Individual presentation slides with smooth transitions |
| `container` | Layout | Custom CSS | Throughout | Content wrapper | Responsive content container with mobile optimization |
| **Enhanced Contact Components** |
| `contact-card` | Interactive | Custom CSS + FontAwesome | index.html:75+ | Contact display | Expandable contact cards with direct communication links |
| `contact-card__header` | Interactive | Custom CSS + FontAwesome | Contact cards | Card header | Clickable header with avatar and expand button |
| `contact-card__avatar` | Visual | Custom CSS + FontAwesome | Contact cards | Profile icon | Styled avatar with role-based colors and icons |
| `contact-card__expand` | Button | Custom CSS + FontAwesome | Contact cards | Expand control | Animated expand/collapse button with rotation |
| `contact-card__preview` | Content | Custom CSS | Contact cards | Summary info | Brief contact information preview |
| `contact-card__details` | Content | Custom CSS | Contact cards | Extended info | Collapsible detailed contact information |
| `contact-section` | Content | Custom CSS + FontAwesome | Contact cards | Info sections | Organized contact information with descriptive icons |
| `contact-link` | Interactive | Custom CSS + FontAwesome | Contact cards | Action links | Direct click-to-call and email functionality with hover effects |
| `contact-links` | Container | Custom CSS | Contact cards | Link grouping | Container for organizing multiple contact links |
| **Document Viewer Components** |
| `document-viewer` | Interactive | Custom CSS + FontAwesome | index.html:116+ | Document display | PDF viewer component with control interface |
| `document-viewer__header` | Controls | Custom CSS + FontAwesome | Document viewer | Viewer header | Title and control buttons for document interaction |
| `viewer-controls` | Interactive | Custom CSS + FontAwesome | Document viewer | Action buttons | Fullscreen and print controls with icon labels |
| `document-frame` | Embedded | HTML iframe | Document viewer | Content display | Embedded document iframe with responsive sizing |
| `property-report-frame` | Embedded | HTML iframe | index.html:slide-4 | PropertyReport display | Dedicated iframe for PropertyReport.html with viewer controls |
| `appraisal-frame` | Embedded | HTML iframe | index.html:slide-5 | Appraisal display | Dedicated iframe for PropertyAppraisal.html document |
| `land-frame` | Embedded | HTML iframe | index.html:slide-6 | Land detail display | Dedicated iframe for PropertyLand.html document |
| `tax-frame` | Embedded | HTML iframe | index.html:slide-7 | Tax report display | Dedicated iframe for PropertyTaxReport.html document |
| `fullscreen-modal` | Modal | Custom CSS + FontAwesome | JavaScript generated | Modal overlay | Full-screen document viewing modal with close controls |
| `fullscreen-content` | Container | Custom CSS | Fullscreen modal | Modal content | Container for fullscreen document display |
| `fullscreen-close` | Button | Custom CSS + FontAwesome | Fullscreen modal | Close control | Positioned close button for modal dismissal |
| **Full Report Components** |
| `full-report` | Content | Custom CSS | index.html:slide-12 | Complete report | Scrollable container for the complete OSINT investigation report |
| `report-header` | Header | Custom CSS | Full report | Report title | Header section with investigation report title and metadata |
| `report-meta` | Metadata | Custom CSS | Full report | Report details | Grid layout for report metadata (investigator, property details, etc.) |
| `report-section` | Content | Custom CSS | Full report | Report sections | Individual sections of the investigation report with borders |
| `contact-hub` | Contact | Custom CSS | Full report | Contact display | Styled contact information blocks with left border accent |
| `references` | Citations | Custom CSS | Full report | Reference list | Formatted reference citations with clickable links |
| **Enhanced UI Components** |
| `btn` | Interactive | Custom CSS + FontAwesome | Throughout | Action buttons | Enhanced buttons with hover effects, shadows, and icons |
| `btn--secondary` | Interactive | Custom CSS | Throughout | Secondary actions | Alternative button styling with border and hover states |
| `status` | Visual | Custom CSS | Throughout | Status indicators | Color-coded status badges with enhanced styling and borders |
| `status--success` | Visual | Custom CSS | Throughout | Success states | Green success status with opacity background |
| `status--warning` | Visual | Custom CSS | Throughout | Warning states | Yellow warning status with appropriate styling |
| `status--error` | Visual | Custom CSS | Throughout | Error states | Red error status for critical information |
| `status--info` | Visual | Custom CSS | Throughout | Info states | Blue informational status indicators |
| `status-grid` | Layout | Custom CSS | Throughout | Status grouping | Grid layout for organizing multiple status indicators |
| `status-item` | Content | Custom CSS | Status grids | Status display | Individual status item with description text |
| **Timeline & Visual Components** |
| `timeline` | Interactive | Custom CSS + FontAwesome | index.html:248+ | Timeline display | Enhanced timeline with progression line and markers |
| `timeline-item` | Content | Custom CSS | Timeline | Timeline entries | Individual timeline events with content containers |
| `timeline-marker` | Visual | Custom CSS | Timeline | Progress indicators | Styled circular markers with shadows and positioning |
| `timeline-content` | Content | Custom CSS | Timeline | Event details | Content containers for timeline event information |
| **Grid & Layout Systems** |
| `card-grid` | Layout | Custom CSS | Throughout | Card organization | Grid system for organizing content cards |
| `subjects-grid` | Layout | Custom CSS | index.html:70+ | Subject display | Responsive grid for contact subject cards |
| `blevins-grid` | Layout | Custom CSS | index.html:190+ | Blevins info | Grid layout for Blevins estate information |
| `property-grid` | Layout | Custom CSS | index.html:100+ | Property details | Grid system for property information organization |
| `contact-methods` | Layout | Custom CSS | index.html:220+ | Contact organization | Grid for organizing different contact methods |
| **Enhanced Interactive Elements** |
| `findings-list` | List | Custom CSS + FontAwesome | Throughout | Findings display | Enhanced list with status indicators and spacing |
| `card` | Container | Custom CSS | Throughout | Content cards | Enhanced cards with hover effects and shadows |
| `card__header` | Header | Custom CSS | Cards | Card titles | Styled headers with background and typography |
| `card__body` | Content | Custom CSS | Cards | Card content | Content areas with appropriate padding and styling |
| `recommendation` | Content | Custom CSS | Throughout | Recommendations | Styled recommendation containers with borders |
| **Utility & Helper Components** |
| `memorial-card` | Special | Custom CSS + FontAwesome | Glenda Blevins | Memorial display | Special styling for deceased individual information |
| `map-caption` | Text | Custom CSS | Property map | Map description | Caption text for the embedded property map |

## Framework Dependencies

- **FontAwesome 6.0.0**: Used for all icons throughout the application
- **Google Maps Embed API**: Used for property location mapping
- **Custom CSS Framework**: Purpose-built responsive design system
- **Vanilla JavaScript**: Enhanced interactivity and functionality

## Component Hierarchy

```
body
├── search-container
│   └── search-bar
├── header
│   └── container
│       ├── header__title
│       └── nav
│           └── nav__btn (multiple)
└── main
    └── slide (multiple)
        └── container
            ├── slide__title
            ├── contact-card (multiple)
            │   ├── contact-card__header
            │   ├── contact-card__preview
            │   └── contact-card__details
            ├── document-viewer (multiple)
            │   ├── document-viewer__header
            │   └── document-frame
            ├── timeline
            │   └── timeline-item (multiple)
            └── various grid systems
```

## Mobile Responsiveness Notes

All components are designed with mobile-first principles and include:

- Touch-friendly interactive elements
- Responsive typography scaling
- Adaptive grid systems
- Mobile-specific navigation patterns
- Touch gesture support for slides

## Framework Summary

- **Primary Framework**: Custom CSS with CSS Variables
- **Design System**: Custom design tokens and CSS variables
- **No External UI Frameworks**: All components are custom-built
- **Responsive Design**: Custom media queries and grid systems
- **Theme Support**: Dark/light mode via CSS variables and data attributes
- **Component Architecture**: BEM-style CSS methodology

## Color System Components

| Component | CSS Variable | Usage |
|-----------|--------------|-------|
| Status Success | `--color-success` | Success status indicators |
| Status Error | `--color-error` | Error status indicators |
| Status Warning | `--color-warning` | Warning status indicators |
| Status Info | `--color-info` | Info status indicators |
| Primary Colors | `--color-primary` | Main brand colors |
| Background | `--color-background` | Page backgrounds |
| Surface | `--color-surface` | Card and surface backgrounds |

## Layout Components

| Component | Grid Type | Breakpoints | Usage |
|-----------|-----------|-------------|-------|
| `container` | Responsive | sm, md, lg, xl | Main content wrapper |
| `subjects-grid` | CSS Grid | 2-column responsive | Subject profile layout |
| `property-grid` | CSS Grid | 3-column responsive | Property details layout |
| `blevins-grid` | CSS Grid | 2-column responsive | Blevins family layout |
| `contact-methods` | CSS Grid | 3-column responsive | Contact information layout |
| `timeline` | Flexbox | Single column | Vertical timeline layout |
