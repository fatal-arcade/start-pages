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

        const resp = await fetch('../config/engines.json')

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

    const placeholder = element.dataset.placeholder || "Search the web...";

    const dropdownlist = await searchEngineDropdownList();

    const searchbarHTML = `
        
        <form id="searchForm" class="search-form" action="https://startpage.com/sp/search" method="get" target="_blank">
        
            <input type="text" id="searchInput" name="query" class="search-input" placeholder="Search" required autocomplete="off" autofocus>
            ${dropdownlist}
        </form>        
    `; 

    element.innerHTML = searchbarHTML

}