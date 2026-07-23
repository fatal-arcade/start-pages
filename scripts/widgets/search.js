function searchEngineDropdownItem(key, item) {
    
    data = item.json()

    return `
        <div class="engine-dropdown-item"
            data-value=${key}
            data-url=${''}
            data-param=${''}
            data-icon=${''}>
            <img src=${''} class="engine-favicon">
            ${item.id}
        </div>
    `
}

async function searchEngineDropdownList() {

    try {

        const resp = await fetch('../config/engines.json')

        if (!resp.ok) {
            throw new Error(`${resp.status}`)
        }

        const data = await resp.json();

        const items = data.search_engines;

        return items
        
    } catch (error) {

        console.error('Failed to load search engines:', error);
    }


}

export function Web(element) {

    const placeholder = element.dataset.placeholder || "Search the web...";

    element.innerHTML = `
        
        <form id="search" class="search-bar" action="https://startpage.com/sp/search" method="get" target="_blank">
        
            <input type="text" id="searchInput" name="query" class="search-input" placeholder="Search" autocomplete="off" autofocus required>

        </form>
    `;


}