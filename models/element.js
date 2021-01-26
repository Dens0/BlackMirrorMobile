const iconUrl = "https://myblackmirror.pl/assets/img/"

class Element {
  constructor(active, base_config,config,icon,id,name,ordering,slug) {
    this.active = active;
    this.base_config = base_config;
    this.config = config;
    this.icon = `https://myblackmirror.pl/assets/${icon}`;
    this.id = id;
    this.name = name;
    this.ordering = ordering;
    this.slug = slug;
  }
}

export default Element;
