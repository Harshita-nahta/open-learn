module.exports = results => {
    const byRuleId = results.reduce((map, current) => {
        current.messages.forEach(({ ruleId, line, column }) => {
            if (!map[ruleId]) {
                map[ruleId] = []
            }

            const occurrence = `${current.filePath}:${line}:${column}`
            map[ruleId].push(occurrence)
        })
        return map
    }, {})

    return Object.entries(byRuleId)
        .map(([ruleId, occurrences]) => `${ruleId} (total: ${occurrences.length})\n${occurrences.join('\n')}`)
        .join('\n########################\n')
}
