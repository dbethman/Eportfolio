export type ProjectCategory =
  | 'All'
  | 'Aerospace & Structures'
  | 'Astrodynamics & Simulation'
  | 'Mechanical & Hardware';

export type SchematicType =
  | 'naca-structure'
  | 'airfoil-testing'
  | 'alternator-diagnostics'
  | 'coilover-brakes';

export interface ProjectItem {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'All'>;
  origin: 'School Project' | 'Personal Project';
  term: string;
  location: string;
  teamContext: string;
  summary: string;
  primaryMetricLabel: string;
  primaryMetricValue: string;
  secondaryMetricLabel: string;
  secondaryMetricValue: string;
  highlights: string[];
  tools: string[];
  schematic?: SchematicType;
  featured?: boolean;
  coverImagePath?: string;
  coverStyle?: 'plot' | 'photo';
  galleryTabLabel?: string;
  reportPdfPath?: string;
  comparisonPhotos?: {
    before: {
      label: string;
      caption: string;
      imagePath: string;
      objectPosition?: string;
    };
    after: {
      label: string;
      caption: string;
      imagePath: string;
      objectPosition?: string;
    };
  };
  galleryFigures?: {
    title: string;
    caption: string;
    imagePath: string;
    surface?: 'light' | 'dark';
  }[];
}

export interface ResearchModule {
  id: string;
  index: string;
  title: string;
  focus: string;
  methods: string[];
  details: string[];
  parameters: {label: string; value: string}[];
  repoName?: string;
  repoUrl?: string;
}

export interface ResearchRepository {
  id: string;
  repoName: string;
  title: string;
  url: string;
  summary: string;
  keyFiles: string[];
  highlights: string[];
  stack: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: 'Research' | 'Engineering Team' | 'Industry';
  highlights: string[];
}

export interface SkillGroup {
  id: string;
  title: string;
  subtitle: string;
  items: {
    name: string;
    context: string;
  }[];
}

export interface ResearchFigure {
  id: string;
  figureNumber: string;
  title: string;
  subtitle: string;
  imagePath: string;
  metrics: string[];
  description: string;
  repoName?: string;
  repoUrl?: string;
}

export interface CourseworkItem {
  code: string;
  title: string;
  credits: string;
  term: string;
  group: 'Completed Core' | 'Fall 2026 & Spring 2027' | 'Senior Sequence';
  discipline: 'Aerospace & ME' | 'Math & Science' | 'Honors & Gen Ed';
  status: 'Completed' | 'In Progress' | 'Preregistered' | 'Planned';
  highlight?: string;
}

export const ASRL_UPDATE_PDF = '/assets/aistudio/ASRL_Update_11-10-2026_88830cac.pdf';

export const ASRL_FIGURES: ResearchFigure[] = [
  {
    id: 'planar-families',
    figureNumber: 'Figure 01',
    title: 'L1–L3 Planar Lyapunov Orbit Families',
    subtitle: 'Generated with a single Pseudo-Arclength Continuation solver',
    imagePath: '/assets/asrl_plots/fig_01_planar_families.png',
    metrics: ['L1, L2 & L3 Families', 'Pseudo-Arclength Continuation', 'Earth–Moon CR3BP'],
    description:
      'Three contiguous planar Lyapunov orbit families about Earth–Moon L1, L2, and L3 generated from a unified pseudo-arclength continuation algorithm.',
    repoName: 'CR3BP-Orbital-Family-Generator',
    repoUrl: 'https://github.com/dbethman/CR3BP-Orbital-Family-Generator',
  },
  {
    id: 'halo-l1-l2',
    figureNumber: 'Figure 02',
    title: 'L1 & L2 3D Halo Orbit Families',
    subtitle: 'Out-of-plane periodic families curving toward the lunar surface',
    imagePath: '/assets/asrl_plots/fig_02_halo_l1_l2.png',
    metrics: ['3D Halo Families', 'L1 & L2 Bifurcation', 'Earth–Moon Rotating Frame'],
    description:
      'Three-dimensional L1 (left) and L2 (right) Halo orbit families demonstrating out-of-plane Z-excursion growth approaching Near-Rectilinear Halo regimes.',
    repoName: 'CR3BP-Orbital-Family-Generator',
    repoUrl: 'https://github.com/dbethman/CR3BP-Orbital-Family-Generator',
  },
  {
    id: 'halo-l3',
    figureNumber: 'Figure 03',
    title: 'L3 3D Halo Orbit Family',
    subtitle: 'Full cislunar out-of-plane continuation across Z up to 1.6 DU',
    imagePath: '/assets/asrl_plots/fig_03_halo_l3.png',
    metrics: ['L3 3D Halo', 'Z up to 1.6 DU', 'Primary & Secondary Reference'],
    description:
      'Large-amplitude 3D Halo family emanating from the collinear L3 Lagrange point opposite the Moon across the Earth–Moon rotating frame.',
    repoName: 'CR3BP-Orbital-Family-Generator',
    repoUrl: 'https://github.com/dbethman/CR3BP-Orbital-Family-Generator',
  },
  {
    id: 'manifolds-system',
    figureNumber: 'Figure 04',
    title: '2D CR3BP Invariant Manifolds (System View)',
    subtitle: 'ASSET-generated stable (blue) and unstable (red) manifold tubes',
    imagePath: '/assets/asrl_plots/fig_04_manifolds_system.png',
    metrics: ['ASSET Script', 'Stable & Unstable Tubes', 'Earth–Moon Cislunar Space'],
    description:
      'Global Earth–Moon rotating-frame visualization of stable and unstable invariant manifold trajectories propagated with an ASSET Python script.',
    repoName: 'Invariant_Manifold_and_Poincare_Section_Generation',
    repoUrl: 'https://github.com/dbethman/Invariant_Manifold_and_Poincare_Section_Generation',
  },
  {
    id: 'manifolds-poincare',
    figureNumber: 'Figure 05',
    title: 'Poincaré Section & Moon-Focused Manifolds',
    subtitle: 'Far-side lunar y = 0 crossings with 1,700 km lunar radius filter',
    imagePath: '/assets/asrl_plots/fig_05_manifolds_poincare.png',
    metrics: ['Δx = 24.0207 km', 'Δvx = 0.7493 m/s', '1,700 km Lunar Cutoff'],
    description:
      'Poincaré section on the far side of the Moon (y = 0) isolating minimum phase-space separation between manifold branches while filtering trajectories inside ~1,700 km of the Moon.',
    repoName: 'Invariant_Manifold_and_Poincare_Section_Generation',
    repoUrl: 'https://github.com/dbethman/Invariant_Manifold_and_Poincare_Section_Generation',
  },
  {
    id: 'l1-l2-transfer',
    figureNumber: 'Figure 06',
    title: 'Unstable L1 to Stable L2 Planar Transfer',
    subtitle: 'Heteroclinic manifold connection via far-side Poincaré matching',
    imagePath: '/assets/asrl_plots/fig_06_l1_l2_transfer.png',
    metrics: ['Δx = 348.3812 km', 'Δspeed = 0.0961 m/s', 'L1 → L2 Transfer'],
    description:
      'Closest manifold intersection linking an L1 periodic orbit unstable manifold to an L2 periodic orbit stable manifold, verified on the far-side Poincaré section.',
    repoName: 'Invariant_Manifold_and_Poincare_Section_Generation',
    repoUrl: 'https://github.com/dbethman/Invariant_Manifold_and_Poincare_Section_Generation',
  },
];

export const RESEARCH_REPOS: ResearchRepository[] = [
  {
    id: 'cr3bp-orbital-family-generator',
    repoName: 'CR3BP-Orbital-Family-Generator',
    title: 'CR3BP Orbital Family Continuation & 3D Visualization',
    url: 'https://github.com/dbethman/CR3BP-Orbital-Family-Generator',
    summary:
      'Python framework generating full Earth–Moon L1–L3 Planar Lyapunov and 3D Halo orbit families via Pseudo-Arclength Continuation (PAC) powered by ASSET (asset_asrl).',
    keyFiles: [
      'PAC_Utilities.py',
      'L1–L3 Halo & Planar Scripts',
      'Plotter.py',
    ],
    highlights: [
      'Architected the core FamilySolver class in PAC_Utilities.py combining shooting and adaptive Pseudo-Arclength Continuation (dS step scaling) across high-gradient gravity fields.',
      'Implemented retry loops, gentle step-scaling, and real-time 3D surface-impact detection against Earth and Moon radii to halt continuation safely.',
      'Serialized converged orbit families (.pkl) for 3D rendering with Earth, Moon, L1–L3 markers, and closest-approach telemetry.',
    ],
    stack: ['Python', 'ASSET (asset_asrl)', 'NumPy', 'SciPy', 'Matplotlib'],
  },
  {
    id: 'invariant-manifold-poincare',
    repoName: 'Invariant_Manifold_and_Poincare_Section_Generation',
    title: 'Invariant Manifold & Poincaré Section Generation',
    url: 'https://github.com/dbethman/Invariant_Manifold_and_Poincare_Section_Generation',
    summary:
      'ASSET-driven Python toolkit targeting periodic CR3BP orbits, propagating stable/unstable invariant manifolds, and extracting continuous Poincaré plane crossings.',
    keyFiles: [
      'Manifold_Functions.py',
      'Closest_Transfer_L1L2',
      'L1_Manifold / L2_Halo_Manifolds',
    ],
    highlights: [
      'Targets periodic orbits via multiple shooting and LGL3 optimal control collocation, extracting stable/unstable eigenvectors from the Monodromy matrix.',
      'Applies lunar impact filtering (< 1,700 km radius) and enforces 1:1:1 aspect-ratio 3D visualizations with Earth and Moon spheres.',
      'Detects continuous Poincaré plane crossings via linear interpolation and maps 3D crossing velocities (Y, Z, V) with Geosynchronous Orbit (GEO) footprint references.',
    ],
    stack: ['Python', 'ASSET (asset_asrl)', 'NumPy', 'Matplotlib'],
  },
];

export const PROFILE = {
  name: 'Dylan Bethman',
  title: 'Aerospace Engineering Undergraduate',
  university: 'The University of Alabama',
  location: 'Tuscaloosa, AL',
  graduation: 'May 2028',
  degree: 'B.S. in Aerospace Engineering',
  gpa: '3.1 / 4.0',
  email: 'dbethman@gmail.com',
  phone: '(779) 216-0361',
  linkedin: 'https://www.linkedin.com/in/dbethman',
  github: 'https://github.com/dbethman',
  resumePath: '/assets/aistudio/Bethman_Dylan_Resume_58980ba2.pdf',
  heroHeadline: 'Astrodynamics, Structural Design, and Hands-On Hardware Engineering.',
  heroLead:
    'Aerospace Engineering student at The University of Alabama researching multi-body trajectory optimization in the Astrodynamics and Space Research Laboratory, alongside structural wing design, Formula SAE powertrain testing, and full mechanical rebuilds.',
};

export const HERO_METRICS = [
  {
    label: 'Research Lab',
    value: 'Astrodynamics & Space',
    sub: 'CR3BP, RKF45 & ASSET under Dr. Rohan Sood',
  },
  {
    label: 'Education',
    value: 'B.S. Aerospace · 2028',
    sub: 'The University of Alabama · Junior (78% Complete)',
  },
  {
    label: 'Technical Builds',
    value: '5 Engineering Projects',
    sub: '2 Aerospace & CFD · 3 Mechanical Rebuilds',
  },
  {
    label: 'Academic Merit',
    value: '4× UA Scholarships',
    sub: 'Presidential, Provost, Competitive & Engineering',
  },
];

export const RESEARCH_MODULES: ResearchModule[] = [
  {
    id: 'cr3bp-rkf45',
    index: '1',
    title: 'CR3BP Dynamics & RKF45 Integration',
    focus: 'Analytical derivation and adaptive numerical propagation',
    methods: ['Python', 'NumPy', 'RKF45', 'Matplotlib'],
    details: [
      'Completed foundational modules modeling both the general n-body problem and the Circular Restricted Three-Body Problem (CR3BP).',
      'Hand-derived the CR3BP rotating-frame equations of motion and implemented them for high-precision numerical integration in Python.',
      'Engineered an adaptive step-size Runge-Kutta-Fehlberg (RKF45) integrator to control local truncation error across sensitive close-approach regimes.',
    ],
    parameters: [
      {label: 'Dynamical Model', value: 'Earth–Moon CR3BP'},
      {label: 'Integrator', value: 'Adaptive RKF45'},
      {label: 'Coordinate Frame', value: 'Synodic Rotating'},
    ],
  },
  {
    id: 'shooting-continuation',
    index: '2',
    title: 'Single Shooting & Pseudo-Arclength Continuation',
    focus: 'Periodic orbit generation across Lagrange families',
    methods: ['PAC_Utilities.py', 'ASSET (asset_asrl)', 'Pseudo-Arclength', 'SciPy'],
    details: [
      'Developed the FamilySolver class (PAC_Utilities.py) combining differential correction and adaptive Pseudo-Arclength Continuation (dS step-scaling) across L1–L3 Planar Lyapunov and 3D Halo families.',
      'Implemented retry loops, gentle step-scaling in high-gradient regions, and real-time 3D surface-impact detection against Earth and Moon radii.',
      'Serialized converged orbit families to .pkl archives for 3D rotating-frame visualization and closest-approach telemetry alongside weekly reviews with Dr. Rohan Sood.',
    ],
    parameters: [
      {label: 'Orbit Families', value: 'L1–L3 Planar & Halo'},
      {label: 'Targeting Method', value: 'Shooting & PAC (dS)'},
      {label: 'Safety Check', value: '3D Surface Impact'},
    ],
    repoName: 'CR3BP-Orbital-Family-Generator',
    repoUrl: 'https://github.com/dbethman/CR3BP-Orbital-Family-Generator',
  },
  {
    id: 'manifolds-poincare',
    index: '3',
    title: 'Invariant Manifolds & Poincaré Maps',
    focus: 'Low-energy transfer topology and phase-space analysis',
    methods: ['Manifold_Functions.py', 'LGL3 Collocation', 'Poincaré Sections', 'Python'],
    details: [
      'Targeted periodic CR3BP orbits via multiple shooting and LGL3 optimal control collocation, extracting stable and unstable eigenvectors from the Monodromy matrix.',
      'Propagated manifold branches with lunar impact filtering (< 1,700 km radius) and continuous linear-interpolated Poincaré plane crossings.',
      'Matched L1 unstable to L2 stable transfer intersections (Closest_Transfer_L1L2) and mapped 3D crossing velocities (Y, Z, V) with GEO footprint references.',
    ],
    parameters: [
      {label: 'Collocation', value: 'ASSET LGL3'},
      {label: 'Lunar Filter', value: 'r < 1,700 km Cutoff'},
      {label: 'Phase Analysis', value: '3D (Y, Z, V) & GEO'},
    ],
    repoName: 'Invariant_Manifold_and_Poincare_Section_Generation',
    repoUrl: 'https://github.com/dbethman/Invariant_Manifold_and_Poincare_Section_Generation',
  },
  {
    id: 'asset-optimization',
    index: '4',
    title: 'ASSET Optimization & Propulsion Constraints',
    focus: 'High-speed optimal control with realistic spacecraft models',
    methods: ['ASSET Toolkit', 'odePhase', 'Propulsion Constraints', 'ΔV Limits'],
    details: [
      'Completed formal ASSET (Astrodynamics Software and Science Enabling Toolkit) training for Python-based orbital trajectory optimization.',
      'Combined ASSET odePhase and NumPy in single-shooting numerical integration workflows to compute complete planar Lyapunov and Halo orbit families.',
      'Mapping propulsion system specifications to constraint methods for trajectory optimization, adding advanced propulsion constraints for efficient and realistic orbital transfers.',
    ],
    parameters: [
      {label: 'Toolkit', value: 'ASSET (odePhase)'},
      {label: 'Constraints', value: 'Propulsion & ΔV'},
      {label: 'Objective', value: 'Optimal Transfers'},
    ],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'airfoil-design',
    title: 'AEM 341 NACA 2412 Wing Box Design & FEA',
    category: 'Aerospace & Structures',
    origin: 'School Project',
    term: 'Fall 2026',
    location: 'Tuscaloosa, AL',
    teamContext: '6-Student Team · AEM 341 Wing Design',
    summary:
      'Designed and validated a two-spar, three-cell 6061-T6 aluminum wing box (250 mm NACA 2412 chord, 600 mm semi-span) under a 55° coordinated turn (n = 1.743), reconciling unidealized thin-walled theory, 12-boom idealization, and SolidWorks FEA.',
    primaryMetricLabel: 'Root Moment / Torque',
    primaryMetricValue: '8.43 N·m / 1.76 N·m',
    secondaryMetricLabel: 'Min Buckling / Yield MS',
    secondaryMetricValue: 'MS 11.7 / 131',
    highlights: [
      'Architected a two-spar, three-cell stressed-skin wing box using 1 mm 6061-T6 aluminum with 8 ribs spaced 66.67 mm inboard and 100 mm outboard.',
      'Evaluated 55° banked maneuver limit loads (n = 1.743, 32.23 N gross weight, 28.09 N lift per wing) producing 8.43 N·m root bending moment and 1.76 N·m leading-edge torque.',
      'Verified 12-boom structural idealization against unidealized thin-walled theory: matched bending inertia Ixx (66,626 mm⁴) within 1.6%, peak web shear within 1.6%, and peak von Mises stress (2.08 MPa) within 3.0%.',
      'Ran SolidWorks Simulation 2025 linear static FEA (39,887 tetrahedral nodes, 187 N/m² pressure), matching hand calculations at the critical inboard upper skin (1.83 MPa at 33.3 mm) while identifying 6.89 MPa rib–skin junction concentrations (MS = 39).',
    ],
    tools: ['SolidWorks FEA', 'MATLAB', 'Thin-Walled Beam Theory', '12-Boom Idealization', '6061-T6 Aluminum'],
    schematic: 'naca-structure',
    featured: true,
    coverImagePath: '/assets/wing_design/fig_5_fea_von_mises.png',
    reportPdfPath: '/assets/aistudio/Airfoil_Design_Project_e35e54cd.pdf',
    galleryFigures: [
      {
        title: 'SolidWorks FEA Von Mises Stress Distribution',
        caption: '39,887-node linear static FEA under 187 N/m² lower-skin pressure (6.89 MPa global peak at rib–skin junction, MS = 39).',
        imagePath: '/assets/wing_design/fig_5_fea_von_mises.png',
      },
      {
        title: 'Hand Calculation vs. FEA Spanwise Stress',
        caption: 'Exact agreement (1.83 MPa) at the critical upper-skin station (33.3 mm from root) across three sampled skin windows.',
        imagePath: '/assets/wing_design/fig_6_fea_vs_hand.png',
      },
      {
        title: 'Two-Spar Layout & 12-Boom Idealization',
        caption: 'Front spar at 0.20c (50.0 mm) and rear spar at 0.65c (162.5 mm) dividing the section into nose, box, and tail cells.',
        imagePath: '/assets/wing_design/fig_2_boom_idealization.png',
      },
      {
        title: 'Dimensioned Rib Placement Plan',
        caption: 'Eight 1 mm 6061-T6 ribs spaced 66.67 mm inboard to resist peak bending/buckling and 100 mm outboard.',
        imagePath: '/assets/wing_design/fig_3_rib_plan.png',
      },
      {
        title: 'Bending Moment & Torque vs. Spanwise Position',
        caption: 'Spanwise internal load distributions driving inboard rib spacing and skin-panel buckling checks (σcr = 26.1 MPa, MS = 11.7).',
        imagePath: '/assets/wing_design/fig_4_moment_torque.png',
      },
      {
        title: 'SolidWorks 3D Wing Box CAD Assembly',
        caption: 'Three-cell stressed-skin internal CAD model showing spars, lightening-hole ribs, and outer skin envelope.',
        imagePath: '/assets/wing_design/fig_7_cad_wingbox.png',
      },
      {
        title: 'Engineering Drawing — Three-Piece Rib & Planform',
        caption: 'Detailed manufacturing drawing specifying NACA 2412 coordinates, 3-piece rib dimensions, and station layout.',
        imagePath: '/assets/wing_design/fig_8_rib_drawing.png',
      },
      {
        title: 'Engineering Drawing — Front & Rear I-Beam Spars',
        caption: 'Dimensioned I-beam spar sections at 0.20c (28.72 mm web) and 0.65c (20.67 mm web) with 1.0 mm wall thickness.',
        imagePath: '/assets/wing_design/fig_9_spar_drawing.png',
      },
    ],
  },
  {
    id: 'naca-airfoil-testing',
    title: 'NACA Airfoil Aerodynamic Study (Python, XFOIL & ANSYS)',
    category: 'Astrodynamics & Simulation',
    origin: 'School Project',
    term: 'Fall 2026',
    location: 'Tuscaloosa, AL',
    teamContext: 'Group 13 · Python Automation & CFD',
    summary:
      'Authored Python automation scripts driving 160-node XFOIL sweeps across six NACA airfoils (1509, 3309, 0012, 2112, 2312, 4412) and Reynolds numbers (5×10⁴ to 10⁷), cross-checked against Thin Airfoil Theory and ANSYS Fluent CFD.',
    primaryMetricLabel: 'Airfoils & Re Range',
    primaryMetricValue: '6 NACA · 5e4–1e7',
    secondaryMetricLabel: 'ANSYS NACA 1509 Cl(0°)',
    secondaryMetricValue: '0.18 (160-Node XFOIL)',
    highlights: [
      'Performed analytical Thin Airfoil Theory derivations by hand for NACA 1509 (α_L=0 = −0.02 rad, Cm,c/4 = −0.3142) and NACA 0012, and cross-checked all six airfoils.',
      'Developed Python automation scripts (160 panel nodes, ITER 200, α = −4° to 14°) generating all parametric XFOIL lift curves, Reynolds sweeps (drone to 747 scale), and thickness-to-chord contours (4%–20%).',
      'Evaluated inviscid vs. viscous (Re = 10⁶) Cp distributions, drag polars (CL vs CD), and peak aerodynamic efficiency (L/D), demonstrating why 9%-thick profiles outperform 12%-thick profiles in viscous L/D.',
      'Validated NACA 1509 inviscid lift in ANSYS Fluent using a 40 m circular computational mesh (Cl = 0.18 at α = 0°).',
    ],
    tools: ['Python', 'XFOIL', 'ANSYS Fluent', 'NumPy / Matplotlib', 'Thin Airfoil Theory'],
    schematic: 'airfoil-testing',
    featured: true,
    coverImagePath: '/assets/airfoil_project/fig_drag_polar_ld.png',
    reportPdfPath: '/assets/aistudio/Airfoil_Project_Group_13_53730e77.pdf',
    galleryFigures: [
      {
        title: 'Drag Polars & L/D Efficiency (Re = 10⁶)',
        caption: 'Viscous lift-to-drag efficiency and drag buckets across all six airfoils; 9%-thick profiles (1509, 3309) achieve lower pressure drag.',
        imagePath: '/assets/airfoil_project/fig_drag_polar_ld.png',
      },
      {
        title: 'Thin Airfoil Theory vs. XFOIL Lift Curves',
        caption: 'Python-automated comparison of analytical TAT, inviscid XFOIL, and viscous XFOIL (Re = 10⁶) across NACA 1509, 3309, 0012, 2312, 2112, and 4412.',
        imagePath: '/assets/airfoil_project/fig_tat_xfoil_cl.png',
      },
      {
        title: 'Reynolds Number Variation Study (5×10⁴ – 10⁷)',
        caption: 'Viscous stall-delay and CL,max sensitivity for NACA 1509 and 3309 spanning drone-scale to Boeing 747 Reynolds regimes.',
        imagePath: '/assets/airfoil_project/fig_reynolds_study.png',
      },
      {
        title: 'Thickness-to-Chord Contour Study (4% – 20%)',
        caption: 'Inviscid CL contour surface across t/c = 4% to 20% and α = −4° to 14° for NACA 15xx and 33xx camber families.',
        imagePath: '/assets/airfoil_project/fig_thickness_contour.png',
      },
      {
        title: 'Inviscid vs. Viscous Cp Pressure Distributions',
        caption: 'NACA 1509 Cp profiles at α = 0°, 4°, 8°, and 12° illustrating suction reduction, transition kink, and trailing-edge separation.',
        imagePath: '/assets/airfoil_project/fig_cp_1509.png',
      },
      {
        title: 'ANSYS Fluid Airfoil Mesh',
        caption: 'Structured inflation-layer mesh around the NACA 1509 profile inside a 40 m circular computational domain.',
        imagePath: '/assets/airfoil_project/fig_ansys_mesh.png',
      },
    ],
  },
  {
    id: 'alternator-rebuild',
    title: 'Alternator Rebuild & Electrical Diagnostics',
    category: 'Mechanical & Hardware',
    origin: 'Personal Project',
    term: 'Summer 2026',
    location: 'Manhattan, IL',
    teamContext: 'Independent Mechanical & Electrical Build',
    summary:
      'Completely tore down and rebuilt an automotive alternator and executed multimeter resistance diagnostics across the ignition and charging systems.',
    primaryMetricLabel: 'Ignition Coil Spec',
    primaryMetricValue: '12.6 kΩ / 0.7 Ω',
    secondaryMetricLabel: 'Scope',
    secondaryMetricValue: 'Rebuild + Diagnostics',
    highlights: [
      'Disassembled and rebuilt the alternator, replacing the rectifier bridge, bearings, carbon brushes, and rubber insulation components.',
      'Performed comprehensive engine diagnostics via resistance and continuity testing, verifying ignition coil windings (12.6 kΩ secondary, 0.7 Ω primary) prior to replacement.',
      'Executed preventative maintenance replacing the power steering pump, ignition coil, spark plug wires, spark plugs, distributor cap, and battery.',
    ],
    tools: ['Multimeter Diagnostics', 'Mechanical Disassembly', 'Automotive Electrical'],
    schematic: 'alternator-diagnostics',
    featured: true,
  },
  {
    id: 'engine-rebuild-250cc',
    title: 'Yamaha Raptor 250cc Top-End Engine Rebuild',
    category: 'Mechanical & Hardware',
    origin: 'Personal Project',
    term: 'Summer 2025',
    location: 'Manhattan, IL',
    teamContext: 'Independent Powertrain Restoration',
    summary:
      'Restored compression and full running condition to a non-operational 250cc four-stroke ATV engine through piston, ring, and carburetor overhaul.',
    primaryMetricLabel: 'Displacement',
    primaryMetricValue: '250 cc Four-Stroke',
    secondaryMetricLabel: 'Outcome',
    secondaryMetricValue: 'Compression Restored',
    highlights: [
      'Disassembled a non-operational Yamaha Raptor 250 engine and replaced worn pistons and piston rings to restore cylinder sealing.',
      'Cleaned, jet-cleared, and rebuilt the carburetor assembly, restoring engine compression, throttle response, and overall performance.',
    ],
    tools: ['Engine Disassembly', 'Carburetor Rebuild', 'Torque & Clearance Inspection'],
    coverImagePath: '/src/assets/images/piston_and_rings_1795493320579.jpg',
    coverStyle: 'photo',
    galleryTabLabel: 'Diagrams & Photos',
    galleryFigures: [
      {
        title: '250cc SOHC Top-End Cylinder Head Removal Diagram',
        caption:
          'Exploded top-end teardown layout: tappet inspection caps, valve cover hardware, SOHC finned cylinder head with cam sprocket & chain, single-bore head gasket, dowel pins, and finned cylinder barrel.',
        imagePath: '/src/assets/images/raptor_head_removal_single_1795493333893.jpg',
        surface: 'light',
      },
      {
        title: '250cc Forged Piston, Ring Set & Wrist Pin',
        caption:
          'Single-cylinder piston crown with twin valve reliefs alongside the top compression ring, second scraper ring, 3-piece wavy oil control ring, wrist pin, and circlips.',
        imagePath: '/src/assets/images/piston_and_rings_1795493320579.jpg',
        surface: 'dark',
      },
    ],
  },
  {
    id: 'suspension-brakes',
    title: 'Coilover Suspension & Braking System Overhaul',
    category: 'Mechanical & Hardware',
    origin: 'Personal Project',
    term: 'Summer 2025',
    location: 'Manhattan, IL',
    teamContext: 'Independent Chassis Upgrade · Lexus LS400',
    summary:
      'Upgraded vehicle chassis dynamics, ride height geometry, and stopping performance by installing Megan Racing coilovers, replacement suspension bushings, and upgraded rotors and brake pads.',
    primaryMetricLabel: 'Suspension',
    primaryMetricValue: 'Megan Racing Coilovers',
    secondaryMetricLabel: 'Braking',
    secondaryMetricValue: 'Upgraded Rotors & Pads',
    highlights: [
      'Removed factory MacPherson/double-wishbone strut assemblies and installed adjustable Megan Racing coilovers alongside replacement suspension bushings to dial in lowered stance and damping response.',
      'Researched, selected, and installed upgraded brake rotors and performance pads to improve thermal fade resistance and stopping consistency.',
      'Dialed corner ride height and wheel-well clearance from stock winter height to a balanced street-tuned stance.',
    ],
    tools: ['Chassis Mechanics', 'Suspension Geometry', 'Brake Hydraulics'],
    schematic: 'coilover-brakes',
    featured: true,
    comparisonPhotos: {
      before: {
        label: 'Before · Stock Ride Height',
        caption: 'Baseline factory struts and OEM wheels prior to suspension overhaul.',
        imagePath: '/assets/aistudio/1000004517_2c7156ad.JPG',
        objectPosition: '50% 56%',
      },
      after: {
        label: 'After · Megan Racing Coilovers',
        caption: 'Lowered stance after Megan Racing coilover, bushing, brake, and wheel installation.',
        imagePath: '/assets/aistudio/1000014434_608e55b6.JPG',
        objectPosition: '50% 54%',
      },
    },
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'astrodynamics',
    title: 'Astrodynamics & Numerical Computing',
    subtitle: 'Orbital mechanics, ODE solvers, and high-speed scientific Python',
    items: [
      {name: 'Python', context: 'CR3BP, RKF45, single shooting & manifolds'},
      {name: 'ASSET', context: 'Astrodynamics Software & Science Enabling Toolkit'},
      {name: 'MATLAB', context: 'Wing bending/torque plots & numerical methods'},
      {name: 'NumPy', context: 'Vectorized state propagation & STM linear algebra'},
      {name: 'SciPy', context: 'Numerical routines & scientific optimization'},
      {name: 'Numba', context: 'JIT-compiled numerical integration loops'},
      {name: 'Matplotlib', context: '3D orbit families, Poincaré maps & velocity plots'},
    ],
  },
  {
    id: 'cad-fea',
    title: 'CAD, FEA & Aerodynamics',
    subtitle: 'Structural idealization, fluid meshing, and CFD verification',
    items: [
      {name: 'SolidWorks', context: 'Wing box CAD & 2025 linear static FEA'},
      {name: 'Abaqus', context: 'Finite element structural stability analysis'},
      {name: 'XFOIL', context: 'Viscous & inviscid airfoil polars across 6 NACA profiles'},
      {name: 'ANSYS Fluid', context: 'Airfoil circular-domain meshing & inviscid CFD runs'},
    ],
  },
  {
    id: 'software-systems',
    title: 'Embedded, Systems & Data',
    subtitle: 'Version control, CLI tooling, microcontrollers, and SQL',
    items: [
      {name: 'Git / GitHub', context: 'Research codebase version control & team collaboration'},
      {name: 'Linux / Command Line', context: 'CLI scripting & scientific computing workflows'},
      {name: 'VS Code', context: 'Primary Python, C++ & MATLAB IDE workflow'},
      {name: 'Arduino IDE', context: 'Microcontroller prototyping & sensor interfacing'},
      {name: 'SQL Databases', context: 'Inventory tracking & e-commerce integration'},
      {name: 'Microsoft Office Suite', context: 'Engineering reports, WBS & Gantt schedules'},
    ],
  },
  {
    id: 'hardware-certifications',
    title: 'Hardware, Diagnostics & Certifications',
    subtitle: 'Shop safety, electrical troubleshooting, and powertrain mechanics',
    items: [
      {name: 'Certified Forklift Operator', context: 'Active safety & warehouse certification (2024–2027)'},
      {name: 'Electrical Diagnostics', context: 'Multimeter resistance & continuity testing'},
      {name: 'Powertrain & Chassis Work', context: 'Engine rebuilds, alternators & coilover installs'},
      {name: 'Composite Testing', context: 'Formula SAE carbon-fiber tank & sealant evaluation'},
    ],
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'astrodynamics-lab',
    role: 'Undergraduate Researcher',
    organization: 'Astrodynamics and Space Research Laboratory',
    location: 'Tuscaloosa, AL',
    period: 'Spring 2026 – Present',
    type: 'Research',
    highlights: [
      'Hand-derived and numerically integrated CR3BP equations in Python using a custom RKF45 adaptive integrator.',
      'Built single-shooting and pseudo-arclength continuation solvers for Lyapunov and Halo orbit families, plus invariant manifolds and Poincaré maps.',
      'Transitioned solvers to ASSET for runtime acceleration while incorporating SRP, drag, gravity, and ΔV propulsion constraints; present weekly to Dr. Rohan Sood.',
    ],
  },
  {
    id: 'crimson-racing',
    role: 'Powertrain Team Member',
    organization: 'Crimson Racing Team (Formula SAE)',
    location: 'Tuscaloosa, AL',
    period: 'Fall 2024 – Spring 2025',
    type: 'Engineering Team',
    highlights: [
      'Assisted with testing a carbon-fiber fuel tank designed to reduce Formula SAE vehicle mass and evaluated sealants for leak prevention and safety.',
      'Attended weekly engineering knowledge-transfer meetings covering powertrain design, packaging, and prototyping.',
    ],
  },
  {
    id: 'seven-sigma',
    role: 'E-Commerce Integration',
    organization: 'Seven Sigma Arms',
    location: 'Manhattan, IL',
    period: 'May 2022 – Aug 2026',
    type: 'Industry',
    highlights: [
      'Managed external sales channels across Armslist and Gunbroker.',
      'Assisted with inventory management and database updates using an SQL database.',
    ],
  },
  {
    id: 'berkots',
    role: 'Forklift Driver / Logistics',
    organization: "Berkot's Super Foods Warehouse",
    location: 'Joliet, IL',
    period: 'May 2025 – Aug 2026',
    type: 'Industry',
    highlights: [
      'Developed logistics coordination and time-management skills in a high-throughput warehouse.',
      'Trained new employees on order picking, trailer loading, and certified forklift operation safety.',
    ],
  },
  {
    id: 'tractor-supply',
    role: 'Team Member',
    organization: 'Tractor Supply Company',
    location: 'New Lenox, IL',
    period: 'Apr 2024 – Aug 2024',
    type: 'Industry',
    highlights: [
      'Communicated clearly and concisely to assist customers with hardware, equipment, and store inventory.',
    ],
  },
];

export const CAMPUS_INVOLVEMENT = [
  {
    name: 'American Institute of Aeronautics & Astronautics (AIAA)',
    period: 'Fall 2026 – Present',
    role: 'Student Member',
  },
  {
    name: 'UA Crimson Car Club',
    period: '2024 – Present',
    role: 'Active Member',
  },
  {
    name: 'UA Outdoor Recreation Club',
    period: '2024 – Present',
    role: 'Active Member',
  },
];

export const HONORS_AWARDS = [
  {
    title: 'Presidential National Housing Scholarship',
    period: '2024–2028',
    institution: 'The University of Alabama',
  },
  {
    title: 'Provost Academic Excellence Scholarship',
    period: '2024–2028',
    institution: 'The University of Alabama',
  },
  {
    title: 'UA Competitive Achievement Scholarship',
    period: '2024–2028',
    institution: 'The University of Alabama',
  },
  {
    title: 'UA Engineering Scholarship',
    period: '2024–2028',
    institution: 'College of Engineering',
  },
];

export const COURSEWORK_SUMMARY = [
  {label: 'Classification', value: 'Junior (Good Standing)'},
  {label: 'Degree Progress', value: '78% (99 / 123 Credits)'},
  {label: 'Overall / UA GPA', value: '3.135 / 3.096'},
  {label: 'Earned + Active', value: '68 Earned · 31 Active'},
];

export const COURSEWORK_ITEMS: CourseworkItem[] = [
  // Completed Aerospace & Engineering (B- & Above)
  {
    code: 'AEM 251',
    title: 'Mechanics of Materials I Laboratory',
    credits: '1',
    term: 'Spring 2026',
    group: 'Completed Core',
    discipline: 'Aerospace & ME',
    status: 'Completed',
    highlight: 'Grade: A+',
  },
  {
    code: 'AEM 121',
    title: 'Introduction to Aerospace Engineering',
    credits: '1',
    term: 'Fall 2024',
    group: 'Completed Core',
    discipline: 'Aerospace & ME',
    status: 'Completed',
    highlight: 'Grade: A',
  },
  {
    code: 'AEM 264',
    title: 'Dynamics',
    credits: '3',
    term: 'Spring 2026',
    group: 'Completed Core',
    discipline: 'Aerospace & ME',
    status: 'Completed',
    highlight: 'Grade: A-',
  },
  {
    code: 'AEM 249',
    title: 'Algorithm Development & Implementation',
    credits: '3',
    term: 'Fall 2024',
    group: 'Completed Core',
    discipline: 'Aerospace & ME',
    status: 'Completed',
    highlight: 'Grade: B+',
  },
  {
    code: 'AEM 250',
    title: 'Mechanics of Materials I',
    credits: '3',
    term: 'Spring 2026',
    group: 'Completed Core',
    discipline: 'Aerospace & ME',
    status: 'Completed',
    highlight: 'Grade: B',
  },
  {
    code: 'AEM 201',
    title: 'Statics',
    credits: '3',
    term: 'Fall 2025',
    group: 'Completed Core',
    discipline: 'Aerospace & ME',
    status: 'Completed',
    highlight: 'Grade: B',
  },
  {
    code: 'ENGR 161',
    title: 'Small-Scale Engineering Graphics',
    credits: '1',
    term: 'Spring 2025',
    group: 'Completed Core',
    discipline: 'Aerospace & ME',
    status: 'Completed',
    highlight: 'Grade: B',
  },
  // Completed Mathematics & Physics (B- & Above)
  {
    code: 'MATH 125',
    title: 'Calculus I',
    credits: '4',
    term: 'Fall 2024',
    group: 'Completed Core',
    discipline: 'Math & Science',
    status: 'Completed',
    highlight: 'Grade: A',
  },
  {
    code: 'MATH 237',
    title: 'Introduction to Linear Algebra',
    credits: '3',
    term: 'Fall 2025',
    group: 'Completed Core',
    discipline: 'Math & Science',
    status: 'Completed',
    highlight: 'Grade: A',
  },
  {
    code: 'PH 105',
    title: 'General Physics with Calculus I',
    credits: '4',
    term: 'Spring 2025',
    group: 'Completed Core',
    discipline: 'Math & Science',
    status: 'Completed',
    highlight: 'Grade: A-',
  },
  {
    code: 'PH 106',
    title: 'General Physics with Calculus II',
    credits: '4',
    term: 'Fall 2025',
    group: 'Completed Core',
    discipline: 'Math & Science',
    status: 'Completed',
    highlight: 'Grade: B-',
  },
  {
    code: 'MATH 238',
    title: 'Applied Differential Equations I',
    credits: '3',
    term: 'Spring 2026',
    group: 'Completed Core',
    discipline: 'Math & Science',
    status: 'Completed',
    highlight: 'Grade: B',
  },
  // Completed Honors & General Education (B- & Above)
  {
    code: 'UH 100',
    title: 'Honors Connections',
    credits: '2',
    term: 'Fall 2024',
    group: 'Completed Core',
    discipline: 'Honors & Gen Ed',
    status: 'Completed',
    highlight: 'Grade: A-',
  },
  {
    code: 'EN 101',
    title: 'English Composition I',
    credits: '3',
    term: 'Fall 2023',
    group: 'Completed Core',
    discipline: 'Honors & Gen Ed',
    status: 'Completed',
    highlight: 'Grade: A',
  },
  {
    code: 'EN 102',
    title: 'English Composition II',
    credits: '3',
    term: 'Spring 2024',
    group: 'Completed Core',
    discipline: 'Honors & Gen Ed',
    status: 'Completed',
    highlight: 'Grade: B',
  },
  {
    code: 'MUS 121',
    title: 'Introduction to Listening',
    credits: '3',
    term: 'Spring 2025',
    group: 'Completed Core',
    discipline: 'Honors & Gen Ed',
    status: 'Completed',
    highlight: 'Grade: A',
  },
  // Fall 2026 In-Progress & Spring 2027 Preregistered
  {
    code: 'AEM 313',
    title: 'Aerodynamics',
    credits: '3',
    term: 'Fall 2026',
    group: 'Fall 2026 & Spring 2027',
    discipline: 'Aerospace & ME',
    status: 'In Progress',
  },
  {
    code: 'AEM 341',
    title: 'Aerospace Structures',
    credits: '3',
    term: 'Fall 2026',
    group: 'Fall 2026 & Spring 2027',
    discipline: 'Aerospace & ME',
    status: 'In Progress',
  },
  {
    code: 'AEM 351',
    title: 'Aerospace Structures Laboratory',
    credits: '1',
    term: 'Fall 2026',
    group: 'Fall 2026 & Spring 2027',
    discipline: 'Aerospace & ME',
    status: 'In Progress',
  },
  {
    code: 'ME 215',
    title: 'Thermodynamics I',
    credits: '3',
    term: 'Fall 2026',
    group: 'Fall 2026 & Spring 2027',
    discipline: 'Aerospace & ME',
    status: 'In Progress',
  },
  {
    code: 'AEM 395',
    title: 'Professional Development in Aerospace Engineering',
    credits: '3',
    term: 'Fall 2026',
    group: 'Fall 2026 & Spring 2027',
    discipline: 'Aerospace & ME',
    status: 'In Progress',
  },
  {
    code: 'AEM 368',
    title: 'Flight Mechanics',
    credits: '3',
    term: 'Spring 2027',
    group: 'Fall 2026 & Spring 2027',
    discipline: 'Aerospace & ME',
    status: 'Preregistered',
  },
  {
    code: 'AEM 413',
    title: 'Compressible Flow',
    credits: '3',
    term: 'Spring 2027',
    group: 'Fall 2026 & Spring 2027',
    discipline: 'Aerospace & ME',
    status: 'Preregistered',
  },
  {
    code: 'ME 349',
    title: 'Engineering Analysis',
    credits: '3',
    term: 'Spring 2027',
    group: 'Fall 2026 & Spring 2027',
    discipline: 'Aerospace & ME',
    status: 'Preregistered',
  },
  // Senior Sequence (Remaining Core)
  {
    code: 'AEM 402',
    title: 'Integrated Aerospace Design I',
    credits: '3',
    term: 'Fall 2027',
    group: 'Senior Sequence',
    discipline: 'Aerospace & ME',
    status: 'Planned',
  },
  {
    code: 'AEM 408',
    title: 'Propulsion Systems',
    credits: '3',
    term: 'Fall 2027',
    group: 'Senior Sequence',
    discipline: 'Aerospace & ME',
    status: 'Planned',
  },
  {
    code: 'AEM 468',
    title: 'Flight Dynamics & Control',
    credits: '3',
    term: 'Fall 2027',
    group: 'Senior Sequence',
    discipline: 'Aerospace & ME',
    status: 'Planned',
  },
  {
    code: 'AEM 404',
    title: 'Integrated Aerospace Design II',
    credits: '3',
    term: 'Spring 2028',
    group: 'Senior Sequence',
    discipline: 'Aerospace & ME',
    status: 'Planned',
  },
  {
    code: 'AEM 451',
    title: 'Aircraft Structural Design',
    credits: '3',
    term: 'Spring 2028',
    group: 'Senior Sequence',
    discipline: 'Aerospace & ME',
    status: 'Planned',
  },
  {
    code: 'AEM 420 / 461',
    title: 'Aerospace Computational & Technical Electives',
    credits: '12',
    term: '2027–2028',
    group: 'Senior Sequence',
    discipline: 'Aerospace & ME',
    status: 'Planned',
  },
];

