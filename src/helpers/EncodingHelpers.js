export function replaceSpecialCharacters(attribute) {
    // replace the single quotes
    console.log('i fire');
       attribute = attribute.replace(/'/g, "''");
  
       attribute = attribute.replace(/%/g, "%25");
       attribute = attribute.replace(/\+/g, "%2B");
       attribute = attribute.replace(/\//g, "%2F");
       attribute = attribute.replace(/\?/g, "%3F");
  
       attribute = attribute.replace(/#/g, "%23");
       attribute = attribute.replace(/&/g, "%26");
       return attribute;
  }