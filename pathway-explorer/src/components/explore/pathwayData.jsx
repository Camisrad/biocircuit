export const pathwayData = {
  p53: {
    name: "p53 Tumor Suppressor Pathway",
    description: "Guardian of the genome - controls cell cycle arrest and apoptosis",
    color: "#ef4444",
    genes: [
      {
        name: "TP53",
        fullName: "Tumor Protein P53",
        position: { x: 400, y: 250 },
        color: "#ef4444",
        function: "Master tumor suppressor that activates DNA repair, cell cycle arrest, and apoptosis in response to cellular stress",
        cancerRole: "Mutations in TP53 are found in over 50% of all human cancers. Loss of p53 allows damaged cells to evade death and continue dividing uncontrollably.",
        cancerTypes: ["breast", "lung", "colon", "ovarian"],
        source: "https://www.ncbi.nlm.nih.gov/gene/7157"
      },
      {
        name: "MDM2",
        fullName: "Mouse Double Minute 2",
        position: { x: 250, y: 150 },
        color: "#f97316",
        function: "E3 ubiquitin ligase that negatively regulates p53 by targeting it for degradation",
        cancerRole: "MDM2 overexpression inactivates p53 without mutation. Amplified in 7% of cancers, particularly sarcomas.",
        cancerTypes: ["sarcoma", "breast"],
        source: "https://www.ncbi.nlm.nih.gov/gene/4193"
      },
      {
        name: "CDKN1A",
        fullName: "Cyclin-Dependent Kinase Inhibitor 1A (p21)",
        position: { x: 550, y: 150 },
        color: "#fb923c",
        function: "CDK inhibitor that mediates p53-dependent cell cycle arrest at G1/S checkpoint",
        cancerRole: "p21 loss prevents cell cycle arrest, allowing damaged DNA to be replicated. Downregulated in many cancers.",
        cancerTypes: ["colon", "prostate"],
        source: "https://www.ncbi.nlm.nih.gov/gene/1026"
      },
      {
        name: "BAX",
        fullName: "BCL2 Associated X Protein",
        position: { x: 400, y: 400 },
        color: "#dc2626",
        function: "Pro-apoptotic protein that forms pores in mitochondria, triggering programmed cell death",
        cancerRole: "BAX activation by p53 initiates apoptosis. Mutations prevent cancer cells from dying in response to stress.",
        cancerTypes: ["colon", "hematologic"],
        source: "https://www.ncbi.nlm.nih.gov/gene/581"
      }
    ],
    connections: [
      { from: "MDM2", to: "TP53", type: "inhibition" },
      { from: "TP53", to: "CDKN1A", type: "activation" },
      { from: "TP53", to: "BAX", type: "activation" },
      { from: "TP53", to: "MDM2", type: "activation" }
    ]
  },
  
  mapk: {
    name: "MAPK/ERK Signaling Cascade",
    description: "Critical growth pathway from receptor to nucleus",
    color: "#3b82f6",
    genes: [
      {
        name: "KRAS",
        fullName: "Kirsten RAS",
        position: { x: 400, y: 150 },
        color: "#3b82f6",
        function: "Small GTPase that activates downstream kinases when bound to GTP",
        cancerRole: "KRAS mutations lock it in active state, causing constant growth signals. Found in 25% of cancers.",
        cancerTypes: ["pancreatic", "lung", "colon"],
        source: "https://www.ncbi.nlm.nih.gov/gene/3845"
      },
      {
        name: "BRAF",
        fullName: "B-Raf Proto-Oncogene",
        position: { x: 400, y: 250 },
        color: "#2563eb",
        function: "Serine/threonine kinase that phosphorylates and activates MEK1/2",
        cancerRole: "BRAF V600E mutation found in 50% of melanomas and 10% of colon cancers. Drives aggressive growth.",
        cancerTypes: ["melanoma", "thyroid", "colon"],
        source: "https://www.ncbi.nlm.nih.gov/gene/673"
      },
      {
        name: "MEK1",
        fullName: "MAP2K1",
        position: { x: 300, y: 350 },
        color: "#1d4ed8",
        function: "Dual-specificity kinase that phosphorylates ERK1/2",
        cancerRole: "MEK mutations rare but pathway hyperactivation drives proliferation. Target of inhibitors like trametinib.",
        cancerTypes: ["melanoma", "lung"],
        source: "https://www.ncbi.nlm.nih.gov/gene/5604"
      },
      {
        name: "ERK1",
        fullName: "MAPK3",
        position: { x: 500, y: 350 },
        color: "#1e40af",
        function: "Serine/threonine kinase that phosphorylates transcription factors controlling cell division",
        cancerRole: "Terminal effector of MAPK pathway. Hyperactivation promotes uncontrolled proliferation.",
        cancerTypes: ["various"],
        source: "https://www.ncbi.nlm.nih.gov/gene/5595"
      }
    ],
    connections: [
      { from: "KRAS", to: "BRAF", type: "activation" },
      { from: "BRAF", to: "MEK1", type: "activation" },
      { from: "MEK1", to: "ERK1", type: "activation" }
    ]
  },

  pi3k: {
    name: "PI3K/AKT/mTOR Survival Pathway",
    description: "Master regulator of cell survival and metabolism",
    color: "#a855f7",
    genes: [
      {
        name: "PIK3CA",
        fullName: "PI3-Kinase Catalytic Alpha",
        position: { x: 400, y: 150 },
        color: "#a855f7",
        function: "Lipid kinase that generates PIP3, recruiting AKT to membrane",
        cancerRole: "PIK3CA mutations found in 30% of breast cancers, causing constitutive pathway activation.",
        cancerTypes: ["breast", "endometrial", "colon"],
        source: "https://www.ncbi.nlm.nih.gov/gene/5290"
      },
      {
        name: "PTEN",
        fullName: "Phosphatase and Tensin Homolog",
        position: { x: 250, y: 150 },
        color: "#9333ea",
        function: "Lipid phosphatase that converts PIP3 back to PIP2, antagonizing PI3K",
        cancerRole: "PTEN loss is second most common tumor suppressor defect. Allows uncontrolled AKT activation.",
        cancerTypes: ["prostate", "endometrial", "brain"],
        source: "https://www.ncbi.nlm.nih.gov/gene/5728"
      },
      {
        name: "AKT",
        fullName: "AKT Serine/Threonine Kinase",
        position: { x: 400, y: 280 },
        color: "#7c3aed",
        function: "Central node promoting cell survival by inhibiting apoptosis and activating mTOR",
        cancerRole: "AKT hyperactivation blocks cell death and drives growth. Amplified in many cancers.",
        cancerTypes: ["various"],
        source: "https://www.ncbi.nlm.nih.gov/gene/207"
      },
      {
        name: "mTOR",
        fullName: "Mechanistic Target of Rapamycin",
        position: { x: 400, y: 400 },
        color: "#6b21a8",
        function: "Serine/threonine kinase controlling protein synthesis and cell growth",
        cancerRole: "mTOR hyperactivation drives anabolic metabolism and proliferation. Target of rapamycin analogs.",
        cancerTypes: ["renal", "breast"],
        source: "https://www.ncbi.nlm.nih.gov/gene/2475"
      }
    ],
    connections: [
      { from: "PIK3CA", to: "AKT", type: "activation" },
      { from: "PTEN", to: "AKT", type: "inhibition" },
      { from: "AKT", to: "mTOR", type: "activation" }
    ]
  },

  wnt: {
    name: "Wnt/β-Catenin Pathway",
    description: "Developmental signaling controlling cell fate",
    color: "#f59e0b",
    genes: [
      {
        name: "APC",
        fullName: "Adenomatous Polyposis Coli",
        position: { x: 300, y: 200 },
        color: "#f59e0b",
        function: "Tumor suppressor that marks β-catenin for degradation",
        cancerRole: "APC mutations initiate 80% of colorectal cancers. Loss allows β-catenin accumulation.",
        cancerTypes: ["colon", "stomach"],
        source: "https://www.ncbi.nlm.nih.gov/gene/324"
      },
      {
        name: "CTNNB1",
        fullName: "Catenin Beta 1",
        position: { x: 500, y: 200 },
        color: "#d97706",
        function: "Transcriptional coactivator that turns on growth genes when stabilized",
        cancerRole: "CTNNB1 mutations prevent degradation, causing nuclear accumulation and oncogenic transcription.",
        cancerTypes: ["colon", "liver", "melanoma"],
        source: "https://www.ncbi.nlm.nih.gov/gene/1499"
      },
      {
        name: "GSK3B",
        fullName: "Glycogen Synthase Kinase 3 Beta",
        position: { x: 400, y: 300 },
        color: "#b45309",
        function: "Kinase that phosphorylates β-catenin, marking it for degradation",
        cancerRole: "GSK3B inhibition by Wnt signaling stabilizes β-catenin. Pathway hyperactivation drives cancer.",
        cancerTypes: ["various"],
        source: "https://www.ncbi.nlm.nih.gov/gene/2932"
      },
      {
        name: "TCF7",
        fullName: "T-Cell Factor 7",
        position: { x: 500, y: 350 },
        color: "#92400e",
        function: "Transcription factor that partners with β-catenin to activate target genes",
        cancerRole: "TCF/β-catenin complexes drive expression of growth genes like MYC and CCND1.",
        cancerTypes: ["colon"],
        source: "https://www.ncbi.nlm.nih.gov/gene/6932"
      }
    ],
    connections: [
      { from: "APC", to: "CTNNB1", type: "inhibition" },
      { from: "GSK3B", to: "CTNNB1", type: "inhibition" },
      { from: "CTNNB1", to: "TCF7", type: "activation" }
    ]
  },

  tgfb: {
    name: "TGF-β/SMAD Pathway",
    description: "Dual role in growth suppression and metastasis",
    color: "#10b981",
    genes: [
      {
        name: "TGFBR1",
        fullName: "TGF-β Receptor Type 1",
        position: { x: 300, y: 200 },
        color: "#10b981",
        function: "Serine/threonine kinase receptor that phosphorylates SMAD2/3",
        cancerRole: "TGFBR1 mutations disable growth suppression. Loss found in colon and gastric cancers.",
        cancerTypes: ["colon", "gastric"],
        source: "https://www.ncbi.nlm.nih.gov/gene/7046"
      },
      {
        name: "SMAD2",
        fullName: "SMAD Family Member 2",
        position: { x: 400, y: 300 },
        color: "#059669",
        function: "Transcription factor that translocates to nucleus when phosphorylated",
        cancerRole: "SMAD2/3 loss prevents TGF-β tumor suppression in early cancers. Pathway can promote metastasis in late stage.",
        cancerTypes: ["colon", "pancreatic"],
        source: "https://www.ncbi.nlm.nih.gov/gene/4087"
      },
      {
        name: "SMAD4",
        fullName: "SMAD Family Member 4",
        position: { x: 500, y: 300 },
        color: "#047857",
        function: "Co-SMAD that partners with SMAD2/3 for nuclear translocation",
        cancerRole: "SMAD4 mutations found in 50% of pancreatic cancers. Loss disables TGF-β signaling.",
        cancerTypes: ["pancreatic", "colon"],
        source: "https://www.ncbi.nlm.nih.gov/gene/4089"
      }
    ],
    connections: [
      { from: "TGFBR1", to: "SMAD2", type: "activation" },
      { from: "SMAD2", to: "SMAD4", type: "activation" }
    ]
  },

  brca: {
    name: "BRCA DNA Repair Pathway",
    description: "Homologous recombination DNA repair system",
    color: "#ec4899",
    genes: [
      {
        name: "BRCA1",
        fullName: "Breast Cancer Gene 1",
        position: { x: 300, y: 250 },
        color: "#ec4899",
        function: "Tumor suppressor coordinating DNA damage response and homologous recombination",
        cancerRole: "Germline BRCA1 mutations confer 70% lifetime breast cancer risk and 40% ovarian cancer risk.",
        cancerTypes: ["breast", "ovarian"],
        source: "https://www.ncbi.nlm.nih.gov/gene/672"
      },
      {
        name: "BRCA2",
        fullName: "Breast Cancer Gene 2",
        position: { x: 500, y: 250 },
        color: "#db2777",
        function: "Mediates RAD51 loading onto DNA for homologous recombination repair",
        cancerRole: "BRCA2 mutations cause similar cancer predisposition to BRCA1. Target of PARP inhibitors.",
        cancerTypes: ["breast", "ovarian", "prostate"],
        source: "https://www.ncbi.nlm.nih.gov/gene/675"
      },
      {
        name: "RAD51",
        fullName: "RAD51 Recombinase",
        position: { x: 400, y: 380 },
        color: "#be185d",
        function: "Recombinase that catalyzes strand invasion during homologous recombination",
        cancerRole: "RAD51 deficiency causes genomic instability. BRCA-mutant cancers depend on alternative repair.",
        cancerTypes: ["various"],
        source: "https://www.ncbi.nlm.nih.gov/gene/5888"
      }
    ],
    connections: [
      { from: "BRCA1", to: "RAD51", type: "activation" },
      { from: "BRCA2", to: "RAD51", type: "activation" }
    ]
  },

  cell_cycle: {
    name: "Cell Cycle Checkpoint",
    description: "G1/S transition control and RB pathway",
    color: "#6366f1",
    genes: [
      {
        name: "RB1",
        fullName: "Retinoblastoma 1",
        position: { x: 400, y: 200 },
        color: "#6366f1",
        function: "Tumor suppressor that blocks E2F transcription factors, preventing S phase entry",
        cancerRole: "RB1 loss allows unchecked cell cycle progression. Mutated in retinoblastoma and other cancers.",
        cancerTypes: ["retinoblastoma", "osteosarcoma", "lung"],
        source: "https://www.ncbi.nlm.nih.gov/gene/5925"
      },
      {
        name: "CDK4",
        fullName: "Cyclin-Dependent Kinase 4",
        position: { x: 300, y: 320 },
        color: "#4f46e5",
        function: "Kinase that phosphorylates RB, inactivating its growth suppression",
        cancerRole: "CDK4 amplification drives cell cycle. Target of inhibitors like palbociclib in breast cancer.",
        cancerTypes: ["breast", "melanoma"],
        source: "https://www.ncbi.nlm.nih.gov/gene/1019"
      },
      {
        name: "CCND1",
        fullName: "Cyclin D1",
        position: { x: 500, y: 320 },
        color: "#4338ca",
        function: "Regulatory subunit that activates CDK4/6",
        cancerRole: "CCND1 amplification found in 15% of cancers. Drives G1 progression and RB phosphorylation.",
        cancerTypes: ["breast", "esophageal"],
        source: "https://www.ncbi.nlm.nih.gov/gene/595"
      }
    ],
    connections: [
      { from: "CCND1", to: "CDK4", type: "activation" },
      { from: "CDK4", to: "RB1", type: "inhibition" }
    ]
  },

  jak_stat: {
    name: "JAK/STAT Cytokine Pathway",
    description: "Rapid signaling from cytokine receptors to nucleus",
    color: "#14b8a6",
    genes: [
      {
        name: "JAK2",
        fullName: "Janus Kinase 2",
        position: { x: 350, y: 200 },
        color: "#14b8a6",
        function: "Tyrosine kinase activated by cytokine receptors, phosphorylates STATs",
        cancerRole: "JAK2 V617F mutation causes myeloproliferative disorders. Constitutively active.",
        cancerTypes: ["myeloproliferative"],
        source: "https://www.ncbi.nlm.nih.gov/gene/3717"
      },
      {
        name: "STAT3",
        fullName: "Signal Transducer and Activator of Transcription 3",
        position: { x: 450, y: 300 },
        color: "#0d9488",
        function: "Transcription factor that dimerizes when phosphorylated and enters nucleus",
        cancerRole: "STAT3 hyperactivation promotes proliferation and immune evasion. Active in many cancers.",
        cancerTypes: ["various"],
        source: "https://www.ncbi.nlm.nih.gov/gene/6774"
      }
    ],
    connections: [
      { from: "JAK2", to: "STAT3", type: "activation" }
    ]
  },

  nfkb: {
    name: "NF-κB Inflammatory Pathway",
    description: "Links inflammation to cancer development",
    color: "#f97316",
    genes: [
      {
        name: "NFKB1",
        fullName: "Nuclear Factor Kappa B Subunit 1",
        position: { x: 400, y: 250 },
        color: "#f97316",
        function: "Transcription factor controlling inflammatory and survival genes",
        cancerRole: "Chronic NF-κB activation drives cancer-promoting inflammation and blocks apoptosis.",
        cancerTypes: ["lymphoma", "various"],
        source: "https://www.ncbi.nlm.nih.gov/gene/4790"
      },
      {
        name: "IKBKB",
        fullName: "IKK-Beta",
        position: { x: 300, y: 150 },
        color: "#ea580c",
        function: "Kinase that phosphorylates IκB, releasing NF-κB for nuclear entry",
        cancerRole: "IKK hyperactivation sustains NF-κB signaling in inflammatory cancers.",
        cancerTypes: ["colon", "liver"],
        source: "https://www.ncbi.nlm.nih.gov/gene/3551"
      }
    ],
    connections: [
      { from: "IKBKB", to: "NFKB1", type: "activation" }
    ]
  },

  hedgehog: {
    name: "Hedgehog Developmental Pathway",
    description: "Embryonic patterning reactivated in cancer",
    color: "#8b5cf6",
    genes: [
      {
        name: "PTCH1",
        fullName: "Patched 1",
        position: { x: 300, y: 200 },
        color: "#8b5cf6",
        function: "Receptor that inhibits SMO in absence of Hedgehog ligand",
        cancerRole: "PTCH1 loss causes basal cell carcinoma. Loss allows constitutive pathway activation.",
        cancerTypes: ["basal cell carcinoma", "medulloblastoma"],
        source: "https://www.ncbi.nlm.nih.gov/gene/5727"
      },
      {
        name: "SMO",
        fullName: "Smoothened",
        position: { x: 450, y: 200 },
        color: "#7c3aed",
        function: "G protein-coupled receptor that transduces Hedgehog signal",
        cancerRole: "SMO mutations activate pathway. Target of vismodegib in basal cell carcinoma.",
        cancerTypes: ["basal cell carcinoma"],
        source: "https://www.ncbi.nlm.nih.gov/gene/6608"
      },
      {
        name: "GLI1",
        fullName: "GLI Family Zinc Finger 1",
        position: { x: 375, y: 320 },
        color: "#6b21a8",
        function: "Transcription factor activated by Hedgehog signaling",
        cancerRole: "GLI1 drives expression of growth genes. Overexpressed in Hedgehog-driven cancers.",
        cancerTypes: ["medulloblastoma"],
        source: "https://www.ncbi.nlm.nih.gov/gene/2735"
      }
    ],
    connections: [
      { from: "PTCH1", to: "SMO", type: "inhibition" },
      { from: "SMO", to: "GLI1", type: "activation" }
    ]
  },

  notch: {
    name: "Notch Signaling Pathway",
    description: "Cell-cell communication controlling differentiation",
    color: "#d946ef",
    genes: [
      {
        name: "NOTCH1",
        fullName: "Notch Receptor 1",
        position: { x: 350, y: 220 },
        color: "#d946ef",
        function: "Transmembrane receptor cleaved upon ligand binding, releasing active intracellular domain",
        cancerRole: "NOTCH1 mutations cause T-cell ALL (activating) and squamous cell carcinoma (inactivating).",
        cancerTypes: ["T-cell ALL", "head and neck"],
        source: "https://www.ncbi.nlm.nih.gov/gene/4851"
      },
      {
        name: "RBPJ",
        fullName: "Recombination Signal Binding Protein",
        position: { x: 450, y: 320 },
        color: "#c026d3",
        function: "Transcription factor that partners with Notch intracellular domain",
        cancerRole: "RBPJ mediates Notch transcriptional programs controlling cell fate decisions.",
        cancerTypes: ["various"],
        source: "https://www.ncbi.nlm.nih.gov/gene/3516"
      }
    ],
    connections: [
      { from: "NOTCH1", to: "RBPJ", type: "activation" }
    ]
  },

  hif: {
    name: "HIF Hypoxia Response Pathway",
    description: "Adaptive response to low oxygen conditions",
    color: "#64748b",
    genes: [
      {
        name: "HIF1A",
        fullName: "Hypoxia Inducible Factor 1 Alpha",
        position: { x: 400, y: 250 },
        color: "#64748b",
        function: "Transcription factor stabilized under hypoxia, activating survival genes",
        cancerRole: "HIF1A drives angiogenesis, metabolic reprogramming, and metastasis in hypoxic tumors.",
        cancerTypes: ["renal", "various"],
        source: "https://www.ncbi.nlm.nih.gov/gene/3091"
      },
      {
        name: "VHL",
        fullName: "Von Hippel-Lindau",
        position: { x: 300, y: 150 },
        color: "#475569",
        function: "E3 ubiquitin ligase that marks HIF1A for degradation under normoxia",
        cancerRole: "VHL loss causes renal cell carcinoma. HIF1A accumulates even in normal oxygen.",
        cancerTypes: ["renal cell carcinoma"],
        source: "https://www.ncbi.nlm.nih.gov/gene/7428"
      }
    ],
    connections: [
      { from: "VHL", to: "HIF1A", type: "inhibition" }
    ]
  },

  mmr: {
    name: "DNA Mismatch Repair Pathway",
    description: "Corrects replication errors to maintain genome stability",
    color: "#3b82f6",
    genes: [
      {
        name: "MLH1",
        fullName: "MutL Homolog 1",
        position: { x: 350, y: 230 },
        color: "#3b82f6",
        function: "DNA mismatch repair protein that coordinates repair of replication errors",
        cancerRole: "MLH1 loss causes Lynch syndrome and microsatellite instability. Predisposes to colon/endometrial cancer.",
        cancerTypes: ["colon", "endometrial"],
        source: "https://www.ncbi.nlm.nih.gov/gene/4292"
      },
      {
        name: "MSH2",
        fullName: "MutS Homolog 2",
        position: { x: 450, y: 300 },
        color: "#2563eb",
        function: "Recognizes mismatched base pairs and recruits repair machinery",
        cancerRole: "MSH2 mutations cause Lynch syndrome. Loss leads to hypermutation and immunotherapy response.",
        cancerTypes: ["colon", "endometrial"],
        source: "https://www.ncbi.nlm.nih.gov/gene/4436"
      }
    ],
    connections: [
      { from: "MSH2", to: "MLH1", type: "activation" }
    ]
  },

  apoptosis: {
    name: "Apoptosis Cascade",
    description: "Programmed cell death pathway",
    color: "#ef4444",
    genes: [
      {
        name: "BCL2",
        fullName: "B-Cell Lymphoma 2",
        position: { x: 300, y: 200 },
        color: "#f59e0b",
        function: "Anti-apoptotic protein that prevents mitochondrial outer membrane permeabilization",
        cancerRole: "BCL2 overexpression blocks cell death. Translocation in follicular lymphoma. Target of venetoclax.",
        cancerTypes: ["lymphoma", "leukemia"],
        source: "https://www.ncbi.nlm.nih.gov/gene/596"
      },
      {
        name: "BAX",
        fullName: "BCL2 Associated X",
        position: { x: 450, y: 200 },
        color: "#dc2626",
        function: "Pro-apoptotic protein forming pores in mitochondria",
        cancerRole: "BAX activation releases cytochrome c, triggering caspase cascade and cell death.",
        cancerTypes: ["various"],
        source: "https://www.ncbi.nlm.nih.gov/gene/581"
      },
      {
        name: "CASP3",
        fullName: "Caspase 3",
        position: { x: 375, y: 330 },
        color: "#b91c1c",
        function: "Executioner caspase that cleaves cellular proteins during apoptosis",
        cancerRole: "CASP3 is terminal effector of apoptosis. Its inhibition prevents cancer cell death.",
        cancerTypes: ["various"],
        source: "https://www.ncbi.nlm.nih.gov/gene/836"
      }
    ],
    connections: [
      { from: "BCL2", to: "BAX", type: "inhibition" },
      { from: "BAX", to: "CASP3", type: "activation" }
    ]
  },

  vegf: {
    name: "VEGF Angiogenesis Pathway",
    description: "New blood vessel formation to supply tumors",
    color: "#22c55e",
    genes: [
      {
        name: "VEGFA",
        fullName: "Vascular Endothelial Growth Factor A",
        position: { x: 300, y: 220 },
        color: "#22c55e",
        function: "Secreted growth factor that stimulates endothelial cell proliferation",
        cancerRole: "VEGFA overexpression drives tumor angiogenesis. Target of bevacizumab (Avastin).",
        cancerTypes: ["various"],
        source: "https://www.ncbi.nlm.nih.gov/gene/7422"
      },
      {
        name: "KDR",
        fullName: "VEGFR2",
        position: { x: 480, y: 280 },
        color: "#16a34a",
        function: "Receptor tyrosine kinase that transduces VEGF signal in endothelial cells",
        cancerRole: "VEGFR2 activation promotes vessel sprouting. Target of tyrosine kinase inhibitors.",
        cancerTypes: ["various"],
        source: "https://www.ncbi.nlm.nih.gov/gene/3791"
      }
    ],
    connections: [
      { from: "VEGFA", to: "KDR", type: "activation" }
    ]
  },

  met: {
    name: "MET/HGF Pathway",
    description: "Promotes invasive growth and metastasis",
    color: "#06b6d4",
    genes: [
      {
        name: "MET",
        fullName: "MET Proto-Oncogene",
        position: { x: 400, y: 250 },
        color: "#06b6d4",
        function: "Receptor tyrosine kinase for hepatocyte growth factor",
        cancerRole: "MET amplification and mutations drive invasion and metastasis. Target of crizotinib.",
        cancerTypes: ["lung", "gastric", "renal"],
        source: "https://www.ncbi.nlm.nih.gov/gene/4233"
      },
      {
        name: "HGF",
        fullName: "Hepatocyte Growth Factor",
        position: { x: 280, y: 180 },
        color: "#0891b2",
        function: "Secreted ligand activating MET receptor",
        cancerRole: "HGF overexpression in tumor microenvironment promotes invasive growth.",
        cancerTypes: ["various"],
        source: "https://www.ncbi.nlm.nih.gov/gene/3082"
      }
    ],
    connections: [
      { from: "HGF", to: "MET", type: "activation" }
    ]
  },

  alk: {
    name: "ALK Fusion Pathway",
    description: "Oncogenic fusion protein driving lung cancer",
    color: "#a855f7",
    genes: [
      {
        name: "EML4",
        fullName: "Echinoderm Microtubule Associated Protein Like 4",
        position: { x: 320, y: 230 },
        color: "#a855f7",
        function: "Microtubule-associated protein, fusion partner of ALK",
        cancerRole: "EML4-ALK fusion found in 5% of lung adenocarcinomas. Creates constitutively active kinase.",
        cancerTypes: ["lung"],
        source: "https://www.ncbi.nlm.nih.gov/gene/27436"
      },
      {
        name: "ALK",
        fullName: "Anaplastic Lymphoma Kinase",
        position: { x: 480, y: 280 },
        color: "#9333ea",
        function: "Receptor tyrosine kinase, oncogenic when fused",
        cancerRole: "ALK fusions drive growth. Highly targetable by crizotinib, alectinib, and others.",
        cancerTypes: ["lung", "lymphoma"],
        source: "https://www.ncbi.nlm.nih.gov/gene/238"
      }
    ],
    connections: [
      { from: "EML4", to: "ALK", type: "activation" }
    ]
  },

  fgfr: {
    name: "FGF/FGFR Signaling Pathway",
    description: "Growth factor pathway controlling development and repair",
    color: "#f97316",
    genes: [
      {
        name: "FGFR1",
        fullName: "Fibroblast Growth Factor Receptor 1",
        position: { x: 350, y: 220 },
        color: "#f97316",
        function: "Receptor tyrosine kinase activated by FGF ligands",
        cancerRole: "FGFR1 amplification found in breast and lung squamous carcinomas. Drives proliferation.",
        cancerTypes: ["breast", "lung"],
        source: "https://www.ncbi.nlm.nih.gov/gene/2260"
      },
      {
        name: "FGFR2",
        fullName: "Fibroblast Growth Factor Receptor 2",
        position: { x: 450, y: 300 },
        color: "#ea580c",
        function: "RTK with roles in development and tissue repair",
        cancerRole: "FGFR2 fusions and mutations found in cholangiocarcinoma and endometrial cancer.",
        cancerTypes: ["cholangiocarcinoma", "endometrial"],
        source: "https://www.ncbi.nlm.nih.gov/gene/2263"
      }
    ],
    connections: [
      { from: "FGFR1", to: "FGFR2", type: "regulation" }
    ]
  },

  ras: {
    name: "RAS/RAF Signaling Cascade",
    description: "Critical node in multiple growth pathways",
    color: "#0ea5e9",
    genes: [
      {
        name: "HRAS",
        fullName: "Harvey RAS",
        position: { x: 300, y: 200 },
        color: "#0ea5e9",
        function: "Small GTPase switching between active and inactive states",
        cancerRole: "HRAS mutations lock protein in active state. Found in bladder and head/neck cancers.",
        cancerTypes: ["bladder", "head and neck"],
        source: "https://www.ncbi.nlm.nih.gov/gene/3265"
      },
      {
        name: "NRAS",
        fullName: "Neuroblastoma RAS",
        position: { x: 450, y: 200 },
        color: "#0284c7",
        function: "RAS isoform with similar signaling function",
        cancerRole: "NRAS mutations common in melanoma (20%) and AML. Drives MAPK pathway.",
        cancerTypes: ["melanoma", "AML"],
        source: "https://www.ncbi.nlm.nih.gov/gene/4893"
      },
      {
        name: "BRAF",
        fullName: "B-RAF",
        position: { x: 375, y: 320 },
        color: "#0369a1",
        function: "Serine/threonine kinase downstream of RAS",
        cancerRole: "BRAF V600E drives 50% of melanomas. Highly druggable target.",
        cancerTypes: ["melanoma", "thyroid"],
        source: "https://www.ncbi.nlm.nih.gov/gene/673"
      }
    ],
    connections: [
      { from: "HRAS", to: "BRAF", type: "activation" },
      { from: "NRAS", to: "BRAF", type: "activation" }
    ]
  },

  mtor: {
    name: "mTOR Complex Pathway",
    description: "Master regulator of cellular metabolism and growth",
    color: "#7c3aed",
    genes: [
      {
        name: "mTOR",
        fullName: "Mechanistic Target of Rapamycin",
        position: { x: 400, y: 230 },
        color: "#7c3aed",
        function: "Serine/threonine kinase integrating growth signals and nutrient availability",
        cancerRole: "mTOR hyperactivation drives protein synthesis and proliferation. Target of everolimus.",
        cancerTypes: ["renal", "breast"],
        source: "https://www.ncbi.nlm.nih.gov/gene/2475"
      },
      {
        name: "RPTOR",
        fullName: "Raptor (mTORC1 component)",
        position: { x: 300, y: 320 },
        color: "#6b21a8",
        function: "Regulatory protein defining mTORC1 specificity",
        cancerRole: "mTORC1 promotes growth. Sensitive to rapamycin and analogs.",
        cancerTypes: ["various"],
        source: "https://www.ncbi.nlm.nih.gov/gene/57521"
      },
      {
        name: "RICTOR",
        fullName: "Rictor (mTORC2 component)",
        position: { x: 500, y: 320 },
        color: "#581c87",
        function: "Defines mTORC2, which activates AKT",
        cancerRole: "mTORC2 promotes survival. Rapamycin-insensitive but targetable.",
        cancerTypes: ["various"],
        source: "https://www.ncbi.nlm.nih.gov/gene/253260"
      }
    ],
    connections: [
      { from: "mTOR", to: "RPTOR", type: "activation" },
      { from: "mTOR", to: "RICTOR", type: "activation" }
    ]
  },

  her2: {
    name: "HER2/EGFR Signaling Pathway",
    description: "Receptor tyrosine kinase signaling driving breast and gastric cancer",
    color: "#ec4899",
    genes: [
      {
        name: "ERBB2",
        fullName: "HER2 / ErbB2",
        position: { x: 400, y: 180 },
        color: "#ec4899",
        function: "Receptor tyrosine kinase that dimerizes and activates downstream PI3K and MAPK pathways",
        cancerRole: "HER2 amplification (20-25% of breast cancers) drives aggressive disease. Target of trastuzumab and pertuzumab.",
        cancerTypes: ["breast", "gastric", "ovarian"],
        source: "https://www.ncbi.nlm.nih.gov/gene/2064"
      },
      {
        name: "EGFR",
        fullName: "Epidermal Growth Factor Receptor",
        position: { x: 260, y: 180 },
        color: "#db2777",
        function: "RTK activated by EGF that promotes cell proliferation and survival",
        cancerRole: "EGFR mutations drive 10-15% of lung adenocarcinomas. Targeted by erlotinib, gefitinib, osimertinib.",
        cancerTypes: ["lung", "head and neck", "colon"],
        source: "https://www.ncbi.nlm.nih.gov/gene/1956"
      },
      {
        name: "PIK3CA",
        fullName: "PI3-Kinase Catalytic Alpha",
        position: { x: 300, y: 320 },
        color: "#a855f7",
        function: "Lipid kinase generating PIP3 to recruit AKT",
        cancerRole: "PIK3CA mutations in 30% of breast cancers, activating survival signaling.",
        cancerTypes: ["breast", "endometrial"],
        source: "https://www.ncbi.nlm.nih.gov/gene/5290"
      },
      {
        name: "KRAS",
        fullName: "Kirsten RAS",
        position: { x: 500, y: 320 },
        color: "#3b82f6",
        function: "Small GTPase relay from RTKs to MAPK pathway",
        cancerRole: "KRAS mutations bypass upstream receptor inhibition, causing therapy resistance.",
        cancerTypes: ["colon", "lung", "pancreatic"],
        source: "https://www.ncbi.nlm.nih.gov/gene/3845"
      }
    ],
    connections: [
      { from: "EGFR", to: "ERBB2", type: "activation" },
      { from: "ERBB2", to: "PIK3CA", type: "activation" },
      { from: "ERBB2", to: "KRAS", type: "activation" }
    ]
  },

  dna_damage: {
    name: "DNA Damage Response",
    description: "Sensing and repairing DNA double-strand breaks",
    color: "#0ea5e9",
    genes: [
      {
        name: "ATM",
        fullName: "Ataxia Telangiectasia Mutated",
        position: { x: 300, y: 180 },
        color: "#0ea5e9",
        function: "Kinase that senses DNA double-strand breaks and initiates damage response",
        cancerRole: "ATM mutations impair DNA repair checkpoint. Associated with breast cancer predisposition and CLL.",
        cancerTypes: ["breast", "CLL", "mantle cell lymphoma"],
        source: "https://www.ncbi.nlm.nih.gov/gene/472"
      },
      {
        name: "ATR",
        fullName: "ATR Serine/Threonine Kinase",
        position: { x: 480, y: 180 },
        color: "#0284c7",
        function: "Kinase activated by replication stress and single-stranded DNA",
        cancerRole: "ATR deficiency causes genomic instability. Synthetic lethal target in HR-deficient tumors.",
        cancerTypes: ["various"],
        source: "https://www.ncbi.nlm.nih.gov/gene/545"
      },
      {
        name: "CHEK1",
        fullName: "Checkpoint Kinase 1",
        position: { x: 300, y: 310 },
        color: "#0369a1",
        function: "Effector kinase that halts replication in response to ATR signaling",
        cancerRole: "CHK1 inhibitors sensitize cancer cells to replication stress. Used with chemotherapy.",
        cancerTypes: ["various"],
        source: "https://www.ncbi.nlm.nih.gov/gene/1111"
      },
      {
        name: "TP53",
        fullName: "Tumor Protein P53",
        position: { x: 480, y: 310 },
        color: "#ef4444",
        function: "Transcription factor activated by ATM to enforce cell cycle arrest or apoptosis",
        cancerRole: "Central effector of DNA damage response. Mutated in >50% of cancers.",
        cancerTypes: ["breast", "lung", "colon"],
        source: "https://www.ncbi.nlm.nih.gov/gene/7157"
      }
    ],
    connections: [
      { from: "ATM", to: "CHEK1", type: "activation" },
      { from: "ATR", to: "CHEK1", type: "activation" },
      { from: "ATM", to: "TP53", type: "activation" }
    ]
  },

  bcr_abl: {
    name: "BCR-ABL / CML Pathway",
    description: "Oncogenic fusion kinase driving chronic myeloid leukemia",
    color: "#f43f5e",
    genes: [
      {
        name: "BCR",
        fullName: "BCR Activator of RhoGEF",
        position: { x: 300, y: 200 },
        color: "#f43f5e",
        function: "Scaffolding protein; fusion with ABL creates constitutively active kinase",
        cancerRole: "BCR-ABL fusion (Philadelphia chromosome) is the driver of 95% of CML and some ALL cases.",
        cancerTypes: ["CML", "ALL"],
        source: "https://www.ncbi.nlm.nih.gov/gene/613"
      },
      {
        name: "ABL1",
        fullName: "ABL Proto-Oncogene 1",
        position: { x: 480, y: 200 },
        color: "#e11d48",
        function: "Tyrosine kinase normally regulated by SH3 domain; constitutively active in BCR-ABL fusion",
        cancerRole: "BCR-ABL drives uncontrolled myeloid proliferation. Target of imatinib (first molecularly targeted drug).",
        cancerTypes: ["CML", "ALL"],
        source: "https://www.ncbi.nlm.nih.gov/gene/25"
      },
      {
        name: "STAT5A",
        fullName: "Signal Transducer STAT5A",
        position: { x: 300, y: 340 },
        color: "#be123c",
        function: "Transcription factor activated by BCR-ABL promoting proliferation and survival",
        cancerRole: "STAT5 activation by BCR-ABL drives CML. Contributes to imatinib resistance.",
        cancerTypes: ["CML"],
        source: "https://www.ncbi.nlm.nih.gov/gene/6776"
      },
      {
        name: "CRKL",
        fullName: "CRK-Like Adaptor Protein",
        position: { x: 480, y: 340 },
        color: "#9f1239",
        function: "Adaptor protein phosphorylated by BCR-ABL, relaying survival signals",
        cancerRole: "CRKL phosphorylation is a biomarker of BCR-ABL activity. Participates in RAS activation.",
        cancerTypes: ["CML"],
        source: "https://www.ncbi.nlm.nih.gov/gene/1399"
      }
    ],
    connections: [
      { from: "BCR", to: "ABL1", type: "activation" },
      { from: "ABL1", to: "STAT5A", type: "activation" },
      { from: "ABL1", to: "CRKL", type: "activation" }
    ]
  }
};