module.exports = function Router() {
  this.routes = {};
  this.curUrl = '';
  this.route = function(path, callback) {
    this.routes[path] = callback || function() {}
  }
  this.refresh = function() {
    var str = location.hash.slice(1) || '/'
    if (str.search('\\?')!= -1) {
      this.path = str.slice(0, str.search('\\?'))
      this.param = str.slice(str.search('\\?')+1)
      if (this.routes[this.path]) this.routes[this.path](this.param)
    }
    else if (this.routes[str])
      this.routes[str]()
    // unknown hashes (e.g. #CHI2025 paper anchors) are ignored; the browser scrolls to them
  }
  this.init = function() {
    window.addEventListener('load', this.refresh.bind(this), false)
    window.addEventListener('hashchange', this.refresh.bind(this), false)
  }
}