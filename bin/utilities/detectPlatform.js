const detectPlatform = (route) => {
    return process.platform === "win32" ? route.replace(/\//g, "\\") : route;
}


module.exports = { detectPlatform }