#OncoScope
Investigating biological pathways for cancer research
Oncoscope is an open-source computational platform for simulating and visualizing cancer-related molecular pathway dynamics. It enables researchers and students to model how specific gene mutations alter pathway behavior — without requiring wet-lab access.
The current focus is the p53 tumor suppressor pathway, with support for wildtype vs. gain-of-function mutant comparisons across clinically significant TP53 hotspot mutations.

What It Does

Simulates wildtype vs. mutant p53 pathway states and highlights nodes and interactions that change under mutation
Supports key TP53 hotspot mutations including R175H, R273H, and R248W
Fetches pathway data from KEGG and Reactome databases
Returns structured JSON representing pathway topology and mutation-induced state changes
Provides an interactive frontend for visualizing pathway graphs and mutation impact in real time


Why It Exists
Most cancer pathway tools are either too abstract for hypothesis generation or locked behind institutional paywalls. Oncoscope was built to give students and researchers a free, interactive, and computationally honest way to explore how a single missense mutation in TP53 can rewire a cell's response to DNA damage, shifting it from tumor suppression toward oncogenesis.
Oncoscope is currently used as a supplementary teaching resource at Cornell University, the University of Delaware, and four additional institutions.

Tech Stack
LayerTechnologyFrontendReact, React FlowBackendFlask (Python)Data sourcesKEGG API, Reactome REST APIAnalysispandas, NumPy, scikit-learnTestingpytestDeploymentVercel (frontend), Render (backend)

Project Structure
oncoscope/
├── frontend/          # React app
├── backend/           # Flask API
│   ├── app.py
│   └── routes/
├── data/
│   ├── pathway.json   # Cleaned p53 pathway graph
│   └── references.md  # Data sources and citations
├── tests/             # pytest test suite
├── docs/              # Documentation
└── README.md

API Endpoints
GET /api/pathway
Returns the full p53 pathway graph as JSON, including all gene nodes and interaction edges.
POST /api/compare
Accepts a mutation input and returns a comparison between wildtype and mutant pathway states.
Request body:
json{
  "mutation": "R175H"
}
Response:
json{
  "wildtype": { ... },
  "mutant": { ... },
  "changed_nodes": ["MDM2", "CDKN1A", "BAX"],
  "changed_edges": [ ... ]
}

Supported Mutations
MutationTypeClinical SignificanceR175HLoss of functionMost common TP53 mutation; disrupts DNA binding domainR273HGain of functionContact mutation; dominant negative activityR248WGain of functionMost frequently mutated residue in human cancer

Getting Started
Prerequisites

Python 3.9+
Node.js 18+

Backend
bashcd backend
pip install -r requirements.txt
python app.py
Frontend
bashcd frontend
npm install
npm start
The frontend will run at http://localhost:3000 and connect to the Flask backend at http://localhost:5000.

Running Tests
bashcd backend
pytest tests/

Data Sources

Pathway topology: KEGG PATHWAY Database
Interaction data: Reactome
Mutation data: COSMIC / cBioPortal


Citation
If you use Oncoscope in your research or coursework, please cite:
Liggett, C. (2025). Oncoscope: An open-source tool for interactive cancer pathway
simulation and mutation impact visualization. github.com/camliggett/oncoscope
A formal software note is in preparation for submission to the Journal of Open Source Software (JOSS).

License
MIT License. See LICENSE for details.

Author
Cameron Liggett
The Shipley School, Bryn Mawr, PA
GitHub
Built as part of ongoing independent research in cancer biology and computational pathway modeling.
