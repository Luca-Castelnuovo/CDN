"use strict";FilePond.registerPlugin(FilePondPluginFileValidateSize,FilePondPluginFileValidateType,FilePondPluginImageExifOrientation,FilePondPluginImageCrop,FilePondPluginImageTransform),FilePond.setOptions({maxFileSize:"2MB",acceptedFileTypes:["image/png","image/jpg","image/jpeg"],imageCropAspectRatio:"1:1",server:"/includes/upload.php"});var pond=FilePond.create(document.querySelector('input[type="file"]'));
//# sourceMappingURL=init.js.map