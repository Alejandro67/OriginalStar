# OriginalStar

This project was created in the 2024 NASA Space Apps Challenge.

Our members are:
Alejandro Martinez
Kevin Matsuda
Ulises Olmos
Marcos Varela
Daniel Cajusol
Fernando Bernal

The local event is Cordoba - Argentina.

Challenge name : Exosky!

# High level project summary

For decades, astronomy studies mapped the universe with great detail. Thanks to space and ground telescopes, we have a big catalog of stars with precise information like location and brightness. However, most of the information is Earth centered. With the increase of exoplanets that were found, we now have the opportunity to visualize the sky/space from different points of view. 
Currently, there are no friendly tools that allow us to visualize the sky from a different point of view. This limits students and non-experts to connect with the universe beyond the Earth POV, which means a gap in the education and scientific dissemination.

Our application pretends to fill this gap, allowing users to select an exoplanet and visualize Exosky. This means you can:
explore the sky from different POV.
visually relate stellar catalog data with human experience of observing the night sky.

Our main goal is to facilitate the understanding of astronomical concepts like star position and brightness for students at various levels, from elementary to high schools, and hopefully, inspire greater scientific curiosity.

# Project Information

What exactly does it do?
Our app allows users to visualize the night sky as it would appear from the perspective of an exoplanet. By selecting an exoplanet, users can explore a map of stars, constellations, and other celestial bodies, as seen from that distant location. The app provides an interactive experience where users can trace constellations, see star details, and compare the view with the night sky on Earth.
How does it work?
The app uses star catalog data to calculate the positions and brightness of stars from the chosen exoplanet’s perspective. It translates the 3D coordinates of stars from the catalog into a visual map of the night sky, which is displayed to the user. The app allows users to interact with this sky, zooming in on stars and creating custom constellations. We handle the large data sets through efficient processing and rendering techniques to ensure a smooth user experience.
What benefits does it have?
The app provides an engaging way for students and astronomy enthusiasts to learn about space and visualize the sky from a perspective outside of Earth. It helps users better understand the structure of the universe and the concept of exoplanets, making astronomy more accessible. Additionally, the interactive nature of the app encourages exploration and creativity, such as drawing constellations and naming them. This also supports educators in teaching astronomy with a hands-on tool.
What do you hope to achieve?
Our main goal is to foster curiosity and learning about the universe, helping students and enthusiasts visualize and understand how different the night sky might look from other planets. We also aim to bridge the gap between complex astronomical data and user-friendly experiences, allowing more people to engage with space exploration. Ultimately, we hope this app will inspire more interest in science and technology, encouraging students to learn more about space.
What tools, coding languages, hardware, or software did you use to develop your project?
We built the app using Next.js, a React-based framework for server-rendered applications, and TypeScript for type safety. For the user interface, we used Chakra UI, which allowed us to quickly style components and ensure responsiveness across different devices. The star data is processed from a catalog such as the ESA Gaia’s DR3 dataset, which contains billions of stars. For 3D rendering and visualization, we utilized Three.js, a JavaScript library for creating 3D graphics. We chose these tools to ensure the app is interactive, scalable, and efficient, even when processing large datasets.

