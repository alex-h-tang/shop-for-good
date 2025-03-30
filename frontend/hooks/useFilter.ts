export function filterAndSortResults(data: any[]): any[] {
    // Sort by esg.Overall_Score in descending order
    data.sort((a, b) => b.esg?.["Overall Score"] - a.esg?.["Overall Score"]);

    // Remove duplicates based on parent_company, keeping only the first occurrence
    const uniqueResults: any[] = [];
    const seenCompanies = new Set();

    for (const item of data) {
        if (!seenCompanies.has(item.parent_company)) {
            seenCompanies.add(item.parent_company);
            uniqueResults.push(item);
        }
        if (uniqueResults.length === 3) break; // Only keep top 3 results
    }

    return uniqueResults;
}
