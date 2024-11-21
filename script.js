document.addEventListener('DOMContentLoaded', function() {
    const pageFlip = new St.PageFlip(document.getElementById('book'), {
        width: 400, // Lebar halaman satu kali lipat untuk menampilkan satu halaman (cover)
        height: 600, // Tinggi halaman
        autoCenter: true,
        showCover: true, // Menampilkan cover pada halaman pertama
        usePortrait: false, // Mengatur agar tidak beralih ke mode potret
    });

    pageFlip.loadFromHTML(document.querySelectorAll('.page'));

    let debounce;
    const debounceTime = 300; // waktu tunda dalam milidetik

    // Event listener untuk mengganti mode setelah halaman pertama dibuka
    pageFlip.on('flip', (e) => {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
            if (e.data > 0 && e.data < pageFlip.getPageCount() - 1) {
                pageFlip.update({
                    width: 800, // Lebar halaman dua kali lipat untuk menampilkan dua halaman
                    height: 600
                });
            } else if (e.data === 0 || e.data === pageFlip.getPageCount() - 1) {
                pageFlip.update({
                    width: 400, // Lebar halaman satu kali lipat untuk menampilkan satu halaman (cover)
                    height: 600
                });
            }
        }, debounceTime);
    });

    // Event listener untuk kembali ke cover
    document.querySelector('.cover').addEventListener('click', () => {
        pageFlip.flip(0);
    });
});