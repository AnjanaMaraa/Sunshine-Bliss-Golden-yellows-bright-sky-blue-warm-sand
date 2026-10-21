/**
 * ARJUN & MEERA - Wedding Invitation Configuration
 * Centralized data source for the digital invitation.
 */

const invitationData = {
  couple: {
    groom: "Arjun",
    bride: "Meera",
    groomShort: "Arjun",
    brideShort: "Meera"
  },

  wedding: {
    date: "2024-08-16", // YYYY-MM-DD
    time: "", // Leave empty if not known
    timezone: "Asia/Kolkata",
    displayDate: "16 August 2024",
    displayTime: ""
  },

  theme: {
    colors: {
      turquoiseSurf: "#06aed5",
      cerulean: "#086788",
      brightAmber: "#f0c808",
      papayaWhip: "#fff1d0",
      primaryScarlet: "#dd1c1a"
    }
  },

  hero: {
    image: "assets/images/mandap-bg.jpg",
    title: "Arjun & Meera",
    subtitle: "Two hearts, one beautiful journey. Join us as we celebrate our special day.",
    cta: "Discover Our Invitation"
  },

  entrance: {
    enabled: true,
    title: "Tap to Open",
    cardTitle: "Wedding Invitation",
    cardSubtitle: "Arjun & Meera",
    cardDate: "16.08.2024"
  },

  scratchReveal: {
    enabled: true,
    threshold: 0.5,
    heading: "Scratch to Reveal",
    subheading: "You're Invited!",
    revealedHeading: "Save the Date",
    revealedSubheading: "We're getting married!"
  },

  events: [
    {
      id: "guest-arrival",
      title: "Guest Arrival",
      date: "2024-08-16",
      time: "",
      description: "Welcoming our loved ones as they arrive for the celebration.",
      icon: "arrival"
    },
    {
      id: "wedding-ceremony",
      title: "Wedding Ceremony",
      date: "2024-08-16",
      time: "",
      description: "The main ceremony where we exchange our vows and begin our journey together.",
      icon: "ceremony"
    },
    {
      id: "reception",
      title: "Reception",
      date: "2024-08-16",
      time: "",
      description: "An evening of joy, dinner, and celebration with family and friends.",
      icon: "reception"
    }
  ],

  venue: {
    enabled: false, // Set to true when details are provided
    name: "",
    address: "",
    googleMapsUrl: "",
    image: ""
  },

  dressCode: {
    enabled: false, // Set to true when details are provided
    categories: [
      {
        label: "Women",
        description: ""
      },
      {
        label: "Men",
        description: ""
      }
    ]
  },

  preWeddingEvents: [],

  transportation: {
    enabled: false,
    details: ""
  },

  accommodation: {
    enabled: false,
    details: ""
  },

  gifts: {
    enabled: true,
    message: "Your love, blessings, and presence are the greatest gifts we could ever ask for."
  },

  rsvp: {
    enabled: true,
    heading: "RSVP",
    subheading: "We would love to celebrate this special moment with you.",
    fields: {
      name: { label: "Your Name", placeholder: "Enter your name" },
      attendance: { label: "Will you be attending?", options: ["Yes, I'll be there!", "No, I can't make it.", "Maybe"] },
      message: { label: "Your Message", placeholder: "Write your wishes..." }
    },
    submitText: "Send RSVP"
  },

  music: {
    enabled: false,
    source: "",
    autoplay: false
  },

  footer: {
    credit: "Website developed by Digimaraa Technologies",
    creditUrl: "https://digimaraa.com"
  }
};

// Export if needed for modules, though using global script for simplicity in vanilla
if (typeof module !== 'undefined' && module.exports) {
  module.exports = invitationData;
}
