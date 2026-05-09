export const drugTargetData = {
  "vemurafenib": { targets: ["BRAF"], mechanism: "BRAF V600E selective inhibitor", fdaApproved: true, indication: "Melanoma" },
  "dabrafenib": { targets: ["BRAF"], mechanism: "BRAF inhibitor", fdaApproved: true, indication: "Melanoma, NSCLC" },
  "encorafenib": { targets: ["BRAF"], mechanism: "BRAF inhibitor", fdaApproved: true, indication: "Melanoma, CRC" },
  "trametinib": { targets: ["MEK1"], mechanism: "MEK1/2 inhibitor", fdaApproved: true, indication: "Melanoma, NSCLC" },
  "cobimetinib": { targets: ["MEK1"], mechanism: "MEK1 inhibitor", fdaApproved: true, indication: "Melanoma" },
  "binimetinib": { targets: ["MEK1"], mechanism: "MEK1/2 inhibitor", fdaApproved: true, indication: "Melanoma" },
  "selumetinib": { targets: ["MEK1"], mechanism: "MEK1/2 inhibitor", fdaApproved: true, indication: "Neurofibromatosis type 1" },
  "sotorasib": { targets: ["KRAS"], mechanism: "KRAS G12C covalent inhibitor", fdaApproved: true, indication: "NSCLC, CRC" },
  "adagrasib": { targets: ["KRAS"], mechanism: "KRAS G12C inhibitor", fdaApproved: true, indication: "NSCLC" },
  "alpelisib": { targets: ["PIK3CA"], mechanism: "PI3Kα inhibitor", fdaApproved: true, indication: "Breast cancer (PIK3CA-mutated)" },
  "idelalisib": { targets: ["PIK3CA"], mechanism: "PI3Kδ inhibitor", fdaApproved: true, indication: "CLL, follicular lymphoma" },
  "everolimus": { targets: ["mTOR"], mechanism: "mTOR inhibitor (rapalog)", fdaApproved: true, indication: "RCC, breast, NETs" },
  "temsirolimus": { targets: ["mTOR"], mechanism: "mTOR inhibitor", fdaApproved: true, indication: "Renal cell carcinoma" },
  "rapamycin": { targets: ["mTOR"], mechanism: "mTOR allosteric inhibitor", fdaApproved: true, indication: "Transplant immunosuppression" },
  "venetoclax": { targets: ["BCL2"], mechanism: "BCL-2 BH3 mimetic", fdaApproved: true, indication: "CLL, AML" },
  "navitoclax": { targets: ["BCL2"], mechanism: "BCL-2/BCL-XL inhibitor", fdaApproved: false, indication: "Clinical trials" },
  "imatinib": { targets: ["ABL1"], mechanism: "BCR-ABL/KIT/PDGFR inhibitor", fdaApproved: true, indication: "CML, GIST" },
  "dasatinib": { targets: ["ABL1"], mechanism: "BCR-ABL/Src kinase inhibitor", fdaApproved: true, indication: "CML, Ph+ ALL" },
  "nilotinib": { targets: ["ABL1"], mechanism: "BCR-ABL inhibitor (2nd gen)", fdaApproved: true, indication: "CML" },
  "olaparib": { targets: ["BRCA1", "BRCA2"], mechanism: "PARP inhibitor (synthetic lethality)", fdaApproved: true, indication: "Ovarian, breast, prostate" },
  "rucaparib": { targets: ["BRCA1", "BRCA2"], mechanism: "PARP1/2/3 inhibitor", fdaApproved: true, indication: "Ovarian cancer" },
  "niraparib": { targets: ["BRCA1", "BRCA2"], mechanism: "PARP1/2 inhibitor", fdaApproved: true, indication: "Ovarian cancer" },
  "nutlin-3": { targets: ["MDM2"], mechanism: "MDM2-p53 interaction disruptor", fdaApproved: false, indication: "Research only" },
  "rg7112": { targets: ["MDM2"], mechanism: "MDM2 inhibitor", fdaApproved: false, indication: "Clinical trials" },
  "idasanutlin": { targets: ["MDM2"], mechanism: "MDM2 inhibitor", fdaApproved: false, indication: "Clinical trials (AML)" },
  "palbociclib": { targets: ["CDK4"], mechanism: "CDK4/6 inhibitor", fdaApproved: true, indication: "HR+ breast cancer" },
  "ribociclib": { targets: ["CDK4"], mechanism: "CDK4/6 inhibitor", fdaApproved: true, indication: "HR+ breast cancer" },
  "abemaciclib": { targets: ["CDK4"], mechanism: "CDK4/6 inhibitor", fdaApproved: true, indication: "HR+ breast cancer" },
  "trastuzumab": { targets: ["ERBB2"], mechanism: "HER2 monoclonal antibody", fdaApproved: true, indication: "HER2+ breast, gastric" },
  "pertuzumab": { targets: ["ERBB2"], mechanism: "HER2 dimerization inhibitor", fdaApproved: true, indication: "HER2+ breast cancer" },
  "erlotinib": { targets: ["EGFR"], mechanism: "EGFR tyrosine kinase inhibitor", fdaApproved: true, indication: "NSCLC, pancreatic" },
  "gefitinib": { targets: ["EGFR"], mechanism: "EGFR TKI (1st gen)", fdaApproved: true, indication: "EGFR-mutant NSCLC" },
  "osimertinib": { targets: ["EGFR"], mechanism: "EGFR TKI (3rd gen, T790M)", fdaApproved: true, indication: "EGFR-mutant NSCLC" },
  "bevacizumab": { targets: ["VEGFA"], mechanism: "Anti-VEGFA monoclonal antibody", fdaApproved: true, indication: "Multiple solid tumors" },
  "crizotinib": { targets: ["ALK", "MET"], mechanism: "ALK/ROS1/MET inhibitor", fdaApproved: true, indication: "ALK+ NSCLC" },
  "alectinib": { targets: ["ALK"], mechanism: "ALK inhibitor (2nd gen)", fdaApproved: true, indication: "ALK+ NSCLC" },
  "ruxolitinib": { targets: ["JAK2"], mechanism: "JAK1/2 inhibitor", fdaApproved: true, indication: "Myelofibrosis, PV" },
  "belzutifan": { targets: ["HIF1A", "VHL"], mechanism: "HIF-2α inhibitor", fdaApproved: true, indication: "VHL-related RCC" },
  "capmatinib": { targets: ["MET"], mechanism: "MET inhibitor", fdaApproved: true, indication: "METex14 NSCLC" },
  "capivasertib": { targets: ["AKT"], mechanism: "pan-AKT inhibitor", fdaApproved: true, indication: "Breast cancer" },
};

export function lookupDrug(query) {
  if (!query) return null;
  const normalized = query.toLowerCase().trim();
  if (drugTargetData[normalized]) return { name: normalized, ...drugTargetData[normalized] };
  const partialKey = Object.keys(drugTargetData).find(k => k.includes(normalized) || normalized.includes(k));
  if (partialKey) return { name: partialKey, ...drugTargetData[partialKey] };
  return null;
}