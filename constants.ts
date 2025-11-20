import { CVData } from './types';

export const CV_DATA: CVData = {
  name: "Jesse Van Den Berghe",
  title: "Mobile Developer & Agentic AI Enthusiast",
  tagline: "Passionately bridging mobile experiences with intelligent agents.",
  location: "3540 Berbroek, Belgium",
  avatar: "https://github.com/Jesse-VanDenBerghe.png",
  about: "I'm a passionate Mobile Developer who thrives on learning, teaching, and collaborating. With a positive attitude, I like to motivate myself and others to create an environment of continuous improvement. Whenever possible, I'm always ready for some sparring about a technical topic or a chat about anything and nothing. Be aware, my conversations are sprinkled with occasional (bad) jokes.",
  email: "jesse.vandenberghe95@gmail.com",
  socials: [
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/jessevandenberghe/", icon: "linkedin" },
    { platform: "GitHub", url: "https://github.com/Jesse-VanDenBerghe", icon: "github" }
  ],
  hobbies: [
    "Dungeons & Dragons",
    "Running",
    "Hiking"
  ],
  skills: [
    {
      category: "Mobile Development",
      skills: ["Android (Kotlin)", "Jetpack Compose", "iOS (Swift)", "SwiftUI", "SDK Development"]
    },
    {
      category: "Programming & Cloud",
      skills: ["Git", "CI/CD", "AWS", "Python", "Clean Architecture"]
    },
    {
      category: "AI & Emerging Tech",
      skills: ["Agentic AI", "Gemini API", "LLM Integration", "RAG"]
    },
    {
      category: "Languages",
      skills: ["Dutch (Native)", "English (Professional)", "French (Basic)"]
    }
  ],
  certifications: [
    {
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services (AWS)",
      date: "2024" // Assuming 2024 based on context, user can update if needed
    }
  ],
  experience: [
    {
      id: "exp0",
      role: "Mobile Engineer",
      company: "DPG Media",
      location: "Belgium",
      period: "Aug 2025 - Present",
      description: "Transitioned to a full-time role within DPG Media. In addition to continuing my work with the Seduction Team on the Temptation SDK, I joined the Tracking Team. I am now responsible for managing and developing the Tracking SDK, which handles critical data analytics across the entire DPG Media application ecosystem.",
      technologies: ["Android", "iOS", "SDK Development", "Tracking", "AWS", "DevOps"]
    },
    {
      id: "exp1",
      role: "Mobile Developer Consultant",
      company: "StaffYourTribe (DPG Media)",
      location: "Belgium",
      period: "Aug 2024 - Aug 2025",
      description: "As a member of the Seduction Team, I was responsible for the maintenance and development of the Temptation SDK. This SDK is used in multiple apps within the DPG Media ecosystem. I also committed myself to the mobile guild, where I helped organize several guild days.",
      technologies: ["Android", "iOS", "SDK Development", "Mobile Architecture"]
    },
    {
      id: "exp2",
      role: "Tech Lead",
      company: "Wisemen",
      location: "Diepenbeek, Belgium",
      period: "Dec 2023 - Aug 2024",
      description: "This role involved guiding a team of developers into a uniform and efficient way of working. I was responsible for the technical decisions, code reviews, and the overall quality of the codebase.",
      technologies: ["Technical Leadership", "Code Reviews", "Quality Assurance", "Mentoring"]
    },
    {
      id: "exp3",
      role: "Squad Lead",
      company: "Wisemen",
      location: "Diepenbeek, Belgium",
      period: "Aug 2022 - Dec 2023",
      description: "As a squad lead, I successfully led a team in the development and management of multiple projects concurrently. My responsibilities encompassed client communication, team planning, budget estimations, and scope management.",
      technologies: ["Team Leadership", "Project Management", "Client Communication", "Scrum"]
    },
    {
      id: "exp4",
      role: "Android Lead",
      company: "Wisemen",
      location: "Diepenbeek, Belgium",
      period: "June 2020 - Aug 2024",
      description: "I was entrusted with the responsibility of keeping our Android knowledge up to date throughout the entire company. This involved leading bi-weekly meetings to share information, conduct research, coach interns, and deliver workshops.",
      technologies: ["Android", "Research", "Coaching", "Workshops"]
    },
    {
      id: "exp5",
      role: "Android Developer",
      company: "Wisemen",
      location: "Diepenbeek, Belgium",
      period: "Aug 2017 - Aug 2024",
      description: "Worked on or completely developed over 20 Android apps for multiple clients, with some of them reaching over 50k downloads in the store. These apps were complete projects, from design to publishing on the Play Store. Throughout their lifecycle in the store, I also provided maintenance support and implemented feature updates for these apps.",
      technologies: ["Android", "Java", "Kotlin", "Google Play Console"]
    }
  ],
  projects: [
    {
      id: "proj1",
      title: "Temptation SDK",
      description: "A critical mobile SDK for DPG Media's ecosystem, handling complex user engagement flows across multiple high-traffic applications.",
      image: "https://picsum.photos/600/400?random=10",
      tags: ["Android", "SDK", "Kotlin", "Architecture"]
    },
    {
      id: "proj2",
      title: "Agentic Travel Planner",
      description: "An experimental AI-powered mobile agent that autonomously plans trips and itineraries using Gemini, showcasing the future of agentic workflows on mobile.",
      image: "https://picsum.photos/600/400?random=11",
      tags: ["Gemini API", "Android", "Agentic AI", "AWS"]
    },
    {
      id: "proj3",
      title: "Client Portfolio",
      description: "A collection of over 20+ Android applications developed for various clients at Wisemen, serving thousands of users with robust performance.",
      image: "https://picsum.photos/600/400?random=12",
      tags: ["Android", "Production", "Mobile"]
    }
  ]
};