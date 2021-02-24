const cwebp = require("webp-converter").cwebp;
const router = require("express").Router();
const { v4: UUID } = require("uuid");
const path = require("path");
const fs = require("fs");

const DO_LOG = false;

const getRawImagePath = name => path.join("images", "users", "tmp", name);
const getWebpImagePath = name => path.join("images", "users", "webp", name);
const getWebpImageUrl = name => `/images/users/webp/${name}`;

router.post("/load_image", async (req, res) => {
    const { image: rawImage } = req.files;
    DO_LOG && console.log({ image }); // Print arguments (just for debug);

    const rawPath = getRawImagePath(rawImage.name);
    try { await rawImage.mv(rawPath) }
    catch(e) {
        console.error(e);
        return res.json({ status: "error", error: "fs_mv_error" });
    }

    const webpName = `${UUID()}.webp`;
    const webpPath = getWebpImagePath(webpName);

    try { await cwebp(rawPath, webpPath, "-quiet -mt -q 90 -resize 480 0") }
    catch(e) {
        console.error(e);
        return res.json({ status: "error", error: "cwebp_error" });
    }

    const webpUrl = getWebpImageUrl(webpName);

    try { await fs.promises.unlink(rawPath) }
    catch(e) {
        console.error(e);
        return res.json({ status: "error", error: "fs_unlink_error" });
    }

    const serverImage = { url: webpUrl, name: webpName };
    DO_LOG && console.log("User profile image is loaded, result:", JSON.stringify(serverImage));
    return res.json({ status: "success", result: serverImage });

    // try {
    //     const rawPath = getRawImagePath(type, rawImage.name)
    //     await rawImage.mv(rawPath);

    //     const webpName = UUID() + ".webp";
    //     const webpPath = getWebpImagePath(type, webpName);
    //     await cwebp(rawPath, webpPath, "-quiet -mt -q 90 -resize 480");

    //     const webpUrl = getWebpImageUrl(type, webpName);

    //     await fs.promises.unlink(rawPath);
    //     const serverImage = { url: webpUrl, name: webpName };

    //     DO_LOG && console.log("Image loaded, result is", JSON.stringify(serverImage));
        
    //     return res.json({ status: "success", image: serverImage });
    // } catch(e) { console.error(e); res.json({ status: "error", error: "internal_error" }); }
});

module.exports = router;