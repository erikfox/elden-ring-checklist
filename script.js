(async () => {
  await fetch('/checklist.md')
    .then(response => response.text())
    .then(result => {
      var html = marked.parse(result);
      var cleaned = DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
      document.getElementById('content').innerHTML = cleaned;
    });
  
  [...document.querySelectorAll("input[type='checkbox']")].forEach(el => {
    var checklistItem = el.parentNode.innerText;

    el.disabled = false;
    el.setAttribute('data-checkbox-id', checklistItem)

    if (localStorage[checklistItem] === 'true') {
      el.setAttribute('checked', '');
    } else {
      el.removeAttribute('checked');
    }

    el.addEventListener('change', e => {
      var isChecked = e.target.checked;
      
      localStorage.setItem(checklistItem, isChecked);
    });
  });
})();