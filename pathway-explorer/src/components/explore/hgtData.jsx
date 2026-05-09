export const hgtData = {
  "TP53": {
    hgtEvidence: "moderate",
    donorLineage: "Early metazoan / cnidarian ancestor",
    evidenceNote: "p53/p63/p73 family shows mosaic phylogeny in basal metazoans; domain-level HGT proposed. Homologs found in non-metazoan lineages (Ciona, Trichoplax) suggesting ancient lateral transfers predating the animal-fungal split.",
    pmid: "20547567",
    confidence: 0.55
  },
  "KRAS": {
    hgtEvidence: "low",
    donorLineage: "Retroviral origin (Harvey/Kirsten murine sarcoma virus)",
    evidenceNote: "Cellular KRAS proto-oncogene was captured by acute transforming retroviruses. The viral versions carry activating point mutations. The retroviral acquisition event is well-documented but represents virus←host capture, not classical HGT.",
    pmid: "6297757",
    confidence: 0.45
  },
  "BRAF": {
    hgtEvidence: "low",
    donorLineage: "Retroviral/transposon ancestry suspected",
    evidenceNote: "Raf kinase domain phylogeny shows unusual sequence conservation across distant kingdoms, suggesting ancestral HGT events predating animal radiation. The Raf family may have been acquired from a unicellular ancestor via lateral transfer.",
    pmid: "15520811",
    confidence: 0.35
  },
  "ABL1": {
    hgtEvidence: "high",
    donorLineage: "Abelson murine leukemia virus (retroviral capture)",
    evidenceNote: "v-abl oncogene derived by retroviral transduction of cellular c-ABL. Classic documented case of gene acquisition by virus from mammalian host, with subsequent reintroduction of mutated version as an oncogene. BCR-ABL fusion in CML directly results from this evolutionary history.",
    pmid: "6297757",
    confidence: 0.85
  },
  "BCL2": {
    hgtEvidence: "low",
    donorLineage: "Deep eukaryotic roots; viral BCL-2 homologs (vBCL-2)",
    evidenceNote: "BCL-2 family has deep eukaryotic roots but no confirmed HGT in human lineage. Several herpesviruses encode functional BCL-2 homologs (BHRF1, KSBcl-2), suggesting ancient bidirectional virus-host gene exchange events. The proto-apoptotic BH3-domain is evolutionarily conserved across animals.",
    pmid: "15102481",
    confidence: 0.3
  },
  "STAT3": {
    hgtEvidence: "low",
    donorLineage: "Ancestral eukaryotic; possible early opisthokonts",
    evidenceNote: "STAT proteins are found across Metazoa but their presence in mycetozoa (slime molds) suggests the STAT domain predates animals. Phylogenetic incongruence in STAT family members has been interpreted as evidence of ancient HGT between opisthokont lineages.",
    pmid: "12586383",
    confidence: 0.3
  },
  "EGFR": {
    hgtEvidence: "low",
    donorLineage: "Ancestral RTK expansion; possible ancient HGT",
    evidenceNote: "EGF receptor-like domains are found in bacteria (suggesting ancient horizontal acquisition into eukaryotic lineage) and in poxviruses. The EGF ligand domain shows phylogenetic incongruence consistent with multiple ancient transfer events.",
    pmid: "18077460",
    confidence: 0.35
  }
};

export const hgtConfidenceColor = (confidence) => {
  if (confidence >= 0.7) return "#ff4081";
  if (confidence >= 0.45) return "#ff9800";
  return "#78909c";
};

export const hgtEvidenceLevels = {
  high: { label: "Strong HGT Evidence", color: "#ff4081" },
  moderate: { label: "Moderate Evidence", color: "#ff9800" },
  low: { label: "Weak / Ancestral Signal", color: "#78909c" }
};