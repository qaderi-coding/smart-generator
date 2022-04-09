// Pascal case is not supported by default on node
// So, this custom function receives user input and
// changes it to pascal case
function toPascalCase(string) {
    return `${string}`
      .replace(new RegExp(/[-_]+/, 'g'), ' ')
      .replace(new RegExp(/[^\w\s]/, 'g'), '')
      .replace(
        new RegExp(/\s+(.)(\w*)/, 'g'),
        ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
      )
      .replace(new RegExp(/\w/), s => s.toUpperCase());
  }

// getChainID: returns chainID according whatever network is passed then
// we use it in website home page to warren users if they didn't chose the expected network
function getChainID(network){
  switch(network){
    case "Rinkeby":
      return 4;
    case "Ropsten":
      return 3;
    case "Mumbai":
      return 8001;
    default:
      return null
  }
}

module.exports = {
    toPascalCase,
    getChainID
}