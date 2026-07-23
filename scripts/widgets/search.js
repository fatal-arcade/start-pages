export function Web(element) {

    const placeholder = element.dataset.placeholder || "Search the web...";

    element.innerHTML = `
        
        <form id="searchForm" class="search-form" action="https://duckduckgo.com/" method="get" target="_blank">
        
            <input type="text" id="searchInput" name="q" class="search-input" placeholder="Search the web..." required autocomplete="off" autofocus>

        </form>
    `;


}