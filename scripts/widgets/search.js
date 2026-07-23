function searchEngineDropdownItem(key, item) {

    return `
        <div class="engine-dropdown-item"
            data-value="${key}"
            data-url="${item.url}"
            data-param="${item.param}"
            data-icon="${item.icon}">
            <img src="${item.icon}" class="engine-favicon">
            ${item.id}
        </div>
    `
}

async function searchEngineDropdownList() {

    try {

        const base = window.location.pathname.includes('start-pages') ? '/start-pages' : '';
        
        const resp = await fetch(`${base}/config/engines.json`)

        if (!resp.ok) {
            throw new Error(`${resp.status}`)
        }

        const data = await resp.json();

        const engines = data.search_engines;
        
        let items = `
            <div class="custom-dropdown">
            
                <div class="dropdown-trigger" id="dropdownTrigger">
                    
                    <img src="${engines.startpage.icon}" 
                        class="engine-favicon" 
                        id="currentFavicon">
                    
                    <span id="currentText">Startpage</span>
                
                </div>

                <div class="dropdown-menu" id="dropdownMenu">

        `
        
        for (const [key, field] of Object.entries(engines)) {
            items += searchEngineDropdownItem(key, field);
        }

        items += `
            </div>
            </div>
        `

        return items;
        
    } catch (error) {

        console.error('Failed to load search engines:', error);
    }

}

export async function Web(element) {

    const placeholder = element.dataset.placeholder || "Search";

    const dropdownlist = await searchEngineDropdownList();

    const websearchbar = `
        
        <form id="webSearchBar" class="web-search-bar" action="https://startpage.com/sp/search" method="get" target="_blank">
        
            <input type="text" id="webSearchInput" name="query" class="web-search-input" placeholder="${placeholder}" required autocomplete="off" autofocus>
            
            ${dropdownlist}
        
        </form>        
    `; 

    element.innerHTML = websearchbar

}