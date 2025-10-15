document.getElementById("searchbutton").addEventListener("click", async () => {
    const searchTerm = document.getElementById("search").value;

    // Call Netlify Function
    const response = await fetch(`netlify/functions/searchBooks?query=${searchTerm}`);
    const data = await response.json();

    // Show results
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
    for (const [book, count] of Object.entries(data)) {
        const p = document.createElement("p");
        p.textContent = `${book}: ${count} occurrence(s)`;
        resultsDiv.appendChild(p);
    }
});

