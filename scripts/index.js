import * as Bookmarks   from './widgets/bookmarks.js'
import * as Clock       from './widgets/clock.js'
import * as Search      from './widgets/search.js'
import * as Weather     from './widgets/weather.js'


document.addEventListener('DOMContentLoaded', () => {
  
    const widgets = document.querySelectorAll('[data-widget]');
  
    widgets.forEach(widget => {

        const wtype = widget.dataset.widget;
        
        switch (wtype) {
            case 'bookmarks': return Bookmarks.Bookmarks(widget)
            case 'clock':     return Clock.Time(widget)
            case 'searchbar': return Search.Web(widget)
            case 'weather':   return Weather.Text(widget)  
            default: return
        }
    
    });

});