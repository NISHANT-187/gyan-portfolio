# Hi, I'm Nishant Kumar 👋
### Computer Science Undergraduate | Full-Stack Developer | IoT Enthusiast | Defence Technology Explorer
🌐 Portfolio: https://my-portfolio-nishant.vercel.app/
---

## 👨‍💻 Profile Summary

I am a highly driven **Computer Science Undergraduate** at **KL University**. I have a strong passion for designing scalable backend systems, developing responsive interactive frontends, and building hardware-level IoT/embedded solutions.

* 🎓 **B.Tech CSE** at KL University, Vaddeswaram
* 💻 **Full-Stack Development** using React, Spring Boot, and modern CSS systems
* ☕ **Backend Architecture** focusing on REST APIs, JWT authentication, and RBAC
* 📡 **IoT & Embedded Systems** flashing firmware onto ESP32 and Arduino boards
* 🏛 **Defence Technology Explorer** fascinated by aerospace & military tech innovation
* 🚀 **Product Building Mindset** focused on shipping functional, polished solutions

---

## 🛠 Skills & Profile Badges

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)
![Python](https://img.shields.io/badge/python-%233776AB.svg?style=for-the-badge&logo=python&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%234479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![IoT](https://img.shields.io/badge/IoT-Smart%20Systems-%2300b4d8.svg?style=for-the-badge&logo=arduino&logoColor=white)
![HackerRank](https://img.shields.io/badge/-HackerRank-2EC866?style=for-the-badge&logo=HackerRank&logoColor=white)

---

## 💼 Professional Experience

### 🐝 Intern (Full Stack MERN Developer)
**BeeSkilled** · Remote Internship | *May 2026 – Jun 2026*
* Successfully completed a 6-week intensive MERN Stack development program.
* Developed responsive web applications, created RESTful APIs, managed MongoDB databases, and implemented authentication flows.
* Strengthened practical workflows using Git, Express.js, React, Node.js, and MongoDB.

---

## 🎓 Certifications

* 🛠️ **Implement a Responsible Generative AI Solution** — *Microsoft Foundry*
* 🤖 **Google AI Essentials** — *Google*
* ⚡ **AI Skills Fest 2026** — *Skills Fest (Microsoft Badge)*
* 📡 **Getting Started with Cisco Packet Tracer** — *Cisco Networking Academy*
* ☕ **Java Spring Boot** — *Board Infinity*
* 🌐 **Full-Stack React with Spring Boot** — *Board Infinity*
* 🍃 **Building Applications with Spring Boot & MVC Architecture** — *Board Infinity*
* 🍃 **Spring – Ecosystem and Core** — *LearnQuest*

---

## 🚀 Project Overview: Neo-Brutalist Portfolio

> [!NOTE]
> This repository houses my personal portfolio site — a custom-crafted playground built entirely using vanilla **HTML**, **CSS**, and **JavaScript** (no heavy frameworks, no bloated dependencies). 

### 💡 The Problem
Standard developer portfolios look identical: rounded corners, smooth pastel gradients, minimalist gray grids, and cookie-cutter templates. They lack distinct personality and fail to show a strong mastery of front-end engineering fundamentals.

### 🎯 Purpose of the Project
To construct a highly memorable, high-impact personal landing page that stands out to technical recruiters. It serves as a visual showcase of my engineering projects, skills, certifications, and interest areas using a customized **Neo-Brutalist Scrapbook** design language.

### 🌟 Real-World Impact
Demonstrates raw front-end performance, custom animation engineering (custom 3D transforms, gravity-based falling physics), interactive map controllers, and a retro CLI terminal mode that runs an embedded game.

---

## ✨ Key Features

* **🎨 Responsive Neo-Brutalist Design**: Thick black borders (`4px solid`), flat offset shadows, high-contrast HSL-curated color palettes, and playful scrapbook details.
* **🗺️ Resilient Project Map (Leaflet.js)**: Coordinate map showing project hotspots.
  * **Dynamic Lazy Loading**: Map CSS/JS are loaded only when the viewport is crossed, maximizing initial page performance.
  * **Loading Skeleton & Retry Overlay**: Integrated a skeleton spinner loader and a retry interface that displays if internet connectivity/Leaflet services fail.
  * **Map Zoom Reset Control**: A custom home-control button to reset center coordinates dynamically.
* **📖 3D Book-Flip Timeline**: Interactive "Projects Journey" section that starts as a closed treasure map and dynamically flips open like a book page as the user scrolls.
* **🎛️ Interactive Multi-Format Resume Modal**: Overlay desk application frame with:
  * **Terminal Mode**: Retro terminal environment (`terminal.html`) embedded in a sandboxed `iframe`.
  * **Visual Resume**: A high-fidelity resume rendering (`Nishant_Kumar_Resume.jpg`) with color-adjusting backplates.
  * **PDF Resume**: Direct download wrapper card with custom action buttons.
* **⚡ Enhanced Command CLI Subpage**: Access a retro command-line terminal featuring:
  * **Window Control Suite**: Windows/macOS style window control dots (Close, Minimize, Maximize) mapped to keyboard shortcuts (e.g., `Escape` triggers parent window messages to exit).
  * **Full Maximization State**: Green dot button toggles full viewport size.
  * **New Commands**: 
    * `theme [default|dracula|nord|solarized]` changes color palette styles.
    * `resume` / `pdf` dynamically triggers PDF download and appends a functional download button directly in output log history.
    * `snake` / `game` command runs an embedded p5.js Snake game.
  * **Robust Input Parser**: Sanitizes trailing spaces and processes commands case-insensitively while preserving argument formatting.
* **🛸 Scroll-Driven Highlights**: Highlights and markup lines dynamically animate left-to-right as they enter the viewport, simulating a highlighter pen.
* **📲 Tactile Discord Clipboard Copy**: A customized Discord card that copies `og_nishantjod_47792` to the clipboard on-click, showing `"Copied!"` visual feedback.
* **♿ Keyboard Accessibility & Inclusivity**:
  * **Skip Link**: Added a `.skip-link` allowing keyboard users to bypass header items.
  * **Visible Focus Indicators**: Customized high-contrast focus rings (`:focus-visible`) across all links, buttons, and text fields.
  * **Reduced Motion Query Compliance**: Strict CSS media queries override and disable layout scaling, keyframe animations, and shape-shift transitions for visitors with `prefers-reduced-motion` enabled.

---

## 🏗 Portfolio Architecture

The application is completely static, optimized for high-speed page loads and visual responsiveness. All DOM operations, modal states, event loops, and dynamic components are handled through decoupled, cache-optimized script layers.

```mermaid
graph TD
    User([Visitor / Recruiter]) --> Navbar{Navigation}
    
    %% Main Sections
    Navbar --> Hero[Hero Section]
    Navbar --> About[About Section]
    Navbar --> Experience[Work Experience Section]
    Navbar --> Projects[Projects Journey & Interactive Map]
    Navbar --> Skills[Skills & CS Fundamentals]
    Navbar --> Certs[Certifications Showcase]
    Navbar --> Contact[Get In Touch Grid]
    
    %% Interactive Elements
    Hero --> MatrixText[Matrix Scrambler Text]
    Hero --> PhysicsIcons[Gravity-based Falling SVGs]
    Navbar --> ResumeModal[Interactive Resume Modal]
    ResumeModal --> VisualTab[Visual JPG Resume Tab]
    ResumeModal --> PDFTab[PDF Download Tab]
    ResumeModal --> TerminalTab[Retro Terminal Tab]
    
    Projects --> BookFlip[3D Book-page Flip Animation]
    BookFlip --> MapControl[Leaflet.js Map]
    MapControl --> MapControls[Home Control & Dynamic Loader]
    MapControl --> FlyToCoord[Fly-to Marker Coords]
    Contact --> DiscordClick[Discord Card Copy Clipboard]
    
    %% Subpages
    TerminalTab --> Terminal[Interactive Retro Terminal Mode]
    Terminal --> SnakeGame[p5.js Embedded Snake Game]
    Terminal --> CmdHistory[Command Line Interpreter]
    Terminal --> ColorThemes[Theme Switcher]
```

---

## 🛠 Tech Stack

### Frontend & Core
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=flat&logo=javascript&logoColor=black)

### Libraries & Fonts
* **Leaflet.js** — Dynamic map rendering and coord mapping
* **p5.js** — Snake game rendering in retro terminal
* **Font Awesome** — Typography and brand icons
* **Google Fonts** — Space Grotesk, Space Mono, Caveat

### Deployment
![GitHub Pages](https://img.shields.io/badge/github%20pages-%23121011.svg?style=flat&logo=github&logoColor=white)

---

## 📸 Mockup Overview

<p align="center">
  <em>Interactive Portfolio Interface Showcase</em>
</p>

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   [ HERO SECTION ] - Animated Photo, Falling SVGs, Matrix Intro  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   [ ABOUT ME ] - Highlighter Animation & Custom Profiles        │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   [ WORK EXPERIENCE ] - Remote MERN Internship Grid Details     │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   [ TIMELINE & MAP ] - 3D Book Flip Page & Leaflet.js Mapping    │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   [ CERTIFICATIONS ] - Custom Tally Badges & Credential Grid     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 👨‍💻 About the Developer

**Nishant Kumar**
B.Tech CS Student with deep interests in full-stack engineering, systems programming, and defence aerospace design.

### Emojis/Interests:
* 🏛 **Defence Technology** & Military hardware
* 🚁 **Aerospace & Military Innovation**
* 🤖 **Backend & Systems Engineering**
* 🌐 **Full-Stack Development** & System Design
* 📡 **IoT & Embedded Systems** (Arduino/ESP32)
* 🌍 **Geopolitics** & International Relations
* 📰 **World Affairs & Current Events**
* 🚀 **Startups & Product Building**

---

## 🤝 Connect With Me

Let's collaborate or discuss software engineering roles!

* 💼 **LinkedIn**: [Nishant Kumar](https://www.linkedin.com/in/nishant-kumar-a166a3305)
* 💻 **GitHub**: [@NISHANT-187](https://github.com/NISHANT-187)
* 🏆 **HackerRank**: [@h2400033286](https://www.hackerrank.com/profile/h2400033286)
* 🍳 **CodeChef**: [@kl2400033286](https://www.codechef.com/users/kl2400033286)
* 📧 **Email**: [nishant1872005@gmail.com](mailto:nishant1872005@gmail.com)
* 💬 **Discord**: `og_nishantjod_47792` (Display: `OG_NishantJOD`)

---

## 📊 GitHub Statistics

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=NISHANT-187&show_icons=true&theme=radical" alt="Nishant's GitHub Stats" />
</p>

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=NISHANT-187&layout=compact&theme=radical" alt="Top Languages" />
</p>

---

## 📌 Project Status

* **Status**: Completed / Active Maintenance
* **Future Enhancements**:
  - Integrate a custom physics simulation sandbox on the home page.
  - Expand terminal command capabilities with automated file downloads.
  - Deeper local map integration with customized Stamen raster maps.

---

## 📄 License

This project is **proprietary**. All rights reserved. You may browse the source code for inspiration, but copying, modifying, or redistributing any part of it without written permission is not allowed. See the [LICENSE](LICENSE) file for details.
