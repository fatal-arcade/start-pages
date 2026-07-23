
export function Bookmarks(element) {

    const cat = element.dataset.category;

    element.innerHTML = `
        <h3>Bookmarks: ${cat}</h3>
        <ul>
            <li><a href="https://github.com">GitHub</a></li>
            <li><a href="https://google.com">Google</a></li>
        </ul>
    `
}
