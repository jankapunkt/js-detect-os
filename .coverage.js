const cov = require('./coverage/coverage-summary.json')

let totalFound = 0
let totalCover = 0

totalFound += cov.total.branches.total
totalFound += cov.total.functions.total
totalFound += cov.total.lines.total
totalFound += cov.total.statements.total

totalCover += cov.total.branches.covered
totalCover += cov.total.functions.covered
totalCover += cov.total.lines.covered
totalCover+= cov.total.statements.covered

console.log(Number(100 * (totalCover / totalFound)).toFixed(2))
