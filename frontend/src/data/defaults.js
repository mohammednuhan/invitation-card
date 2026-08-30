export const DEFAULT_DATA = {
  slug: "nuhan",
  couple: {
    groom: {
      name: "Mohammed Meehan",
      fullName: "Mohammed Meehan",
      father: "",
      image: "/images/groom.svg",
      bio: "The one whose calm heart became my home and my forever prayer."
    },
    bride: {
      name: "Ariba Muqthar",
      fullName: "Ariba Muqthar",
      father: "",
      image: "/images/bride.svg",
      bio: "The one whose smile made every ordinary day feel extraordinary."
    },
    date: "2026-12-20T12:00:00+05:30",
    venueName: "The Royal Heritage Palace",
    venueAddress: "12, MG Road, Jaipur, Rajasthan 302001",
    themeWord: "With the blessings of Allah"
  },
  story: [
    {
      title: "Haldi",
      date: "December 18, 2026",
      text: "A joyful celebration filled with turmeric, laughter, and blessings as we prepare for the big day.",
      image: "/images/story-1.jpg"
    },
    {
      title: "Nikah",
      date: "December 20, 2026",
      text: "In the presence of Allah and our loved ones, we become one. Qubool hai, Qubool hai, Qubool hai.",
      image: "/images/story-4.jpg"
    },
    {
      title: "Walima",
      date: "December 21, 2026",
      text: "A grand celebration of two hearts, two souls, and two families becoming one.",
      image: "/images/story-5.jpg"
    }
  ],
  events: [
    {
      title: "Haldi",
      icon: "flower",
      date: "18 Dec 2026",
      time: "10:00 AM - 01:00 PM",
      venue: "Mohammed Meehan's Residence, Sector 14"
    },
    {
      title: "Nikah",
      icon: "rings",
      date: "20 Dec 2026",
      time: "12:00 PM",
      venue: "The Royal Heritage Palace, Jaipur, Rajasthan"
    },
    {
      title: "Walima",
      icon: "plate",
      date: "21 Dec 2026",
      time: "01:00 PM",
      venue: "Beekanahalli, Chikkamagaluru, Karnataka 577102"
    }
  ],
  family: {
    groom: {
      name: "Mohammed Meehan's Family",
      members: [
        { relation: "Father", name: "Shakeel Ahmed", image: "" },
        { relation: "Mother", name: "Jowhar Sultana", image: "" },
        { relation: "Education", name: "Mechanical Engineering", image: "" }
      ]
    },
    bride: {
      name: "Ariba Muqthar's Family",
      members: [
        { relation: "Father", name: "Muqthar Ahmed", image: "" },
        { relation: "Mother", name: "Jasmin", image: "" },
        { relation: "Education", name: "Bcom, MBA", image: "" }
      ]
    }
  },
  venue: {
    name: "The Royal Heritage Palace",
    address: "12, MG Road, Jaipur, Rajasthan 302001",
    landmark: "Opposite City Museum, near Central Park",
    parking: "Valet parking available at the main entrance",
    mapEmbed:
      "https://www.google.com/maps?q=Jaipur&output=embed",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Jaipur"
  },
  rsvp: {
    whatsapp: "919876543210"
  },
  theme: {
    primary: "#d4a03c",
    background: "#fdf8ec",
    accent: "#f0d48a"
  }
};

export const FALLBACK_IMAGES = {
  bride: "/images/bride.svg",
  groom: "/images/groom.svg",
  story: "/images/story-1.jpg"
};
