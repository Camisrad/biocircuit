# Biocircuit

What does biocircuit do?

Biocircuit is a open source tool to help academics and researchers to investigate pathways that allow for mututations that result in cancer.  Every pathway in BioCircuit is built from peer-reviewed, publicly available biological databases. No data is invented — each gene, interaction, and cancer association is sourced from authoritative research.

A user of biocircuit needs to be able to do these things:

1. View all pathways and the proteins/genes inside of them and interact with the data to better understand the pathway and how it works.
2. Ideally, users would need to be able to submit their own pathways. They could also link journal articles, pub meb research.
3. Present case studies and accept case studies on how each pathway works.
4. Examine how a specific drug would interact with the pathway.  You want to see how a drug affects the pathway after introduction
5. We need a comment section so logged in users can add comments to the pathways and discuss the pathways, seeking community feedback and what not.  



Design:

I've presented you with a Base44 app I built that works through the mechanics of the website.  If easy, we can start with that. However, we want to move this to a version controlled app on using github repositories. 

 We want to make sure the UI is react and we will be running this on a Railway, a light cloud platform.

 We want the data structure to be stores in a postgresql database that will also on railway.  

 We need user authentication on the website, perhaps using WorkOS or some form of authentication that Railway provides. 


