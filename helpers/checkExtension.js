const checkExtension = (fileName) => {
    const EXTENSIONS = ['txt', 'js', 'json', 'html', 'css'];
    const arrExtensions = fileName.split(".");
    const extension = arrExtensions[arrExtensions.length-1];
    const isPresent = EXTENSIONS.includes(extension);
    return {extension, isPresent};
};

module.exports = checkExtension;