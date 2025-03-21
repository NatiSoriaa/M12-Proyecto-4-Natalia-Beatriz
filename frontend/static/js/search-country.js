export async function searchCountryLocation(country) {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(country)}`);
    const data = await response.json();
    
    if (data.length > 0) {
        const { lat, lon } = data[0];
        createMarker(parseFloat(lat), parseFloat(lon), country);
    } else {
        alert("País no encontrado");
    }
}
