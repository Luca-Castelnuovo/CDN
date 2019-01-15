FilePond.registerPlugin(
    FilePondPluginFileValidateSize,
    FilePondPluginFileValidateType,
    FilePondPluginImageExifOrientation,
    FilePondPluginImageCrop,
    FilePondPluginImageTransform
);

FilePond.setOptions({
    maxFileSize: '5MB',
    acceptedFileTypes: [
        'image/png',
        'image/jpg',
        'image/jpeg'
    ],
    imageCropAspectRatio: '1:1',
    server: '/includes/upload.php'
});

var pond = FilePond.create(document.querySelector('input[type="file"]'));