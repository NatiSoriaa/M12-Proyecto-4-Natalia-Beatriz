import { checkSession } from "./login-register.js";

document.addEventListener("DOMContentLoaded", async () => {
  const session = await checkSession();
  const userId = session.id;
  const storageKey = `user_album_${userId}`;

  const openBtn = document.getElementById("openImageModal");
  const closeBtn = document.getElementById("closeAlbumModal");
  const albumContent = document.querySelector(".album-content");
  const albumContainer = document.querySelector(".album-container");
  const previewContainer = document.getElementById("imagePreview");

  let myDropzone = null;

  openBtn.addEventListener("click", () => {
    if (session.logged === false) {
      toastr.warning("Inicia sesión para crear tu álbum de fotos");
      return;
    }
    albumContainer.classList.add("active");
    albumContent.classList.add("active");

    loadUserImages();

    if (!myDropzone) {
      initializeDropzone();
    }
  });

  closeBtn.addEventListener("click", () => {
    albumContainer.classList.remove("active");
    albumContent.classList.remove("active");
  });

  function loadUserImages() {
    previewContainer.innerHTML = "";
    const savedImages = JSON.parse(localStorage.getItem(storageKey)) || [];
    savedImages.forEach((dataUrl, index) => {
      renderImage(dataUrl, index);
    });
  }

  function renderImage(dataUrl, index) {
    const img = document.createElement("img");
    img.src = dataUrl;
    img.classList.add("preview-img");

    const previewWrapper = document.createElement("div");
    previewWrapper.classList.add("preview-wrapper");
    previewWrapper.dataset.index = index;

    const removeBtn = document.createElement("span");
    removeBtn.innerHTML = "×";
    removeBtn.classList.add("remove-preview");
    removeBtn.addEventListener("click", () => {
      removeImage(index);
    });

    previewWrapper.appendChild(img);
    previewWrapper.appendChild(removeBtn);
    previewContainer.appendChild(previewWrapper);
  }

  function removeImage(index) {
    const saved = JSON.parse(localStorage.getItem(storageKey)) || [];
    saved.splice(index, 1);
    localStorage.setItem(storageKey, JSON.stringify(saved));
    loadUserImages();
  }

  function initializeDropzone() {
    Dropzone.autoDiscover = false;

    if (Dropzone.instances.length > 0) {
      Dropzone.instances.forEach(dz => dz.destroy());
    }

    myDropzone = new Dropzone("#my-dropzone", {
      url: "#",
      autoProcessQueue: false,
      acceptedFiles: "image/*",
      addRemoveLinks: true,
      previewsContainer: false,
      init: function () {
        this.on("addedfile", file => {
          const reader = new FileReader();
          reader.onload = function (event) {
            const dataUrl = event.target.result;
            const saved = JSON.parse(localStorage.getItem(storageKey)) || [];
            saved.push(dataUrl);
            localStorage.setItem(storageKey, JSON.stringify(saved));
            loadUserImages();
          };
          reader.readAsDataURL(file);
        });
      }
    });
  }
});
