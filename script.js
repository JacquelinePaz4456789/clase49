// Coloca tu API Key de Pexels aquí
const PEXELS_API_KEY = 'R83BH2qsWvJZqVaZMZmlRWP0cTvtErBlEdGmURxjTYaXiQC5l7Wbsl4v';

// Función para obtener imágenes desde Pexels
function getImagesFromPexels() {
    console.log('Solicitando imágenes a Pexels');
    $.ajax({
        type: 'GET',
        url: 'https://api.pexels.com/v1/search?query=nature&per_page=20',
        headers: {
            Authorization: PEXELS_API_KEY // Sin 'Bearer'
        },
        success: function (data) {
            console.log('Datos recibidos de Pexels:', data);
            if (data && data.photos && data.photos.length > 0) {
                data.photos.forEach(photo => {
                    let imageUrl = photo.src.medium;
                    let photographer = photo.photographer;

                    let div = $("<div></div>");
                    div.addClass("pic card");

                    let img = $("<img></img>");
                    img.attr("src", imageUrl);
                    img.addClass("card-img");
                    div.append(img);

                    let photographerTag = $("<h3></h3>");
                    photographerTag.addClass("card-title");
                    photographerTag.append(photographer);
                    div.append(photographerTag);

                    $('#pictures-container').append(div);
                    console.log('Imagen agregada al contenedor');
                });
            } else {
                console.log('No se encontraron fotos');
            }
        },
        error: function (xhr, status, error) {
            console.error('Error en la solicitud:', status, error);
        }
    });
}

$(document).ready(function () {
    getImagesFromPexels();
});
