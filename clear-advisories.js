// Quick script to clear advisory spam
// Run this in browser console: localStorage.setItem('krishimitra_advisories', JSON.stringify([]));
console.log('Clearing advisory spam...');
localStorage.setItem('krishimitra_advisories', JSON.stringify([]));
console.log('Advisories cleared! Refresh the page to see the changes.');
