import React from 'react';
import { FaGithub, FaMapPin } from "react-icons/fa";
import { HiCode, HiCube, HiDatabase, HiMail, HiBriefcase } from "react-icons/hi";

export const config = {
    developer: {
        name: "Muhammad Aslah",
    },
    social: {
        github: "aslahkp01",
    },
    NAV_ITEMS: [
        { href: '/', label: 'Home' },
        { href: '/projects', label: 'Projects' },
        { href: '/contact', label: 'Contact' }
    ],

    // ======================= SKILLS =======================
    skills: [
        {
            title: "Web Development",
            icon: <HiCode />,
            description: "Frontend and MERN stack development",
            bgClass: "bg-blue-500/10",
            iconClass: "text-blue-500",
            skills: [
                { name: "HTML & CSS", level: "Advanced", hot: true },
                { name: "JavaScript", level: "Intermediate", hot: true },
                { name: "React.js", level: "Intermediate" },
                { name: "Node.js", level: "Intermediate" },
                { name: "MongoDB", level: "Intermediate" }
            ]
        },
        {
            title: "Embedded & Hardware",
            icon: <HiDatabase />,
            description: "Electronics, sensors & microcontrollers",
            bgClass: "bg-emerald-500/10",
            iconClass: "text-emerald-500",
            skills: [
                { name: "Embedded C", level: "Intermediate", hot: true },
                { name: "PIC Microcontrollers", level: "Intermediate" },
                { name: "PCB Design", level: "Intermediate" },
                { name: "KiCad", level: "Intermediate" },
                { name: "Altium", level: "Beginner" }
            ]
        },
        {
            title: "Programming & Tools",
            icon: <HiCube />,
            description: "Languages & simulation tools",
            bgClass: "bg-orange-500/10",
            iconClass: "text-orange-500",
            skills: [
                { name: "Python", level: "Intermediate", hot: true },
                { name: "C++", level: "Intermediate" },
                { name: "Verilog", level: "Beginner" },
                { name: "MATLAB", level: "Intermediate" },
                { name: "HFSS", level: "Intermediate" }
            ]
        }
    ],

    // ======================= EXPERIENCE =======================
    experiences: [
        {
            position: "B.Tech Student – Electronics & Communication",
            company: "Mar Athanasius College of Engineering",
            period: "Oct 2022 – June 2026",
            location: "Kerala, India",
            description:
                "Passionate and self-motivated engineering student focusing on electronics, embedded systems and full-stack web development. Currently pursuing B.Tech in ECE.",
            responsibilities: [
                "Working on academic and personal projects that combine hardware and software.",
                "Learning MERN stack to build real-world web applications.",
                "Designing microwave and RF-based sensors using tools like HFSS.",
                "Building embedded systems with microcontrollers and RF modules."
            ],
            technologies: [
                "C++",
                "Python",
                "JavaScript",
                "MERN Stack",
                "Embedded C",
                "HFSS",
                "MATLAB",
                "KiCad",
                "Altium"
            ]
        }
    ],

    // ======================= PROJECTS =======================
    projects: [
        {
            id: 1,
            title: "Microwave Based Liquid Adulteration Sensor",
            description:
                "Microwave sensor prototype using microstrip antenna principles to detect adulteration in liquids such as milk and honey. Uses dielectric property variations to distinguish pure vs adulterated samples.",
            image: "/projects/project-1.webp",
            technologies: ["HFSS", "Microwave Sensing", "Microstrip Antenna"],
            github: "https://github.com/aslahkp01",
            demo: "#"
        },
        {
            id: 2,
            title: "Wireless Water Level Controller Using RF Modules",
            description:
                "Wireless water level monitoring and motor control system using PIC16F1503 and RF modules. Automatically controls pump operation based on tank level, reducing manual monitoring.",
            image: "/projects/project-2.webp",
            technologies: ["PIC16F1503", "Embedded C", "RF Modules", "Sensors"],
            github: "https://github.com/aslahkp01",
            demo: "#"
        },
        {
            id: 3,
            title: "Temperature Monitoring System",
            description:
                "Temperature variation detection circuit using Op-Amp 741. Provides real-time visual indication when temperature crosses safe limits, improving safety and reliability of electronic systems.",
            image: "/projects/project-3.webp",
            technologies: ["Op-Amp 741", "Analog Electronics", "Sensors"],
            github: "https://github.com/aslahkp01",
            demo: "#"
        },
        {
            id: 4,
            title: "ShopCart – E-Commerce Platform (MERN Stack)",
            description:
                "Full-featured e-commerce web application with product management, shopping cart, user-facing storefront and basic admin panel built using the MERN stack.",
            image: "/projects/project-4.webp",
            technologies: ["MongoDB", "Express", "React.js", "Node.js"],
            github: "https://github.com/aslahkp01",
            demo: "#"
        }
    ],

    // ======================= CONTACT =======================
    contactInfo: [
        {
            icon: <FaGithub className="w-5 h-5" />,
            label: "GitHub",
            value: "@aslahkp01",
            link: `https://github.com/aslahkp01`
        },
        {
            icon: <HiMail className="w-5 h-5" />,
            label: "Email",
            value: "aslahkp007@gmail.com",
            link: "mailto:aslahkp007@gmail.com"
        },
        {
            icon: <FaMapPin className="w-5 h-5" />,
            label: "Location",
            value: "Kerala, India",
            link: null
        }
    ]
};
