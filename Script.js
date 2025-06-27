document.addEventListener('DOMContentLoaded', () => {
    const imageUrlInput = document.getElementById('imageUrl');
    const addImageBtn = document.getElementById('addImageBtn');
    const deleteImageBtn = document.getElementById('deleteImageBtn');
    const imageGallery = document.getElementById('imageGallery');

    let selectedImage = null; // Variable para almacenar la imagen actualmente seleccionada

    // --- Funcionalidad para agregar imágenes ---
    addImageBtn.addEventListener('click', () => {
        const imageUrl = imageUrlInput.value.trim();
        if (imageUrl) {
            createImageElement(imageUrl);
            imageUrlInput.value = ''; // Limpiar el input después de agregar
        } else {
            alert('Por favor, introduce una URL de imagen válida.');
        }
    });

    // Permitir agregar imagen al presionar "Enter" en el campo de texto
    imageUrlInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addImageBtn.click(); // Simula un clic en el botón de agregar
        }
    });

    function createImageElement(url) {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');

        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Imagen de la galería';
        img.onerror = () => {
            console.error('Error al cargar la imagen:', url);
            // Puedes poner una imagen de placeholder si la URL falla
            img.src = 'assets/img/imagen-placeholder.jpg'; // Asegúrate de tener esta imagen
        };

        galleryItem.appendChild(img);
        imageGallery.appendChild(galleryItem);

        // Añadir evento de clic para seleccionar la imagen
        galleryItem.addEventListener('click', () => {
            selectImage(galleryItem);
        });

        // Animación opcional al agregar imagen
        setTimeout(() => {
            galleryItem.style.opacity = 1;
            galleryItem.style.transform = 'scale(1)';
        }, 50);
    }

    // --- Funcionalidad para seleccionar imágenes ---
    function selectImage(imageElement) {
        // Deseleccionar la imagen previamente seleccionada si existe
        if (selectedImage && selectedImage !== imageElement) {
            selectedImage.classList.remove('selected');
        }

        // Si la imagen clicada ya estaba seleccionada, la deseleccionamos
        // Si no, la seleccionamos
        if (selectedImage === imageElement) {
            imageElement.classList.remove('selected');
            selectedImage = null;
            deleteImageBtn.disabled = true; // Deshabilitar el botón si no hay selección
        } else {
            imageElement.classList.add('selected');
            selectedImage = imageElement;
            deleteImageBtn.disabled = false; // Habilitar el botón si hay selección
        }
    }

    // --- Funcionalidad para eliminar imágenes ---
    deleteImageBtn.addEventListener('click', () => {
        if (selectedImage) {
            // Animación opcional al eliminar imagen
            selectedImage.style.opacity = 0;
            selectedImage.style.transform = 'scale(0.8)';
            selectedImage.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

            setTimeout(() => {
                imageGallery.removeChild(selectedImage);
                selectedImage = null; // Resetear la selección
                deleteImageBtn.disabled = true; // Deshabilitar el botón
            }, 300); // Esperar a que termine la animación
        } else {
            alert('Por favor, selecciona una imagen para eliminar.');
        }
    });

    // Opcional: Cargar algunas imágenes por defecto al inicio
    const defaultImages = [
        'https://picsum.photos/id/237/200/300',
        'https://picsum.photos/id/238/200/300',
        'https://picsum.photos/id/239/200/300',
        'https://picsum.photos/id/240/200/300'
    ];

    defaultImages.forEach(url => createImageElement(url));
});
