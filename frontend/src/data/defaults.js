export const DEFAULT_DATA = {
  slug: "nuhan",
  couple: {
    bride: {
      name: "Ariba",
      fullName: "Ariba",
      father: "",
      image: "/images/bride.jpg",
      bio: "The one whose smile made every ordinary day feel extraordinary."
    },
    groom: {
      name: "Mohammed Meehan",
      fullName: "Mohammed Meehan",
      father: "",
      image: "/images/groom.jpg",
      bio: "The one whose calm heart became my home and my forever prayer."
    },
    date: "2026-12-20T12:00:00+05:30",
    venueName: "The Royal Heritage Palace",
    venueAddress: "12, MG Road, Jaipur, Rajasthan 302001",
    themeWord: "With the blessings of Allah"
  },
  story: [
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
      title: "Nikah",
      icon: "rings",
      date: "20 Dec 2026",
      time: "12:00 PM",
      venue: "The Royal Heritage Palace",
      dressCode: "Formal / Traditional"
    },
    {
      title: "Reception",
      icon: "glass",
      date: "20 Dec 2026",
      time: "07:00 PM Onwards",
      venue: "The Royal Heritage Palace",
      dressCode: "Evening Wear / Cocktail"
    },
    {
      title: "Haldi",
      icon: "flower",
      date: "18 Dec 2026",
      time: "10:00 AM - 01:00 PM",
      venue: "Mohammed Meehan's Residence, Sector 14",
      dressCode: "Yellow / Bright Colors"
    },
    {
      title: "Mehendi",
      icon: "hand",
      date: "19 Dec 2026",
      time: "04:00 PM - 08:00 PM",
      venue: "Ariba's Residence, Civil Lines",
      dressCode: "Green / Pastel"
    },
    {
      title: "Walima",
      icon: "plate",
      date: "21 Dec 2026",
      time: "01:00 PM",
      venue: "8QPW+CW, Beekanahalli (Rural), Chikkamagaluru, Karnataka 577102",
      dressCode: "Formal / Ethnic"
    }
  ],
  family: {
    bride: {
      name: "Ariba's Family",
      members: [
        { relation: "Father", name: "Md. Rahmat Ali", image: "" },
        { relation: "Mother", name: "Rubina Khatoon", image: "" },
        { relation: "Brother", name: "Arman Ali", image: "" },
        { relation: "Sister", name: "Sana Khatoon", image: "" }
      ]
    },
    groom: {
      name: "Mohammed Meehan's Family",
      members: [
        { relation: "Father", name: "Md. Abdul Rahman", image: "" },
        { relation: "Mother", name: "Noorjahan Begum", image: "" },
        { relation: "Brother", name: "Faiz Rahman", image: "" },
        { relation: "Sister", name: "Maryam Rahman", image: "" }
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
  bride: "/images/bride.jpg",
  groom: "/images/groom.jpg",
  story: "/images/story-1.jpg"
};
