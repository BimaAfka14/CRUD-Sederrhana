document.addEventListener("DOMContentLoaded", () => {
  const btnTambah = document.getElementById("btn-tambah");
  const modalTambah = document.getElementById("modal-tambah");
  const btnBatalTambah = document.getElementById("btn-batal-tambah");
  const formTambah = document.getElementById("form-tambah");

  const modalEdit = document.getElementById("modal-edit");
  const btnBatalEdit = document.getElementById("btn-batal-edit");
  const formEdit = document.getElementById("form-edit");

  let editIndex = null; // Menyimpan index mahasiswa yang sedang diedit

  // Event untuk membuka modal tambah
  btnTambah.addEventListener("click", () => {
    modalTambah.classList.add("show");
  });

  // Event untuk menutup modal tambah
  btnBatalTambah.addEventListener("click", () => {
    modalTambah.classList.remove("show");
    formTambah.reset();
  });

  // Event untuk menutup modal edit
  btnBatalEdit.addEventListener("click", () => {
    modalEdit.classList.remove("show");
    formEdit.reset();
    editIndex = null;
  });

  // Event submit form tambah mahasiswa
  formTambah.addEventListener("submit", (e) => {
    e.preventDefault(); // Mencegah reload halaman

    const nimInput = document.getElementById("nim-tambah").value.trim();
    const nameInput = document.getElementById("name-tambah").value.trim();
    const table = document.querySelector("tbody");

    if (nimInput === "" || nameInput === "") {
      alert("Harap isi semua field.");
      return;
    }

    // Menambahkan mahasiswa baru ke tabel
    const newRow = table.insertRow();
    const cellNo = newRow.insertCell(0);
    const cellNim = newRow.insertCell(1);
    const cellNama = newRow.insertCell(2);
    const cellAksi = newRow.insertCell(3);

    // Menentukan nomor urut baru
    cellNo.textContent = table.rows.length;
    cellNim.textContent = nimInput;
    cellNama.textContent = nameInput;

    // Tambahkan tombol edit dan hapus
    cellAksi.innerHTML = `
      <button class="btn-edit">Edit</button>
      <button class="btn-hapus">Hapus</button>
    `;

    // Tutup modal tambah setelah simpan
    modalTambah.classList.remove("show");

    // Reset form setelah input
    formTambah.reset();

    // Tambahkan event listener ke tombol edit dan hapus baru
    attachEventListeners();
  });

  // Event submit form edit mahasiswa
  formEdit.addEventListener("submit", (e) => {
    e.preventDefault(); // Mencegah reload halaman

    const nimInput = document.getElementById("nim-edit").value.trim();
    const nameInput = document.getElementById("name-edit").value.trim();
    const table = document.querySelector("tbody");

    if (nimInput === "" || nameInput === "") {
      alert("Harap isi semua field.");
      return;
    }

    if (editIndex !== null) {
      // Perbarui data pada baris yang sesuai
      const row = table.rows[editIndex];
      row.cells[1].textContent = nimInput;
      row.cells[2].textContent = nameInput;
    }

    // Tutup modal edit setelah simpan
    modalEdit.classList.remove("show");

    // Reset form setelah input atau edit
    formEdit.reset();
    editIndex = null;
  });

  // Fungsi untuk mengisi modal edit dan membuka modal edit
  function openEditModal(rowIndex, nim, nama) {
    document.getElementById("nim-edit").value = nim;
    document.getElementById("name-edit").value = nama;
    modalEdit.classList.add("show");
    editIndex = rowIndex;
  }

  // Fungsi untuk menghapus mahasiswa dari tabel
  function deleteRow(rowIndex) {
    const table = document.querySelector("tbody");
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      table.deleteRow(rowIndex);

      // Perbarui nomor urut setelah hapus
      for (let i = 0; i < table.rows.length; i++) {
        table.rows[i].cells[0].textContent = i + 1;
      }
    }
  }

  // Fungsi untuk menambahkan event listener ke tombol edit dan hapus
  function attachEventListeners() {
    const btnEdits = document.querySelectorAll(".btn-edit");
    const btnHapuses = document.querySelectorAll(".btn-hapus");

    btnEdits.forEach((btn, index) => {
      btn.removeEventListener("click", handleEdit); // Menghindari penambahan ganda
      btn.addEventListener("click", handleEdit);
    });

    btnHapuses.forEach((btn, index) => {
      btn.removeEventListener("click", handleHapus); // Menghindari penambahan ganda
      btn.addEventListener("click", handleHapus);
    });
  }

  function handleEdit(event) {
    const btn = event.target;
    const row = btn.closest("tr");
    const rowIndex = Array.from(row.parentNode.children).indexOf(row);
    const nim = row.cells[1].textContent;
    const nama = row.cells[2].textContent;
    openEditModal(rowIndex, nim, nama);
  }

  function handleHapus(event) {
    const btn = event.target;
    const row = btn.closest("tr");
    const rowIndex = Array.from(row.parentNode.children).indexOf(row);
    deleteRow(rowIndex);
  }

  // Tambahkan event listener pada tabel awal
  attachEventListeners();

  // Tambahkan event listener pada tombol close modal
  const closeModalButtons = document.querySelectorAll(".close-modal");

  closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modalOverlay = button.closest(".modal-overlay");
      modalOverlay.classList.remove("show");
    });
  });

  // Tutup modal saat klik di luar konten modal
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      e.target.classList.remove("show");
    }
  });
});
