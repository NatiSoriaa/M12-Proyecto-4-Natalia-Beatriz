function openModal(data) {
    const modal = document.getElementById('infoModal');
    modal.setAttribute('style', 'display: flex !important;');
  
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
      <h2>${data.name}</h2>
      <p>Latitud: ${data.lat}</p>
      <p>Longitud: ${data.lon}</p>
    `;
  }
  
  document.querySelector('#infoModal .close').addEventListener('click', () => {
    document.getElementById('infoModal').style.display = 'none';
  });
  
  window.addEventListener('click', (event) => {
    const modal = document.getElementById('infoModal');
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
  
  export { openModal };