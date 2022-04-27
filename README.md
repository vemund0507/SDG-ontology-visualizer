# SDG Ontology Visualizer

A tool for visualizing ontologies related to UN's sustainable development goals

[![CI](https://github.com/TDT4290-SDG-Ontology/SDG-ontology-visualizer/actions/workflows/main.yml/badge.svg)](https://github.com/TDT4290-SDG-Ontology/SDG-ontology-visualizer/actions/workflows/main.yml)

[Deployed project](https://sdgqa.trondheim.kommune.no/)

## Installation

For installation, see the [installation guide](https://github.com/TDT4290-SDG-Ontology/SDG-ontology-visualizer/blob/main/docs/installation_guide.pdf) extracted from the project report.

## Import Ontology to graphdb
Without docker, run ``yarn start`` in the backend and go to url: _localhost:7200_

If prompted with a login page: Log in with details provided in _.env_ file in the backend folder


![image](https://user-images.githubusercontent.com/49310062/158582048-8a89a2ad-885d-430f-b86c-f053e814f09a.png)

### With GraphDB Standard Edition
1. Delete existing reposotory under: _Setup > Repositories_
2. Add a new repository **WITH** the arrow down button (.ttl file): _backend > database > conf_
3. Follow the rest of GraphDB Free Edition guide

### GraphDB Free Edition
1. Navigate to: _Import > RDF_
2. Delete existing .owl file (if it exists)
3. click **Upload RDF files** and choose .owl file: _backend > database > ontology_
4. Press **Import!**


<img width="1342" alt="image" src="https://user-images.githubusercontent.com/49310062/158583009-e681aeeb-33bd-41cb-bce1-82dedb470640.png">

#### With Docker
If running with docker: 
1. Run ``python3 datagen.py`` in _utils_ folder to update with new data from the ontology after the guide above


<img width="273" alt="deployment" src="https://user-images.githubusercontent.com/49310062/158583971-f61918a8-814c-438d-9fda-5be537eb72bb.png">

## Ontology
### Work Environment
- If the node in the ontology is of none or multiple types, the individual will not be displayed in the graph.
- Every node needs a label in order to be displaed in the graph.
  - If the label contains a perentences symbol there will be an error when clicking the node.

## What's new
### Implemented the KPIs from U4SSC
The KPIs are divided into categories from the Triple Bottom Line (economy, enviornment and Social and Culture). This categorization is gathered from an [Air Table](https://airtable.com/shrOJwrkPQcvh6fwH/tbl2SCZziDsDG3OtY/viwqaW4EmdIt3XuY7?blocks=bip7r642UcxGlTTS0).

here is a custom edge between two nodes called: *Egendefinert Vemund*. The reason behind this edge is to illustrate the possibility of an ontology and how KPIs is connected accross different categories and not belonging to one category only.

### Implemented Trondheim Municipality (Kommune) 
When implementing TK (Trondheim kommune) into the ontology, it was important to get a lot of details combined with an easy to understand overview. Thus TK was divided into resulted in directories and further into units. The division was based on [this](https://tqm16.tqmenterprise.no/organisasjon/Publishing/ExternalAccess/LoadContent/14893?forOL1=organisasjon) hierarchy.

### Map KPI to TK
This part is pure self defined as it is no current defined relation between KPI and TK. Therefore the relations are defined logically. It should be noted that not all KPIs are mapped, just some of them to prove the possibility of the ontology. Also, since the relations are not defined by any legit source, they most likely will have to be re-defined and that would be a lot of unnecerary work.

## Future Work
### visualize if TK can complete KPIs within the deadline of 2030. 
An ideá is to make a toggle button and when pressed, all *willBeCompleted* KPIs will be green and the rest will be red. Currently the backend part of this step is finished. 

### Approved relations between TK - KPI and KPI and categories.
This needs to be approved by someone, somehow.

### If a KPI are achieved, how will that affect other KPIs. 
Algorithm.

## Future Work (techical)
### Change the code so that a node be be of several types 
By doing this, we avoid duplicates of instances within the ontology e.g., Transport can be of type *Utviklingsområde* and *Kategori*. However now there exist two of them, though with different name. 
