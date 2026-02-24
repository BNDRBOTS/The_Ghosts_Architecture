# The_Ghosts_Architecture
bndr-ghost-architecture/
├── public/
│   ├── fonts/
│   │   ├── NeueMontreal-Regular.woff2    # Primary (custom commercial)
│   │   └── EditorialNew-Italic.woff2      # Accent (contrast weapon)
├── src/
│   ├── App.jsx                             # Main execution file
│   ├── components/
│   │   ├── ghost-core/
│   │   │   ├── KineticTypeSystem.jsx       # Scroll-driven typography engine
│   │   │   ├── GravitationalField.jsx      # Custom physics (no libraries)
│   │   │   ├── TactileNoise.jsx            # Physical screen texture
│   │   │   └── OpticalTracker.jsx          # Micro-movement response
│   │   └── layout/
│   │       ├── AsymmetricBreathing.jsx     # Grid that flows like air
│   │       └── GlassMorph.jsx              # Rounded glass > boxy bentos
│   ├── hooks/
│   │   ├── useScrollNarrative.js            # Content pacing controller
│   │   └── useVariableFont.js                # Axes as interaction parameters
│   └── styles/
│       └── forensic-physics.css              # Raw trig, no external assets
└── package.json                              # Dependencies: minimal, surgical
