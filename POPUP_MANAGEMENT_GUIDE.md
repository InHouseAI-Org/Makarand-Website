# Popup Management Guide

This guide explains how to manage and customize the popup system on the website.

## 🎯 How It Works

The popup system displays notifications to users during their visit:
1. **First popup** (Event/Announcement) - Shows after 5 seconds
2. **Second popup** (WhatsApp Grievance) - Shows 10 seconds after closing the first popup
3. **Once per user journey** - Uses localStorage to remember shown popups permanently
4. **Works on all pages** - Not just homepage

---

## 📝 Current Popups

### 1. Upcoming Event Popup
- **Shows**: After 5 seconds on any page
- **Purpose**: Announce community events, health camps, meetings
- **Current**: Community Health Camp - Jan 28, 2026

### 2. WhatsApp Grievance Popup
- **Shows**: 10 seconds after closing the event popup
- **Purpose**: Encourage users to reach out on WhatsApp
- **Action**: Opens WhatsApp with pre-filled message

---

## ⚙️ How to Customize Popups

### Location
File: `src/app/components/PopupManager.tsx`

### Update Event Popup

```typescript
{
  id: "upcoming-event", // Unique ID (change if you want to show again)
  type: "event",
  delay: 5, // Seconds before showing
  content: {
    title: "Community Health Camp - Jan 28, 2026", // Event title
    description: "Free health check-ups, medicines, and consultations. Join us at Ward Office from 9 AM to 5 PM.", // Event details
    image: "/event-banner.jpg", // Optional event banner
    buttonText: "Register Now", // Button text
    buttonLink: "/connect?mode=contact", // Where to go on click
  },
}
```

### Update WhatsApp Popup

```typescript
{
  id: "whatsapp-grievance", // Unique ID
  type: "whatsapp",
  delay: 10, // Seconds after closing previous popup
  content: {
    title: "Have a Grievance?",
    description: "Reach out to us directly on WhatsApp for quick resolution of your concerns.",
    buttonText: "Chat on WhatsApp",
    buttonLink: "https://wa.me/919999999999?text=Hello, I would like to raise a grievance regarding...",
  },
}
```

---

## 📋 Common Customizations

### Change Timing

```typescript
delay: 10 // Change number (in seconds)
```

### Change WhatsApp Number

```typescript
buttonLink: "https://wa.me/919876543210?text=Your message here"
```

### Change Button Link

```typescript
buttonLink: "/youth" // Internal page
buttonLink: "https://example.com" // External page
```

### Add New Popup

Add to the `popups` array:

```typescript
const popups: Popup[] = [
  // Existing popups...
  {
    id: "new-announcement", // Unique ID
    type: "event", // or "whatsapp"
    delay: 8, // Delay after previous popup closes
    content: {
      title: "New Announcement",
      description: "Your announcement text here",
      buttonText: "Learn More",
      buttonLink: "/page",
    },
  },
];
```

---

## 🎨 Popup Types

### Event Popup (Coral Theme)
- Used for: Events, announcements, campaigns
- Icon: Bell
- Color: Coral/Orange
- Use `type: "event"`

### WhatsApp Popup (Green Theme)
- Used for: WhatsApp outreach, quick support
- Icon: Message
- Color: WhatsApp Green
- Use `type: "whatsapp"`

---

## 🔄 Reset Popups for Testing

During development, if you want to see popups again:

**Option 1: Clear localStorage (Recommended)**
```javascript
// In browser console
localStorage.removeItem('shownPopups')
```

**Option 2: Change Popup ID**
```typescript
id: "upcoming-event-v2" // Changed from "upcoming-event"
```

**Option 3: Clear all site data**
- Open DevTools → Application → Storage → Clear site data

---

## 🎯 Best Practices

### When to Show Popups
✅ **Good uses:**
- Important community events
- Health camps
- Emergency announcements
- New initiatives
- Grievance support

❌ **Avoid:**
- Too many popups (max 2-3)
- Showing too frequently
- Unimportant information

### Timing Guidelines
- **First popup**: 5-8 seconds (let users see the page first)
- **Between popups**: 10-15 seconds (don't overwhelm)
- **Total**: Keep under 30 seconds for all popups

### Content Guidelines
- **Title**: Short, clear (max 50 characters)
- **Description**: Concise, actionable (max 150 characters)
- **Button**: Action-oriented ("Register Now", not just "Click Here")

---

## 🚀 Advanced Customization

### Add Custom Popup Type

1. Add new type to interface:
```typescript
type: "event" | "whatsapp" | "emergency" // Add new type
```

2. Add rendering logic in PopupManager.tsx:
```typescript
{currentPopup.type === "emergency" && (
  <div>
    {/* Your custom emergency popup design */}
  </div>
)}
```

### Make Popup Show Multiple Times

Change from localStorage to sessionStorage:

```typescript
// In useEffect
const storedShownPopups = sessionStorage.getItem("shownPopups"); // Shows once per session
```

### Add Analytics Tracking

```typescript
const handleButtonClick = () => {
  // Track click
  if (typeof gtag !== 'undefined') {
    gtag('event', 'popup_click', {
      popup_id: currentPopup.id,
      popup_type: currentPopup.type
    });
  }

  // Rest of the code...
}
```

---

## 🐛 Troubleshooting

### Popup Not Showing
1. Check if already shown (clear localStorage)
2. Check delay time
3. Check popup ID is unique
4. Check browser console for errors

### Popup Shows Every Time
1. Check if using localStorage (not sessionStorage)
2. Check if localStorage is enabled in browser
3. Check if popup ID matches

### Popup Positioning Issues
- Popup uses fixed positioning and centers automatically
- Check z-index if other elements overlap (currently z-50)
- Test on mobile devices

---

## 📱 Mobile Considerations

The popup is responsive and works on all devices:
- Max width: 448px (md breakpoint)
- Padding: 16px on mobile
- Touch-friendly close button
- Readable text sizes

---

## 🔒 Privacy & Storage

- Uses **localStorage** for permanent tracking
- Stores only popup IDs (no personal data)
- User can clear at any time
- No cookies used

---

## 📊 Example Scenarios

### Scenario 1: Health Camp Announcement
```typescript
{
  id: "health-camp-feb-2026",
  type: "event",
  delay: 5,
  content: {
    title: "Free Health Camp - Feb 15, 2026",
    description: "Free health check-ups, BP monitoring, and medicines. Ward Office, 9 AM - 5 PM.",
    buttonText: "Register Now",
    buttonLink: "/connect?mode=contact",
  },
}
```

### Scenario 2: Emergency Alert
```typescript
{
  id: "water-supply-alert",
  type: "event",
  delay: 2, // Show quickly for emergencies
  content: {
    title: "Water Supply Disruption Alert",
    description: "Water supply will be interrupted on Jan 25 from 10 AM - 4 PM for maintenance work.",
    buttonText: "View Details",
    buttonLink: "/ward",
  },
}
```

### Scenario 3: Youth Program Enrollment
```typescript
{
  id: "youth-program-2026",
  type: "event",
  delay: 7,
  content: {
    title: "Youth Leadership Program Open!",
    description: "Applications open for our Youth Leadership Program. Limited seats available.",
    buttonText: "Enroll Now",
    buttonLink: "/connect?mode=youth",
  },
}
```

---

## 💡 Tips

1. **Update Event Dates Regularly**: Keep event information current
2. **Test on Multiple Devices**: Ensure popups work everywhere
3. **Monitor User Feedback**: Adjust timing if users complain
4. **Use Clear CTAs**: Make button actions obvious
5. **Keep Content Fresh**: Update announcements regularly

---

## 🔧 Quick Reference

| What to Change | Where to Change It | Line Number |
|----------------|-------------------|-------------|
| Event title | `popups` array → first item → `title` | ~19 |
| Event timing | `popups` array → first item → `delay` | ~18 |
| WhatsApp number | `popups` array → second item → `buttonLink` | ~31 |
| WhatsApp timing | `popups` array → second item → `delay` | ~27 |
| Add new popup | `popups` array | ~16 |

---

Need help? Check the code comments in `PopupManager.tsx` or reach out!
