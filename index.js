const fs = require('fs')
const path = require('path')
const readmePath = path.join(__dirname, 'readme.md')
const names = require('all-the-package-names')
const lower = names.filter(name => name.toLowerCase() === name)
const mixed = names.filter(name => name.toLowerCase() !== name)

// do this silliness to get a list of mixed case overlappers,
// SORTED in the order of the lowercase names (which are sorted by average downloads)
const flattenedMixed = mixed.map(name => name.toLowerCase())
const overlaps = lower
  .filter(name => flattenedMixed.includes(name))
  .map(name => mixed.find(n => n.toLowerCase() === name))

let output = `
# Mixed Case Package Names

There are ${names.length} packages in the npm registry.

${mixed.length} of them have mixed-case names.

${overlaps.length} of them have **overlapping names**, for which both a mixed-case and lowercase package exist.

:warning: Use caution when installing packages :warning:

## Overlaps

(Sorted by average daily download count of the lowercase package)

`

overlaps.forEach(name => {
  output += (`- [${name.toLowerCase()}](https://ghub.io/${name.toLowerCase()}) vs [${name}](https://ghub.io/${name})\n`)
})

console.log(output)
fs.writeFileSync(readmePath, output)
