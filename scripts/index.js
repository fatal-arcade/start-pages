import * as Bookmarks   from './widgets/bookmarks.js'
import * as Clock       from './widgets/clock.js'
import * as Search      from './widgets/search.js'
import * as Weather     from './widgets/weather.js'

document.addEventListener('DOMContentLoaded', () => {
  
    const widgets = document.querySelectorAll('[data-widget]');
  
    widgets.forEach(widget => {

        const wtype = widget.dataset.widget;
        
        switch (wtype) {
            case 'bookmarks': Bookmarks.Bookmarks(widget); break;
            case 'clock':     Clock.Time(widget); break;
            case 'searchbar': Search.Web(widget); break;
            case 'weather':   Weather.Text(widget); break;
            default: break;
        };
    
    });

    // 2. Event Delegation for Dynamically Generated Dropdowns
    document.addEventListener('click', (e) => {
        
        const trigger = e.target.closest('#dropdownTrigger');
        const menu = document.getElementById('dropdownMenu');
        const item = e.target.closest('.engine-dropdown-item');

        // Handle clicking the dropdown trigger button
        if (trigger && menu) {
            e.stopPropagation();
            menu.classList.toggle('show');
            return;
        }

        // Handle clicking an item inside the dropdown
        if (item && menu) {
            
            const form = document.getElementById('searchForm');
            const input = document.getElementById('searchInput');
            const currentFavicon = document.getElementById('currentFavicon');
            const currentText = document.getElementById('currentText');

            if (currentText) currentText.textContent = item.textContent.trim();
            if (currentFavicon) currentFavicon.src = item.getAttribute('data-icon');
            if (form) form.action = item.getAttribute('data-url');
            if (input) {
                input.name = item.getAttribute('data-param');
                input.focus();
            }
            
            menu.classList.remove('show');
            return;
        }

        // If clicking anywhere else, close the dropdown if it exists
        if (menu) {
            menu.classList.remove('show');
        }
    });

});