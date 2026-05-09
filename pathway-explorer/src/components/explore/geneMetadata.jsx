// Extended gene metadata: mutations, drugs, and database links
export const geneMetadata = {
  TP53: {
    mutations: ["R175H", "R248W", "R248Q", "R273H", "G245S", "R249S"],
    drugs: ["APR-246 (Eprenetapopt)", "PRIMA-1MET", "RG7112 (MDM2 inhibitor)"],
    kegg: "https://www.genome.jp/entry/hsa:7157",
    uniprot: "https://www.uniprot.org/uniprotkb/P04637",
    reactome: "https://reactome.org/content/detail/R-HSA-5633007",
    cosmic: "https://cancer.sanger.ac.uk/gene/overview?ln=TP53"
  },
  MDM2: {
    mutations: ["Amplification", "SNP309 G/G"],
    drugs: ["RG7112", "Nutlin-3", "AMG-232", "Idasanutlin"],
    kegg: "https://www.genome.jp/entry/hsa:4193",
    uniprot: "https://www.uniprot.org/uniprotkb/Q00987",
    reactome: "https://reactome.org/content/detail/R-HSA-5633007",
    cosmic: "https://cancer.sanger.ac.uk/gene/overview?ln=MDM2"
  },
  CDKN1A: {
    mutations: ["Loss of expression", "Promoter methylation"],
    drugs: ["No direct targeted therapy (downstream of p53)"],
    kegg: "https://www.genome.jp/entry/hsa:1026",
    uniprot: "https://www.uniprot.org/uniprotkb/P38936",
    reactome: "https://reactome.org/content/detail/R-HSA-69656",
    cosmic: "https://cancer.sanger.ac.uk/gene/overview?ln=CDKN1A"
  },
  BAX: {
    mutations: ["Frameshift", "G105S"],
    drugs: ["venetoclax (indirect via BCL2 axis)", "Navitoclax"],
    kegg: "https://www.genome.jp/entry/hsa:581",
    uniprot: "https://www.uniprot.org/uniprotkb/Q07812",
    reactome: "https://reactome.org/content/detail/R-HSA-109606",
    cosmic: "https://cancer.sanger.ac.uk/gene/overview?ln=BAX"
  },
  KRAS: {
    mutations: ["G12D", "G12V", "G12C", "G13D", "Q61H"],
    drugs: ["Sotorasib (KRAS G12C)", "Adagrasib (KRAS G12C)", "Trametinib (MEK)"],
    kegg: "https://www.genome.jp/entry/hsa:3845",
    uniprot: "https://www.uniprot.org/uniprotkb/P01116",
    reactome: "https://reactome.org/content/detail/R-HSA-5672965",
    cosmic: "https://cancer.sanger.ac.uk/gene/overview?ln=KRAS"
  },
  BRAF: {
    mutations: ["V600E", "V600K", "V600D", "K601E"],
    drugs: ["Vemurafenib", "Dabrafenib", "Encorafenib"],
    kegg: "https://www.genome.jp/entry/hsa:673",
    uniprot: "https://www.uniprot.org/uniprotkb/P15056",
    reactome: "https://reactome.org/content/detail/R-HSA-5672965",
    cosmic: "https://cancer.sanger.ac.uk/gene/overview?ln=BRAF"
  },
  MEK1: {
    mutations: ["Q56P", "K57N", "D67N"],
    drugs: ["Trametinib", "Cobimetinib", "Binimetinib", "Selumetinib"],
    kegg: "https://www.genome.jp/entry/hsa:5604",
    uniprot: "https://www.uniprot.org/uniprotkb/Q02750",
    reactome: "https://reactome.org/content/detail/R-HSA-5672965",
    cosmic: "https://cancer.sanger.ac.uk/gene/overview?ln=MAP2K1"
  },
  ERK1: {
    mutations: ["Rare driver mutations"],
    drugs: ["Ulixertinib (ERK inhibitor)", "SCH772984"],
    kegg: "https://www.genome.jp/entry/hsa:5595",
    uniprot: "https://www.uniprot.org/uniprotkb/P27361",
    reactome: "https://reactome.org/content/detail/R-HSA-5672965",
    cosmic: "https://cancer.sanger.ac.uk/gene/overview?ln=MAPK3"
  },
  PIK3CA: {
    mutations: ["H1047R", "E542K", "E545K", "N345K"],
    drugs: ["Alpelisib", "Idelalisib", "Copanlisib", "Taselisib"],
    kegg: "https://www.genome.jp/entry/hsa:5290",
    uniprot: "https://www.uniprot.org/uniprotkb/P42336",
    reactome: "https://reactome.org/content/detail/R-HSA-5654736",
    cosmic: "https://cancer.sanger.ac.uk/gene/overview?ln=PIK3CA"
  },
  PTEN: {
    mutations: ["R130Q", "R173C", "Deletion", "Frameshift"],
    drugs: ["No direct therapy; AKT/mTOR inhibitors used downstream"],
    kegg: "https://www.genome.jp/entry/hsa:5728",
    uniprot: "https://www.uniprot.org/uniprotkb/P60484",
    reactome: "https://reactome.org/content/detail/R-HSA-5654736",
    cosmic: "https://cancer.sanger.ac.uk/gene/overview?ln=PTEN"
  },
  AKT: {
    mutations: ["E17K", "Amplification"],
    drugs: ["Capivasertib", "Ipatasertib", "MK-2206"],
    kegg: "https://www.genome.jp/entry/hsa:207",
    uniprot: "https://www.uniprot.org/uniprotkb/P31749",
    reactome: "https://reactome.org/content/detail/R-HSA-5654736",
    cosmic: "https://cancer.sanger.ac.uk/gene/overview?ln=AKT1"
  },
  mTOR: {
    mutations: ["E2419K", "Amplification"],
    drugs: ["Everolimus", "Temsirolimus", "Sirolimus", "Rapamycin"],
    kegg: "https://www.genome.jp/entry/hsa:2475",
    uniprot: "https://www.uniprot.org/uniprotkb/P42345",
    reactome: "https://reactome.org/content/detail/R-HSA-165159",
    cosmic: "https://cancer.sanger.ac.uk/gene/overview?ln=MTOR"
  },
  APC: {
    mutations: ["E1309", "R1450*", "Q1429*", "Frameshift"],
    drugs: ["No direct therapy; downstream Wnt inhibitors in development"],
    kegg: "https://www.genome.jp/entry/hsa:324",
    uniprot: "https://www.uniprot.org/uniprotkb/P25054",
    reactome: "https://reactome.org/content/detail/R-HSA-4641257",
    cosmic: "https://cancer.sanger.ac.uk/gene/overview?ln=APC"
  },
  CTNNB1: {
    mutations: ["S45F", "S45P", "S37C", "D32G"],
    drugs: ["PRI-724", "CWP232228"],
    kegg: "https://www.genome.jp/entry/hsa:1499",
    uniprot: "https://www.uniprot.org/uniprotkb/P35222",
    reactome: "https://reactome.org/content/detail/R-HSA-4641257",
    cosmic: "https://cancer.sanger.ac.uk/gene/overview?ln=CTNNB1"
  },
  BRCA1: {
    mutations: ["185delAG", "5382insC", "C61G", "T300G"],
    drugs: ["Olaparib (PARP inhibitor)", "Rucaparib", "Niraparib", "Talazoparib"],
    kegg: "https://www.genome.jp/entry/hsa:672",
    uniprot: "https://www.uniprot.org/uniprotkb/P38398",
    reactome: "https://reactome.org/content/detail/R-HSA-5693567",
    cosmic: "https://cancer.sanger.ac.uk/gene/overview?ln=BRCA1"
  },
  BRCA2: {
    mutations: ["6174delT", "999del5", "R2336H"],
    drugs: ["Olaparib (PARP inhibitor)", "Rucaparib", "Niraparib", "Talazoparib"],
    kegg: "https://www.genome.jp/entry/hsa:675",
    uniprot: "https://www.uniprot.org/uniprotkb/P51587",
    reactome: "https://reactome.org/content/detail/R-HSA-5693567",
    cosmic: "https://cancer.sanger.ac.uk/gene/overview?ln=BRCA2"
  },
  RAD51: {
    mutations: ["R150Q", "R303W"],
    drugs: ["RI-1 (RAD51 inhibitor)", "B02"],
    kegg: "https://www.genome.jp/entry/hsa:5888",
    uniprot: "https://www.uniprot.org/uniprotkb/Q06609",
    reactome: "https://reactome.org/content/detail/R-HSA-5693567",
    cosmic: "https://cancer.sanger.ac.uk/gene/overview?ln=RAD51"
  },
  RB1: {
    mutations: ["Deletion", "Frameshift", "Splice site"],
    drugs: ["Palbociclib", "Ribociclib", "Abemaciclib (CDK4/6 inhibitors)"],
    kegg: "https://www.genome.jp/entry/hsa:5925",
    uniprot: "https://www.uniprot.org/uniprotkb/P06400",
    reactome: "https://reactome.org/content/detail/R-HSA-69656",
    cosmic: "https://cancer.sanger.ac.uk/gene/overview?ln=RB1"
  },
  CDK4: {
    mutations: ["Amplification", "R24C"],
    drugs: ["Palbociclib", "Ribociclib", "Abemaciclib"],
    kegg: "https://www.genome.jp/entry/hsa:1019",
    uniprot: "https://www.uniprot.org/uniprotkb/P11802",
    reactome: "https://reactome.org/content/detail/R-HSA-69656",
    cosmic: "https://cancer.sanger.ac.uk/gene/overview?ln=CDK4"
  },
  CCND1: {
    mutations: ["Amplification"],
    drugs: ["Palbociclib", "Ribociclib", "Abemaciclib"],
    kegg: "https://www.genome.jp/entry/hsa:595",
    uniprot: "https://www.uniprot.org/uniprotkb/P24385",
    reactome: "https://reactome.org/content/detail/R-HSA-69656",
    cosmic: "https://cancer.sanger.ac.uk/gene/overview?ln=CCND1"
  },
  BCL2: {
    mutations: ["t(14;18) translocation", "Amplification"],
    drugs: ["Venetoclax", "Navitoclax", "Obatoclax"],
    kegg: "https://www.genome.jp/entry/hsa:596",
    uniprot: "https://www.uniprot.org/uniprotkb/P10415",
    reactome: "https://reactome.org/content/detail/R-HSA-109606",
    cosmic: "https://cancer.sanger.ac.uk/gene/overview?ln=BCL2"
  },
  CASP3: {
    mutations: ["Rare loss of function"],
    drugs: ["No direct approved drugs; apoptosis pathway target"],
    kegg: "https://www.genome.jp/entry/hsa:836",
    uniprot: "https://www.uniprot.org/uniprotkb/P42574",
    reactome: "https://reactome.org/content/detail/R-HSA-109606",
    cosmic: "https://cancer.sanger.ac.uk/gene/overview?ln=CASP3"
  },
  VEGFA: {
    mutations: ["Amplification", "-2578C/A SNP"],
    drugs: ["Bevacizumab", "Ranibizumab", "Aflibercept"],
    kegg: "https://www.genome.jp/entry/hsa:7422",
    uniprot: "https://www.uniprot.org/uniprotkb/P15692",
    reactome: "https://reactome.org/content/detail/R-HSA-194138",
    cosmic: "https://cancer.sanger.ac.uk/gene/overview?ln=VEGFA"
  },
  HIF1A: {
    mutations: ["P582S", "A588V"],
    drugs: ["Belzutifan (HIF-2α inhibitor)", "PT2977"],
    kegg: "https://www.genome.jp/entry/hsa:3091",
    uniprot: "https://www.uniprot.org/uniprotkb/Q16665",
    reactome: "https://reactome.org/content/detail/R-HSA-1234174",
    cosmic: "https://cancer.sanger.ac.uk/gene/overview?ln=HIF1A"
  },
  STAT3: {
    mutations: ["Y640F", "D661Y"],
    drugs: ["Ruxolitinib (JAK)", "Stattic", "OPB-51602"],
    kegg: "https://www.genome.jp/entry/hsa:6774",
    uniprot: "https://www.uniprot.org/uniprotkb/P40763",
    reactome: "https://reactome.org/content/detail/R-HSA-1280215",
    cosmic: "https://cancer.sanger.ac.uk/gene/overview?ln=STAT3"
  },
  NFKB1: {
    mutations: ["Amplification"],
    drugs: ["Bortezomib", "Ixazomib"],
    kegg: "https://www.genome.jp/entry/hsa:4790",
    uniprot: "https://www.uniprot.org/uniprotkb/P19838",
    reactome: "https://reactome.org/content/detail/R-HSA-9013148",
    cosmic: "https://cancer.sanger.ac.uk/gene/overview?ln=NFKB1"
  },
  MET: {
    mutations: ["Exon 14 skipping", "Amplification", "D1228N"],
    drugs: ["Crizotinib", "Capmatinib", "Tepotinib", "Cabozantinib"],
    kegg: "https://www.genome.jp/entry/hsa:4233",
    uniprot: "https://www.uniprot.org/uniprotkb/P08581",
    reactome: "https://reactome.org/content/detail/R-HSA-6806003",
    cosmic: "https://cancer.sanger.ac.uk/gene/overview?ln=MET"
  },
  NOTCH1: {
    mutations: ["Activating (HD/PEST domain)", "Inactivating (SCC)"],
    drugs: ["Nirogacestat", "LY3039478"],
    kegg: "https://www.genome.jp/entry/hsa:4851",
    uniprot: "https://www.uniprot.org/uniprotkb/P46531",
    reactome: "https://reactome.org/content/detail/R-HSA-157118",
    cosmic: "https://cancer.sanger.ac.uk/gene/overview?ln=NOTCH1"
  },
  SMAD4: {
    mutations: ["R361H", "R361C", "Deletion"],
    drugs: ["No direct therapy; TGF-β receptor inhibitors upstream"],
    kegg: "https://www.genome.jp/entry/hsa:4089",
    uniprot: "https://www.uniprot.org/uniprotkb/Q13485",
    reactome: "https://reactome.org/content/detail/R-HSA-2173789",
    cosmic: "https://cancer.sanger.ac.uk/gene/overview?ln=SMAD4"
  },
  JAK2: {
    mutations: ["V617F", "Exon 12"],
    drugs: ["Ruxolitinib", "Fedratinib", "Pacritinib"],
    kegg: "https://www.genome.jp/entry/hsa:3717",
    uniprot: "https://www.uniprot.org/uniprotkb/O60674",
    reactome: "https://reactome.org/content/detail/R-HSA-1280215",
    cosmic: "https://cancer.sanger.ac.uk/gene/overview?ln=JAK2"
  },
  VHL: {
    mutations: ["R167Q", "Y98H", "Deletion"],
    drugs: ["Belzutifan (HIF-2α targeting)", "Sunitinib"],
    kegg: "https://www.genome.jp/entry/hsa:7428",
    uniprot: "https://www.uniprot.org/uniprotkb/P40337",
    reactome: "https://reactome.org/content/detail/R-HSA-1234174",
    cosmic: "https://cancer.sanger.ac.uk/gene/overview?ln=VHL"
  },
  MLH1: {
    mutations: ["Promoter methylation", "A681T", "S247X"],
    drugs: ["Pembrolizumab", "Nivolumab (MSI-H/dMMR)"],
    kegg: "https://www.genome.jp/entry/hsa:4292",
    uniprot: "https://www.uniprot.org/uniprotkb/P40692",
    reactome: "https://reactome.org/content/detail/R-HSA-5358565",
    cosmic: "https://cancer.sanger.ac.uk/gene/overview?ln=MLH1"
  },
  MSH2: {
    mutations: ["G322D", "Deletion"],
    drugs: ["Pembrolizumab", "Nivolumab (MSI-H/dMMR)"],
    kegg: "https://www.genome.jp/entry/hsa:4436",
    uniprot: "https://www.uniprot.org/uniprotkb/P43246",
    reactome: "https://reactome.org/content/detail/R-HSA-5358565",
    cosmic: "https://cancer.sanger.ac.uk/gene/overview?ln=MSH2"
  },
  ALK: {
    mutations: ["EML4-ALK fusion", "L1196M (resistance)", "G1202R"],
    drugs: ["Crizotinib", "Alectinib", "Brigatinib", "Lorlatinib"],
    kegg: "https://www.genome.jp/entry/hsa:238",
    uniprot: "https://www.uniprot.org/uniprotkb/Q9UM73",
    reactome: "https://reactome.org/content/detail/R-HSA-9725554",
    cosmic: "https://cancer.sanger.ac.uk/gene/overview?ln=ALK"
  },
  EGFR: {
    mutations: ["L858R", "T790M", "Exon 19 del", "C797S"],
    drugs: ["Erlotinib", "Gefitinib", "Osimertinib", "Afatinib"],
    kegg: "https://www.genome.jp/entry/hsa:1956",
    uniprot: "https://www.uniprot.org/uniprotkb/P00533",
    reactome: "https://reactome.org/content/detail/R-HSA-177929",
    cosmic: "https://cancer.sanger.ac.uk/gene/overview?ln=EGFR"
  },
};

// Downstream effect map for mutation simulator
export const downstreamEffects = {
  TP53: {
    knockedOut: {
      affected: ["MDM2", "CDKN1A", "BAX", "BCL2"],
      description: "Loss of TP53 eliminates cell cycle arrest and apoptosis. MDM2 becomes unopposed, CDKN1A (p21) loses transcriptional activation, BAX-driven apoptosis fails, BCL2 survival signals dominate.",
      consequence: "Cells with DNA damage bypass death and continue dividing → genomic instability → cancer"
    }
  },
  BRCA1: {
    knockedOut: {
      affected: ["RAD51", "TP53"],
      description: "BRCA1 loss prevents loading of RAD51 onto DNA breaks, eliminating homologous recombination. Cells accumulate double-strand breaks.",
      consequence: "Genomic instability, dependence on error-prone repair → breast/ovarian cancer predisposition"
    }
  },
  KRAS: {
    activated: {
      affected: ["BRAF", "MEK1", "ERK1", "PIK3CA", "AKT"],
      description: "Oncogenic KRAS (G12D/V/C) remains locked in active GTP-bound state. Constitutively activates both MAPK (BRAF→MEK→ERK) and PI3K/AKT pathways simultaneously.",
      consequence: "Constant growth signals, resistance to apoptosis, metabolic reprogramming → pancreatic/lung/colon cancer"
    }
  },
  PTEN: {
    knockedOut: {
      affected: ["AKT", "mTOR"],
      description: "Loss of PTEN allows PIP3 accumulation, keeping AKT constitutively active. mTOR signaling becomes hyperactivated.",
      consequence: "Cell survival, growth, and protein synthesis in overdrive → prostate, endometrial, brain cancers"
    }
  },
  PIK3CA: {
    activated: {
      affected: ["AKT", "mTOR"],
      description: "PIK3CA mutations (H1047R, E542K) create constitutively active PI3K that floods cells with PIP3, driving AKT and mTOR activation.",
      consequence: "Uncontrolled survival signaling → breast, endometrial cancer"
    }
  },
  BRAF: {
    activated: {
      affected: ["MEK1", "ERK1"],
      description: "BRAF V600E is constitutively active, bypassing RAS requirement. Drives MEK→ERK cascade without growth factor input.",
      consequence: "Continuous proliferation signals → melanoma (50%), thyroid cancer"
    }
  },
  BCL2: {
    activated: {
      affected: ["CASP3", "BAX"],
      description: "BCL2 overexpression sequesters pro-apoptotic BAX, preventing mitochondrial permeabilization. Caspase-3 activation is blocked.",
      consequence: "Cells resist apoptosis, accumulate damage → lymphoma, CLL"
    }
  },
  RB1: {
    knockedOut: {
      affected: ["CDK4", "CCND1"],
      description: "Loss of RB1 removes the G1/S checkpoint gatekeeper. E2F transcription factors are constitutively active, driving unrestrained S-phase entry.",
      consequence: "Unchecked cell cycle progression → retinoblastoma, osteosarcoma, lung cancer"
    }
  }
};

// Learning mode walkthroughs
export const learningWalkthroughs = {
  brca1_breast: {
    title: "How does a BRCA1 mutation lead to breast cancer?",
    pathway: "brca",
    steps: [
      {
        gene: "BRCA1",
        title: "Step 1: Normal BRCA1 function",
        description: "In healthy cells, BRCA1 acts as a DNA damage sensor. When double-strand breaks occur (from radiation, chemicals, or replication errors), BRCA1 is recruited to the break site and coordinates the repair machinery.",
        highlight: ["BRCA1"]
      },
      {
        gene: "RAD51",
        title: "Step 2: BRCA1 loads RAD51 onto DNA breaks",
        description: "BRCA1 recruits and loads RAD51 recombinase onto the broken DNA strand. RAD51 then catalyzes a search for the matching sequence on the sister chromatid, enabling accurate repair by homologous recombination.",
        highlight: ["BRCA1", "RAD51"]
      },
      {
        gene: "BRCA2",
        title: "Step 3: BRCA2 stabilizes the repair complex",
        description: "BRCA2 works alongside BRCA1 to stabilize RAD51 filaments at break sites. Together they ensure error-free repair. Loss of either gene eliminates this safeguard.",
        highlight: ["BRCA1", "BRCA2", "RAD51"]
      },
      {
        gene: "BRCA1",
        title: "Step 4: BRCA1 mutation inherited",
        description: "An inherited BRCA1 mutation (like 185delAG) means one copy is already non-functional from birth. When the remaining good copy is lost through somatic mutation (Loss of Heterozygosity), repair capacity collapses.",
        highlight: ["BRCA1"]
      },
      {
        gene: "RAD51",
        title: "Step 5: Genomic instability accumulates",
        description: "Without BRCA1/2-mediated homologous recombination, cells resort to error-prone repair mechanisms (NHEJ). Each DNA break introduces mutations. The genome becomes increasingly unstable.",
        highlight: ["RAD51", "BRCA1", "BRCA2"]
      },
      {
        gene: "BRCA1",
        title: "Step 6: Cancer transformation",
        description: "Accumulating mutations eventually hit critical oncogenes and tumor suppressors. Cells gain self-sufficiency in growth signals, evade apoptosis, and metastasize. BRCA1 mutation carriers have ~70% lifetime breast cancer risk.",
        highlight: ["BRCA1", "BRCA2", "RAD51"]
      }
    ]
  },
  tp53_cancer: {
    title: "How does TP53 loss cause cancer?",
    pathway: "p53",
    steps: [
      {
        gene: "TP53",
        title: "Step 1: TP53 — The Guardian of the Genome",
        description: "In normal cells, TP53 protein is kept at low levels by MDM2, which targets it for degradation. But when DNA damage occurs, TP53 is stabilized and activated.",
        highlight: ["TP53", "MDM2"]
      },
      {
        gene: "MDM2",
        title: "Step 2: The MDM2 feedback loop",
        description: "TP53 and MDM2 exist in a critical balance. TP53 transcribes MDM2, which then ubiquitinates TP53 for degradation. This feedback loop keeps TP53 in check during normal conditions.",
        highlight: ["TP53", "MDM2"]
      },
      {
        gene: "CDKN1A",
        title: "Step 3: TP53 activates cell cycle arrest",
        description: "Upon activation, TP53 transcribes CDKN1A (p21), which inhibits CDK complexes, halting the cell cycle at G1/S. This gives the cell time to repair DNA before replication.",
        highlight: ["TP53", "CDKN1A"]
      },
      {
        gene: "BAX",
        title: "Step 4: TP53 can trigger apoptosis",
        description: "If damage is too severe, TP53 transcribes BAX, a pro-apoptotic protein. BAX forms pores in mitochondria, releasing cytochrome c and activating caspases that destroy the cell.",
        highlight: ["TP53", "BAX"]
      },
      {
        gene: "TP53",
        title: "Step 5: TP53 mutation",
        description: "A mutation in TP53 (e.g., R175H or R248W) inactivates its DNA-binding domain. The mutant protein can't transcribe target genes. Some mutations even create a dominant-negative effect, blocking wild-type p53.",
        highlight: ["TP53"]
      },
      {
        gene: "BAX",
        title: "Step 6: Loss of all safeguards",
        description: "Without TP53: damaged cells don't arrest (CDKN1A not induced), cells don't die (BAX not induced), MDM2 runs unchecked. Cells with oncogenic mutations survive and proliferate — this is cancer.",
        highlight: ["TP53", "MDM2", "CDKN1A", "BAX"]
      }
    ]
  },
  kras_signaling: {
    title: "How does KRAS G12D drive pancreatic cancer?",
    pathway: "mapk",
    steps: [
      {
        gene: "KRAS",
        title: "Step 1: Normal KRAS signaling",
        description: "Normally, KRAS cycles between active (GTP-bound) and inactive (GDP-bound) states. Growth factor signals activate it, but GTPase activity rapidly turns it off, preventing sustained signaling.",
        highlight: ["KRAS"]
      },
      {
        gene: "KRAS",
        title: "Step 2: The G12D mutation",
        description: "The G12D point mutation substitutes aspartate for glycine at position 12. This blocks GTPase activity — KRAS is permanently 'stuck on', constantly sending growth signals without needing external input.",
        highlight: ["KRAS"]
      },
      {
        gene: "BRAF",
        title: "Step 3: MAPK pathway hyperactivation",
        description: "Constitutively active KRAS continuously activates BRAF, then MEK1, then ERK1. This cascade tells the nucleus to constantly transcribe genes for cell division.",
        highlight: ["KRAS", "BRAF", "MEK1", "ERK1"]
      },
      {
        gene: "ERK1",
        title: "Step 4: Nuclear consequences",
        description: "ERK1 enters the nucleus and phosphorylates transcription factors (MYC, ELK1), driving expression of cyclins and growth genes. The cell divides uncontrollably.",
        highlight: ["MEK1", "ERK1"]
      },
      {
        gene: "KRAS",
        title: "Step 5: Resistance mechanisms",
        description: "Because KRAS is so far upstream, cancer cells can bypass most targeted therapies. Inhibiting BRAF or MEK often leads to reactivation through feedback loops. This makes KRAS-mutant cancers notoriously hard to treat.",
        highlight: ["KRAS", "BRAF", "MEK1"]
      },
      {
        gene: "ERK1",
        title: "Step 6: New hope — direct KRAS inhibitors",
        description: "Sotorasib and Adagrasib specifically target KRAS G12C (cysteine mutation), locking it in the inactive state. This breakthrough shows KRAS can finally be drugged, though G12D remains a challenge.",
        highlight: ["KRAS", "BRAF", "MEK1", "ERK1"]
      }
    ]
  }
};