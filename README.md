# SDG Ontology Visualizer

A tool for visualizing ontologies related to UN's sustainable development goals

[![CI](https://github.com/TDT4290-SDG-Ontology/SDG-ontology-visualizer/actions/workflows/main.yml/badge.svg)](https://github.com/TDT4290-SDG-Ontology/SDG-ontology-visualizer/actions/workflows/main.yml)

[Deployed project](https://sdgqa.trondheim.kommune.no/)

## Installation

For installation, see the [installation guide](https://github.com/TDT4290-SDG-Ontology/SDG-ontology-visualizer/blob/main/docs/installation_guide.pdf) extracted from the project report.

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

### Filter out datapoints and correlation points within the graph. 
These are used for the GDC part. However the graph accepts everything from the ontology and it should be filtered. 
