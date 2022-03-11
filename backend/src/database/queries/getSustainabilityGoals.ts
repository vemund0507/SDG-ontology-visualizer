import { parsePrefixesToQuery } from '../../common/database';
import { PREFIXES } from '../index';

export default (): string => {
  const prefixString = parsePrefixesToQuery(PREFIXES.SDG, PREFIXES.SCHEMA, PREFIXES.RDFS);

  return `
      ${prefixString}
      SELECT ?instancesOf ?label ?icon ?type
      WHERE { 
        ?instancesOf  rdf:type SDG:SDG.
        ?instancesOf  rdfs:label  ?label.
        ?instancesOf  schema:icon  ?icon.
        OPTIONAL { ?instancesOf sesame:directType ?TypeRaw.
          ?TypeRaw rdfs:label ?type}

          FILTER NOT EXISTS { 
           ?instancesOf rdf:type ?c . 
           ?c rdfs:subClassOf + SDG:SDG.
           FILTER (?c != SDG:SDG )  
      }
    } ORDER BY ( xsd:string ( STRBEFORE ( STR ( ?instancesOf ), "B" ) ) )
    ( xsd:long ( STRAFTER ( STR ( ?instancesOf ), "B" ) ) )`;
};
