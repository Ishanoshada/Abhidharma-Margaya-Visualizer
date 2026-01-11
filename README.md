
<div align="center">


  # The Path of Abhidhamma (අභිධර්ම මාර්ගය)

  **An interactive, web-based visualization of the mind and matter according to Theravāda Abhidhamma.**

  ![1](/imgs/1.png)
  


  [![Status](https://img.shields.io/badge/status-active-success.svg)]()
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

  ---

  ### [🚀 View the Live Application 🚀](https://abhidhamma.ishanoshada.com)

</div>

## 🌟 Introduction

<center>

  ![6](/imgs/6.png)

</center>

**The Path of Abhidhamma** is a modern, interactive learning tool designed to make the profound and intricate teachings of the Theravāda Abhidhamma accessible to everyone. The Abhidhamma, the "higher teaching" of the Buddha, provides a systematic and deeply analytical framework for understanding the nature of consciousness, mental factors, matter, and the ultimate reality of existence.

This project's primary goal is to visually demonstrate the core Buddhist doctrine of **Anatta (Non-Self)**. Through a series of dynamic simulations, it deconstructs what we perceive as a "person" or "self" into its fundamental components: an impersonal, conditioned, and incredibly rapid stream of mind-moments (*citta*) and material phenomena (*rūpa*).

The visualizations are largely based on the teachings of the highly respected Sri Lankan scholar-monk, **Venerable Rerukane Chandawimala Mahā Nāyaka Thero**, particularly his seminal work, *'Abhidharma Mārgaya'*.


<center>

  ![2](/imgs/2.png)

</center>

<center>

  ![3](/imgs/3.png)

</center>

## ✨ Key Features

This application is divided into several sections, each exploring a fundamental concept of Abhidhamma through unique visualizations.

| Feature                                          | Description                                                                                                                                                             |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🕉️ **Foundation (පදනම)**                        | Interactive animations explaining core concepts like Conventional vs. Ultimate Reality, the Four Ultimate Realities (Citta, Cetasika, Rūpa, Nibbāna), and Rūpa Kalāpas. |
| 🌊 **Citta Vīthi Visualization (චිත්ත වීථි)**    | The core simulation showing a real-time stream of mind-moments (cittas) processing a meditation object, complete with a Dhyāna progression graph and a live Citta Log.  |
| 🧘 **Arpaṇa Vīthi (අර්පණ වීථි)**                  | Visualizes the advanced mind-processes for attaining deep meditative absorptions (Jhāna) and the supramundane Paths & Fruits of enlightenment (Magga-Phala).       |
| 🖐️ **Five Aggregates (පඤචස්කන්ධය)**              | An interactive animation that deconstructs a sensory experience into the five components of existence: Form, Feeling, Perception, Formations, and Consciousness.        |
| ☸️ **Dependent Origination (පටිච්චසමුප්පාදය)**     | A dynamic wheel visualizing the 12 links of causality that explain the cycle of rebirth (Saṃsāra) and the arising of suffering.                                      |
| 🔗 **24 Conditions (සුවිසි ප්‍රත්‍යය)**             | Demonstrates the intricate causal relationships of Paṭṭhāna using everyday examples like walking and blinking, revealing the interconnectedness of all phenomena.     |
| 😴 **Dream State (සිහින)**                       | Shows how dreams are simply a type of mind-door process (*Mano-dvāra-vīthi*), arising from memory-images with unwholesome impulsive moments (*javana*).               |
| 神通 **Higher Knowledges (අභිඤ්ඤා)**                 | Explains the mind-processes required to attain supernormal abilities like mind-reading and clairaudience, showing them as natural extensions of a concentrated mind. |
| 💀 **Dying Process (මරණාසන්න)**                  | Visualizes the final, karmically potent mind-moments at death that condition the next rebirth, bridging one life to the next.                                        |
| 🔄 **Rebirth (පුනරුත්පත්තිය)**                     | Illustrates the impersonal process of "again-becoming" (*Punabbhava*) into different realms of existence based on the final thought-process of the previous life.     |
| 🌍 **Multi-language Support**                   | The application interface and explanations are available in English, Sinhala (සිංහල), Tamil (தமிழ்), and Hindi (हिन्दी).                                                     |




<center>

  ![4](/imgs/4.png)

</center>


<center>

  ![5](/imgs/5.png)

</center>


## 🌱 Philosophical Foundation

The ultimate purpose of these visualizations is to cultivate insight into the **Three Characteristics of Existence (Tilakkhaṇa)**:

1.  **Anicca (Impermanence):** The timeline visualizations vividly show each *citta* flashing into existence for a single, infinitesimally small moment before immediately perishing. This demonstrates the radically impermanent and transient nature of consciousness.
2.  **Dukkha (Unsatisfactoriness):** By observing that this entire process is impersonal, uncontrollable, and constantly in flux, one can understand why clinging to any part of it as "me" or "mine" is inherently stressful and leads to suffering.
3.  **Anatta (Non-Self):** This is the central theme. Across all modules, the application shows that there is no "self," "soul," or "agent" behind the scenes directing the flow of thoughts or experiences. What we call a "being" is nothing more than this empty, conditioned process of cause and effect unfolding according to its own natural laws.

By deconstructing the illusion of a solid, continuous self, one can see reality more clearly and weaken the deep-rooted attachments that are the cause of all suffering.

<center>

  ![7](/imgs/7.png)

</center>

## 🛠️ Technology Stack

This project is built with a modern, lightweight, and performant technology stack, requiring no complex build process.

-   **Frontend:** [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (via CDN) for a utility-first design system.
-   **Charting:** [Recharts](https://recharts.org/) for creating the Dhyāna progression graph.


<center>

  ![8](/imgs/8.png)

</center>

<center>

  ![9](/imgs/9.png)

</center>


### 🕹️ The Mind-Process  (Live Telemetry)

The flagship feature of this application is a high-performance, unified dashboard designed as an **"Active Telemetry Terminal"** for the mind. It synchronizes multiple layers of Abhidhamma into a single "Master Heartbeat" (Tick):

<center>

  ![10](/imgs/10.png)

</center>


* **Causal Kernel Execute:** A futuristic terminal that auto-types logic snippets (`citta_vithi.init()`, `finalize(Kamma)`) in real-time as each Citta arises, demonstrating the script-like nature of mental processes.
* **Paticcasamuppāda Causal Wheel:** A dynamic node-link ring that highlights the 12 links of Dependent Origination based on the current Citta type (e.g., highlighting *Tanha/Upadana* during unwholesome states).
* **Neural Resonance Density:** A scatter-plot visualization tracking the "clustering" of Cetasikas (Mental Factors) within each mind-moment.
* **Aggregate Balance Radar:** A real-time radar chart providing a geometric profile of the Five Aggregates (*Pancha Skandha*) in constant flux.
* **Causal Synchronicity & Momentum:** Advanced area and line charts tracking mental harmony vs. resistance and the "momentum" of wholesome/unwholesome energy.

* **Default:** Monastic-modern slate and cyan.
* **Hacky:** A high-contrast "Terminal" aesthetic with lime accents.
* **Matrix:** Deep black and green for a "back-end reality" feel.
* **Neon:** Vibrant fuchsia and purple for high-intensity visualization.
<center>

  ![11](/imgs/11.png)

</center>


## 📁 Project Structure

The project is organized into a clean and modular structure to promote readability and maintainability.

```
/
├── components/         # Contains all React components, organized by feature
├── constants.ts        # Core data: CITTAS, CETASIKAS, VITHI sequences, etc.
├── explanations.ts     # Content for all the informational modals
├── types.ts            # Centralized TypeScript type definitions
├── App.tsx             # The main application component, managing state and layout
├── index.html          # The entry point of the application
├── index.tsx           # The React root renderer
└── README.md           # You are here!
```

## 🚀 Getting Started

To run this project locally, you only need a modern web browser and a simple local server.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ishanoshada/Abhidharma-Margaya-Visualizer.git
    cd Abhidharma-Margaya-Visualizer
    ```

2.  **Serve the files:**
    The project is a static site and can be served by any simple HTTP server. If you have Python installed, you can run:
    ```bash
    # For Python 3
    python -m http.server
    ```
    Alternatively, you can use a VS Code extension like [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

3.  **Open in your browser:**
    Navigate to `http://localhost:8000` (or the port provided by your server).



---

### ✨ Key Features (Table Update)

*පවතින වගුවේ අගට මෙම පේළිය එක් කරන්න:*

| Feature | Description |
| --- | --- |
| 🕹️ **Process Cockpit** | A unified command center synchronizing Citta-Vithi, Patthana Matrix, and Paticcasamuppada with real-time analytics. |

---

ය තාක්ෂණිකව මෙන්ම ශාස්ත්‍රීයවත් ඉතාමත් දියුණු මට්ටමක පවතී.
## 🤝 Contributing

Contributions are welcome and greatly appreciated! Whether you're fixing a bug, improving a translation, adding a new visualization, or enhancing the documentation, your help makes this project better.

Please follow these steps to contribute:
1.  **Fork** the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes and **commit** them with a clear message.
4.  **Push** to your branch (`git push origin feature/your-feature-name`).
5.  Create a **Pull Request**.

## 🙏 Acknowledgments & References

This project would not have been possible without the profound wisdom contained in the teachings of the Buddha and the clear, systematic explanations provided by great scholar-monks.

-   **Primary Reference:** The structure and content are deeply inspired by **"Abhidharma Mārgaya"** by the Venerable **Rerukane Chandawimala Mahā Nāyaka Thero**.
-   **Additional Reference:** **"Fundamental Principles of Abhidhamma"** from [pitaka.lk](https://pitaka.lk/).
-   **Created by:** [Ishan Oshada](https://www.ishanoshada.com).

## ⚖️ Disclaimer

This project is an educational tool and a personal effort to understand and visualize the profound teachings of the Abhidhamma. While every effort has been made to ensure accuracy, errors may exist in the presentation or interpretation. For authoritative understanding, please refer to the original Tipiṭaka sources and consult with qualified teachers.

---

<div align="center">
  *May this effort contribute to the understanding of the Dhamma and the liberation of all beings.*
</div>