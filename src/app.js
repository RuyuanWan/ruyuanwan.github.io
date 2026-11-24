function clean(dom) {
  if (dom && dom.classList.contains('hide')==false)
    dom.classList.add('hide')
}

function cleanAll() {
  const home = document.querySelector('.home')
  const publication = document.querySelector('.publication')
  const misc = document.querySelector('.misc')
  clean(home)
  clean(publication)
  clean(misc)
  const button = document.querySelector("#button-venn");
  if(button && button.firstChild) button.removeChild(button.firstChild);
}

function setVisible(dom) {
  if(dom) dom.classList.remove('hide')
}

function initProjectTrigger() {
  const triggerBtn = document.querySelector('.example-project-trigger');
  const content = document.querySelector('.example-project-content');
  if(content)
    content.classList.add('hide');
  if(triggerBtn){
    triggerBtn.removeEventListener('click', onToggleExampleProject);
    triggerBtn.addEventListener('click', onToggleExampleProject)
  }
}

function onToggleExampleProject(){
  const content = document.querySelector('.example-project-content');
  if(content)
  content.classList.toggle('hide');
}

export function loadHome(){
  let home = document.querySelector('.home')
  cleanAll()
  setVisible(home)
  const button = document.querySelector("#button-venn");
  makeCircle(button);
}

export function initTopicFilter(){
  const buttons = document.querySelectorAll('.topic-btn')
  buttons.forEach(function(btn){
    btn.addEventListener('click', function(){
      const topic = btn.getAttribute('data-topic')
      buttons.forEach(function(b){ b.classList.toggle('active', b === btn) })
      document.querySelectorAll('.paper-item').forEach(function(item){
        const topics = (item.getAttribute('data-topics') || '').split('|')
        const show = topic === 'all' || topics.indexOf(topic) !== -1
        item.classList.toggle('hide', !show)
      })
    })
  })
}

export function initBibToggle(){
  document.querySelectorAll('.bib-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      const block = btn.parentElement.querySelector('.bib-block')
      if(!block) return
      const isHidden = block.hasAttribute('hidden')
      if(isHidden) block.removeAttribute('hidden')
      else block.setAttribute('hidden', '')
      btn.setAttribute('aria-expanded', isHidden ? 'true' : 'false')
      btn.classList.toggle('active', isHidden)
    })
  })
}

export function loadSection(name){
  const section = document.querySelector(name)
  cleanAll()
  setVisible(section)
  initProjectTrigger()
}