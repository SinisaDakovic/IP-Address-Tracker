
const api = (ip) =>`https://geo.ipify.org/api/v1?apiKey=at_RcTXleLqQGF9HTJbDXcOB9Tagwd9A&ipAddress=${ip}`;


const form = document.getElementById('form');
const input = document.getElementById('input');

const address = document.getElementById('ip');
const loc = document.getElementById('location');
const timezone = document.getElementById('timezone');
const isp = document.getElementById('isp');
const posc = document.getElementById('posc');


let map = L.map('map').setView([34.04915, -118.09462], 13);
L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=QicRO2eW4ptyzcdei0uw').addTo(map);

let mark = L.marker([34.04915, -118.09462]).addTo(map)
    .bindPopup('Southern California Edison,<br>South San Gabriel')
    .openPopup();

async function searchIP(ip){
    const res = await fetch(api(ip))
    const data = await res.json();
    // console.log(data);
    write(data);
    draw(data);
}

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    let ip = input.value;
    mark.remove();
    if(ip)
     searchIP(ip);

     input.value = "";
})

function write(data){
    address.innerText = `${data.ip}`;
    loc.innerText = `${data.location.city},${data.location.region}`;
    timezone.innerText = `UTC${data.location.timezone}`;
    isp.innerText = `${data.isp}`;
    posc.innerText = `${data.location.postalCode}`;
}
function draw(data){
   map.setView([data.location.lat,data.location.lng], 13);
   mark = L.marker([data.location.lat,data.location.lng]).addTo(map)
    .bindPopup(`${data.isp}<br>${data.location.city}`)
    .openPopup();
}



